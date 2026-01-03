from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Default to local postgres on Mac (Homebrew)
# If this fails, try: "postgresql://jsilton@localhost/silton_mise"
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost/silton_mise")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()