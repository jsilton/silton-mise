from pydantic import BaseModel
from typing import List, Optional

class IngredientBase(BaseModel):
    name: str

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int
    recipe_id: int

    class Config:
        orm_mode = True

class RecipeBase(BaseModel):
    name: str
    source: Optional[str] = None
    tags: Optional[str] = None
    why: Optional[str] = None
    instructions: Optional[str] = None
    notes: Optional[str] = None
    gold_standard: bool = False

class RecipeCreate(RecipeBase):
    pass

class Recipe(RecipeBase):

    id: int

    ingredients: List[Ingredient] = []



    class Config:

        orm_mode = True



class PantryItemBase(BaseModel):

    name: str

    quantity: Optional[str] = None

    unit: Optional[str] = None



class PantryItemCreate(PantryItemBase):

    pass



class PantryItem(PantryItemBase):

    id: int



    class Config:

        orm_mode = True
