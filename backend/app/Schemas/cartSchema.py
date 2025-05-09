from pydantic import BaseModel, Field
from typing import Optional


class CartCreate(BaseModel):
    user_id: int = Field(..., title="User ID", alias="User_id")
    product_id: int = Field(..., title="Product ID")
    quantity: int = Field(..., title="Quantity of Product")


class updateQuantity(BaseModel):
    quantity: Optional[int] = Field(1, title="Quantity of Product")


class ProductOut(BaseModel):
    id: int
    product_name: str
    brand: str
    price: float
    discount: float
    category: str
    quantity: int
    image_url: str
    description: Optional[str]

    class Config:
        orm_mode = True

class CartOut(CartCreate):
    id: int
    quantity: int
    total_price: float
    user_id: int
    product: ProductOut

    class Config:
        orm_mode = True