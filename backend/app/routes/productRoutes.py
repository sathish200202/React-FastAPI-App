from fastapi import APIRouter, Depends, Path, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from Schemas.productsSchema import ProductCreate, ProductOut
from models.productModel import Product
from database import get_db
    


router = APIRouter()

@router.get("/")
def Home():
    return {"message": "Hello, world! welcome to the page"}


@router.get("/products")
def get_inventory(db: Session = Depends(get_db)):
    all_products = db.query(Product).all()
    if all_products:
        return all_products
    else:
        return JSONResponse(status_code=404, content={"message": "No Products"})
     


@router.get("/products/get-item/{product_id}")
def get_product_by_id(product_id: int = Path(..., description= "The Id of the product you want to view", gt=0, lt=4), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product:
        return product
    else:
        return JSONResponse(status_code=404, content={"message": "Product not found"})
    
    
@router.get("/products/get-by-category", response_model = list[ProductOut])
def get_by_name(category: str, db: Session = Depends(get_db)):
   products = db.query(Product).filter(Product.category == category).all()
   if products:
       return products
   else:
       return JSONResponse(status_code=404, content={"message": "Product not found"})
   

@router.get("/all-category")
def get_all_category(db:Session = Depends(get_db)):
    all_category = db.query(Product.category).distinct().all()
    categoies_list = [cat[0] for cat in all_category]
    if categoies_list:
        return categoies_list
    else:
        return JSONResponse(status_code=404, content={"message": "No category found"})