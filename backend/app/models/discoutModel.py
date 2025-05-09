from sqlalchemy import Column, Integer, Float, ForeignKey, String, DateTime, Boolean, func
from database import Base

class Discount(Base):
    __tablename__ = "discounts"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, nullable=False)  # e.g., "DIWALI10"
    percentage = Column(Float, nullable=False)           # e.g., 10.0 for 10%
    festival = Column(String, nullable=True)             # Optional, e.g., "Diwali"
    start_date = Column(DateTime, nullable=False)        # Valid from
    end_date = Column(DateTime, nullable=False)          # Valid until
    min_order_amount = Column(Float, default=0.0)        # Apply if order exceeds this
    is_active = Column(Boolean, default=True)            # Easier to work with than Integer
