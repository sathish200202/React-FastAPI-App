from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# ---- INPUT SCHEMA ----

class SingleProductOrderSummary(BaseModel):
    product_id: int
    quantity: int
    discount_code: Optional[str] = None
class SingleProductOrder(BaseModel):
    product_id: int
    quantity: int
    discount_code: Optional[str] = None
    shipping_address: Optional[str] = "N/A"
    payment_method: str  # "cod", "upi", "card"

# ---- ORDER ITEM OUTPUT SCHEMA ----
class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    price: float

    class Config:
        orm_mode = True

# ---- ORDER OUTPUT SCHEMA ----
class OrderOut(BaseModel):
    id: int
    user_id: int
    quantity: int
    total_price: float
    discount_percentage: Optional[float] = 0.0
    discount_amount: Optional[float] = 0.0
    shipping_address: Optional[str]
    shipping_price: Optional[float]
    payment_method: Optional[str]
    payment_status: Optional[str]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    order_items: Optional[List[OrderItemOut]] = []

    class Config:
        orm_mode = True
