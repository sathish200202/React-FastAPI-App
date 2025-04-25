from pydantic import BaseModel, Field
from typing import Optional


class CartCreate(BaseModel):
    User_id: int = Field(..., title="User ID")
    product_id: int = Field(..., title="Product ID")
    quantity: int = Field(..., title="Quantity of Product")


class updateQuantity(BaseModel):
    quantity: Optional[int] = Field(1, title="Quantity of Product")


class CartOut(CartCreate):
    id: int = Field(..., title="Cart ID")

    class Config:
        orm_mode = True