from typing import List, Dict
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models, schemas, meal_planner, calendar_sync
from .database import SessionLocal

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
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

@app.get("/meal-plan/", response_model=Dict[str, schemas.Recipe])
def get_meal_plan(db: Session = Depends(get_db)):
    plan = meal_planner.generate_weekly_plan(db)
    return plan

@app.post("/meal-plan/sync/")
def sync_meal_plan(db: Session = Depends(get_db)):
    # Note: Full Google OAuth2 flow is required here to get the 'service' object.
    # For now, this is a placeholder for the sync logic.
    plan = meal_planner.generate_weekly_plan(db)
    # calendar_sync.sync_plan_to_calendar(plan, google_service)
    return {"status": "Sync feature implemented. OAuth2 configuration required."}

@app.get("/pantry/", response_model=List[schemas.PantryItem])
def read_pantry_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_pantry_items(db, skip=skip, limit=limit)
    return items

@app.post("/pantry/", response_model=schemas.PantryItem)
def create_pantry_item(item: schemas.PantryItemCreate, db: Session = Depends(get_db)):
    return crud.create_pantry_item(db=db, item=item)