from fastapi import APIRouter, Depends, Path, HTTPException, Request, status
from fastapi.responses import JSONResponse
from typing import Optional
from sqlalchemy.orm import Session
from Schemas.orderSchema import OrderOut, OrderItemOut, SingleProductOrder, SingleProductOrderSummary
from models.orderModel import OrderItem, Order
from models.userModel import User
from models.productModel import Product
from database import get_db
from utils import get_current_user, get_token_from_header, discount_calculate, shipping_price_caluculation


router = APIRouter()

@router.get("/", response_model=list[OrderOut])
def get_all_orders(request: Request, db: Session = Depends(get_db)):
    try:
        #token, credentials_exception = get_token_from_header(request)
        user = get_current_user(request, db, User)
        orders = db.query(Order).filter(Order.user_id == user.id).all()
        if not orders:
            return JSONResponse(status_code=404, content={"message": "No orders found"})
        
        return orders
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})
    
@router.post("/order-summary")
def order_summary(order: SingleProductOrderSummary, request: Request, db: Session = Depends(get_db)):
    # Get authenticated user
    #print("request: ", request.json())
    user = get_current_user(request, db, User)

    # Retrieve product from the database
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Calculate total price
    total_price = product.price * order.quantity

    # Calculate discount and shipping
    discount_percentage, discount_amount = discount_calculate(total_price, order.discount_code, db)
    shipping_cost = shipping_price_caluculation(total_price)

    # Calculate final price
    final_price = total_price - discount_amount + shipping_cost

    return {
        "product": {
            "id": product.id,
            "product_name": product.product_name,
            "image_url": product.image_url,
            "price": product.price,
            "quantity": order.quantity
        },
        "summary": {
            "subtotal": total_price,
            "discount_percentage": discount_percentage,
            "discount_amount": discount_amount,
            "shipping_cost": shipping_cost,
            "final_price": final_price
        }
    }
@router.post("/create-single-order", response_model=OrderOut, status_code=201)
def create_single_order(
    order: SingleProductOrder, 
    request: Request, 
    db: Session = Depends(get_db)
):
    try:
        user = get_current_user(request, db, User)
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")

        product = db.query(Product).filter(Product.id == order.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        # Calculate prices
        total_price = product.price * order.quantity
        discount_percentage, discount_amount = discount_calculate(total_price, order.discount_code, db)
        shipping_cost = shipping_price_caluculation(total_price)
        final_price = total_price - discount_amount + shipping_cost

        # Create order
        db_order = Order(
            user_id=user.id,
            quantity=order.quantity,
            total_price=total_price,
            discount_percentage=discount_percentage,
            discount_amount=discount_amount,
            final_price=final_price,
            shipping_address=order.shipping_address,
            shipping_price=shipping_cost,
            payment_method=order.payment_method,
            status="pending"
        )
        
        db.add(db_order)
        db.commit()
        db.refresh(db_order)

        # Create order item
        order_item = OrderItem(
            order_id=db_order.id,
            product_id=product.id,
            quantity=order.quantity,
            price=product.price
        )
        db.add(order_item)
        db.commit()

        return db_order

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Order creation failed: {str(e)}"
        )