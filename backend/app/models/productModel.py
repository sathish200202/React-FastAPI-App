from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from datetime import datetime
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    brand = Column(String, nullable=True)
    price = Column(Float)
    discount = Column(Float, default=0.0)
    category = Column(String)
    quantity = Column(Integer)
    image_url = Column(String)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
