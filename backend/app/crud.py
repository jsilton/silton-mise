from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from . import models, schemas

def get_recipe(db: Session, recipe_id: int):
    return db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()

def get_recipes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Recipe).offset(skip).limit(limit).all()

def get_recipes_by_tag(db: Session, tag: str):
    return db.query(models.Recipe).filter(models.Recipe.tags.like(f"%{tag}%")).all()

def get_random_recipe_by_tag(db: Session, tag: str):
    return db.query(models.Recipe).filter(models.Recipe.tags.like(f"%{tag}%")).order_by(func.random()).first()

def create_recipe(db: Session, recipe: schemas.RecipeCreate):
    db_recipe = models.Recipe(**recipe.dict())
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def get_ingredients_by_recipe(db: Session, recipe_id: int):
    return db.query(models.Ingredient).filter(models.Ingredient.recipe_id == recipe_id).all()

def create_ingredient(db: Session, ingredient: schemas.IngredientCreate, recipe_id: int):
    db_ingredient = models.Ingredient(**ingredient.dict(), recipe_id=recipe_id)
    db.add(db_ingredient)
    db.commit()
    db.refresh(db_ingredient)
    return db_ingredient

def get_pantry_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PantryItem).offset(skip).limit(limit).all()

def create_pantry_item(db: Session, item: schemas.PantryItemCreate):
    db_item = models.PantryItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
