from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/recipes/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    return crud.create_recipe(db=db, recipe=recipe)

@app.get("/recipes/", response_model=List[schemas.Recipe])
def read_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = crud.get_recipes(db, skip=skip, limit=limit)
    return recipes

@app.get("/recipes/{recipe_id}", response_model=schemas.Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud.get_recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

@app.post("/recipes/{recipe_id}/ingredients/", response_model=schemas.Ingredient)
def create_ingredient_for_recipe(
    recipe_id: int, ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)
):
    return crud.create_ingredient(db=db, ingredient=ingredient, recipe_id=recipe_id)

@app.get("/ingredients/{recipe_id}", response_model=List[schemas.Ingredient])
def read_ingredients_for_recipe(recipe_id: int, db: Session = Depends(get_db)):
    ingredients = crud.get_ingredients_by_recipe(db, recipe_id=recipe_id)
    return ingredients
