from passlib.context import CryptContext
from fastapi import Depends, Request
from sqlalchemy.orm import Session
from typing import Optional
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os

from models.userModel import User

from models.discoutModel import Discount

from database import get_db

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# JWT token creation and verification
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    default_expire = timedelta(days=2)
    expire = datetime.utcnow() + (expires_delta or default_expire)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt


def get_token_from_header(request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header",
        )       
    
    token = auth_header.split(" ")[1]
    if not token:
        return JSONResponse(status_code=401, content={"message": "Not authorized"})
    
       # Define the credentials_exception to pass in
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    return token, credentials_exception




def get_current_user(request, db, User):
    token, credentials_exception = get_token_from_header(request)
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


def admin_required(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db, User)
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action",
        )
    return user


def discount_calculate(total_price: float, code: Optional[str], db: Session):
    from datetime import datetime

    if not code:
        return 0.0, 0.0
    
    discount = db.query(Discount).filter(
        Discount.code == code,
        Discount.start_date <= datetime.utcnow(),
        Discount.end_date >= datetime.utcnow(),
        Discount.is_active == True
    ).first()

    if discount:
        discount_percentage = discount.percentage
        discount_amount = total_price * (discount_percentage / 100)
        return discount_percentage, discount_amount
    return 0.0, 0.0


def shipping_price_caluculation(total_price: float) -> float:
    """
    Calculate shipping price based on total order price.
    The shipping price changes based on the order's total price.

    :param total_price: Total price of the order
    :param db: Database session (not currently used, but you can extend logic if needed)
    :return: Shipping price based on total order price
    """
    # Define shipping price based on the order total price
    if total_price <= 300:
        return 0.0  # Free shipping for orders under ₹300
    elif total_price > 300 and total_price <= 1000:
        return 22.00  # Flat shipping price for orders between ₹300 and ₹1000
    elif total_price > 1000 and total_price <= 5000:
        return 43.00  # Flat shipping price for orders between ₹1000 and ₹5000
    elif total_price > 5000:
        return 70.00  # Flat shipping price for orders above ₹5000

    return 0.0  # Default case (shouldn't reach here unless logic is updated)
