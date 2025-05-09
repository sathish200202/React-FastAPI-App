from sqlalchemy import Column, Integer, Float, ForeignKey, String, DateTime, func
from sqlalchemy.orm import relationship
from database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(20), unique=True, index=True)  # Human-readable ID (e.g., "ORD-20230501-001")
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    quantity = Column(Integer, default=1)
    total_price = Column(Float, nullable=False)
    
    # Discount fields
    discount_percentage = Column(Float, default=0.0)  # Discount percentage
    discount_amount = Column(Float, default=0.0)  # Discount amount (for reference)

    final_price = Column(Float, nullable=False)
    
    # Order status (pending, processing, completed, canceled, etc.)
    status = Column(String, default="pending")

    # Shipping details (for delivery purposes)
    shipping_address = Column(String, nullable=True)  # Address for delivery
    shipping_price = Column(Float, default=0.0)  # Shipping cost

    # Payment information (for real-time payment systems)
    payment_status = Column(String, default="pending")  # e.g., "paid", "pending", "failed"
    payment_method = Column(String, nullable=True)  # e.g., "credit_card", "paypal", "cod"

    created_at = Column(DateTime, server_default=func.now())  # Timestamp for when the order is created
    updated_at = Column(DateTime, onupdate=func.now())  # Timestamp for when the order is updated
    estimated_delivery_date = Column(DateTime)  # Shown to user (auto-calculated)
    actual_delivery_date = Column(DateTime)  # Updated when delivered

    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")

    @property
    def final_price(self):
        # Calculate final price after discount
        return self.total_price - self.discount_amount + self.shipping_price

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.discount_amount = self.total_price * (self.discount_percentage / 100)


class OrderItem(Base):
    __tablename__ = "order_item"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

     # Item details (snapshot at time of purchase)
    product_name = Column(String(200), nullable=False)  # Archived name
    product_price = Column(Float, nullable=False)  # Archived price
    quantity = Column(Integer, default=1)
    quantity = Column(Integer, default=1)
    price = Column(Float, nullable=False)


    # Relationships
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product")