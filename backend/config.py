import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DATABASE_URL", f"sqlite:///{BASE_DIR}/app.db")

# Render provides DATABASE_URL with 'postgres://' scheme, which SQLAlchemy might not recognize
# Replace with 'postgresql://'
if DATABASE and DATABASE.startswith("postgres://"):
    DATABASE = DATABASE.replace("postgres://", "postgresql://", 1)
