from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import joinedload
from fastapi.responses import JSONResponse
from typing import Optional, List
from sqlalchemy.orm import Session
from Schemas.cartSchema import CartCreate, updateQuantity, CartOut
from models.cartModel import Cart
from models.userModel import User
from models.productModel import Product
from models.orderModel import OrderItem
from database import get_db
from utils import get_current_user
router = APIRouter()

@router.get("/", response_model=List[CartOut])
def get_user_cart(request: Request, db: Session = Depends(get_db)):
    # Get current user from the request
    user = get_current_user(request, db, User)

    # Fetch cart items with related products
    user_cart = db.query(Cart).options(joinedload(Cart.product)).filter(Cart.user_id == user.id).all()

    # Return the cart items, serialized with CartOut schema
    if user_cart:
        return user_cart
    else:
        return JSONResponse(status_code=404, content={"message": "No items in your cart"})

@router.post("/add-to-cart", response_model=CartOut)
def add_to_cart(cart: CartCreate, request: Request, db: Session = Depends(get_db)):
    try:
        user = get_current_user(request, db, User)

        # Get product and calculate total price
        product = db.query(Product).filter(Product.id == cart.product_id).first()
        if not product:
            return JSONResponse(status_code=404, content={"message": "Product not found"})

        # Check if the item already exists in the cart for this user
        existing_item = db.query(Cart).filter(
            Cart.user_id == user.id,
            Cart.product_id == cart.product_id
        ).first()

        if existing_item:
            # If exists, update quantity and total_price
            existing_item.quantity += cart.quantity
            existing_item.total_price = existing_item.quantity * product.price
            db.commit()
            db.refresh(existing_item)

            return JSONResponse(status_code=200, content={
                "cart": {
                    "id": existing_item.id,
                    "product_id": existing_item.product_id,
                    "user_id": existing_item.user_id,
                    "quantity": existing_item.quantity,
                    "total_price": existing_item.total_price,
                },
                "message": "Cart updated successfully"
            })
        else:
            # Else create new
            new_cart_item = Cart(
                user_id=user.id,
                product_id=cart.product_id,
                quantity=cart.quantity,
                total_price=product.price * cart.quantity,
            )
            db.add(new_cart_item)
            db.commit()
            db.refresh(new_cart_item)

            return JSONResponse(status_code=200, content={
                "cart": {
                    "id": new_cart_item.id,
                    "product_id": new_cart_item.product_id,
                    "user_id": new_cart_item.user_id,
                    "quantity": new_cart_item.quantity,
                    "total_price": new_cart_item.total_price,
                },
                "message": "Item added to cart successfully"
            })
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal Server Error", "error": str(e)})



@router.put("/update-quantity/{cart_id}", response_model=CartOut)
def update_quantity(request: Request, cart_id: int, quantity: updateQuantity, db: Session = Depends(get_db)):
    try:
        user = get_current_user(request, db, User)

        cart_item = (
            db.query(Cart)
            .options(joinedload(Cart.product))  # Ensure product is loaded
            .filter(Cart.id == cart_id, Cart.user_id == user.id)
            .first()
        )

        if not cart_item:
            raise HTTPException(status_code=404, detail="Cart item not found")

        if not cart_item.product:
            raise HTTPException(status_code=404, detail="Product not found")

        cart_item.quantity = quantity.quantity
        cart_item.total_price = cart_item.product.price * quantity.quantity
        db.commit()
        db.refresh(cart_item)

        return cart_item  # will now include product

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/remove-cart-item/{cart_id}")
def remove_cart_item(request: Request, cart_id: int, db: Session = Depends(get_db)):
    try:
        #token, credentials_exception = get_token_from_header(request)
        user = get_current_user(request, db, User)
        cart_item = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user.id).first()
        if not cart_item:
            return JSONResponse(status_code=404, content={"message": "Cart item not found"})

        db.delete(cart_item)
        db.commit()

        return JSONResponse(status_code=200, content={"message": "Cart item deleted successfully"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal Server Error", "error": str(e)})



@router.delete("/clear-cart")
def clear_cart_items(request: Request, db: Session = Depends(get_db)):
    try:
         #token, credentials_exception = get_token_from_header(request)
        user = get_current_user(request, db, User)
        cart_item = db.query(Cart).filter(Cart.user_id == user.id).all()

        if not cart_item:
            return JSONResponse(status_code=404, content={"message": "Cart is already empty"})
        
        for item in cart_item:
            db.delete(item)
            db.commit()
        return JSONResponse(status_code=200, content={"message": "Cart cleared successfully"})
        
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Internal Server Error", "error": str(e)})


@router.post("/order-from-cart")
def order_from_cart(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db, User)
    cart_items = db.query(Cart).filter(Cart.user_id == user.id).all()
    if not cart_items:
        return JSONResponse(status_code=404, content={"message": "No items in your cart"})
    
    total_price = 0.0

    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            return JSONResponse(status_code=404, content={"message": "Product not found"})
        
        item_total = item.quantity * product.price
        total_price += item_total
        # Create order item
        new_order_item = OrderItem(
            user_id=user.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item_total
        )

        db.add(new_order_item)
        db.commit()
        db.refresh(new_order_item)
        # Remove item from cart
        db.delete(item)
        db.commit()

    return JSONResponse(status_code=200, content={
        "message": "Order created successfully",
        "total_price": total_price
    })
