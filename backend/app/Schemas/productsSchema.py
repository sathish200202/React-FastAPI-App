from pydantic import BaseModel, Field
from typing import Optional


class ProductCreate(BaseModel):
    product_name: str
    brand: Optional[str] = None
    price: float
    discount: Optional[float] = 0.0
    category: str
    quantity: int
    description: Optional[str] = None
    #image_url: Optional[str] = None  # You'll set this after uploading image
    


class ProductOut(ProductCreate):
    id: int
    image_url: str

    class Config:
        orm_mode = True