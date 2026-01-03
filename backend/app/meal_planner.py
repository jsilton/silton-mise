from sqlalchemy.orm import Session, joinedload
from . import crud, models
import random

# Constraints from SILTON_CODEX.md
EXCLUDED_INGREDIENTS = ["capers", "water chestnuts"]
EXCLUDED_TEXTURES = ["mushy"]

def is_recipe_allowed(recipe: models.Recipe):
    # Check for excluded ingredients in name, instructions, and ingredients list
    # Convert everything to lowercase for case-insensitive matching
    
    recipe_text = (recipe.name + " " + (recipe.instructions or "")).lower()
    
    for ingredient in EXCLUDED_INGREDIENTS:
        if ingredient.lower() in recipe_text:
            return False
            
    # Check actual ingredients linked in database
    for ing in recipe.ingredients:
        if any(excl.lower() in ing.name.lower() for excl in EXCLUDED_INGREDIENTS):
            return False
            
    # Check for excluded textures
    for texture in EXCLUDED_TEXTURES:
        if texture.lower() in recipe_text:
            return False
            
    return True

def generate_weekly_plan(db: Session):
    plan = {}
    
    # Days of the week
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    # Mapping days to categories/tags based on SILTON_CODEX.md
    rules = {
        "Monday": "Weekday Speed & Survival (Mon-Thu)",
        "Tuesday": "Weekday Speed & Survival (Mon-Thu)",
        "Wednesday": "Italian",
        "Thursday": "bowl",
        "Friday": "Comfort & Family (Sundays)",
        "Saturday": "Projects & Feasts (Weekends)",
        "Sunday": "Comfort & Family (Sundays)"
    }
    
    selected_recipe_ids = set()
    
    for day in days:
        tag = rules[day]
        
        # Query for recipes with the tag and that are gold standard
        # Use joinedload to efficiently load ingredients for checking constraints
        query = db.query(models.Recipe).options(joinedload(models.Recipe.ingredients)).filter(
            models.Recipe.tags.like(f"%{tag}%"),
            models.Recipe.gold_standard == True
        )
        
        # Avoid duplicates in the same week
        if selected_recipe_ids:
            query = query.filter(~models.Recipe.id.in_(selected_recipe_ids))
            
        recipes = query.all()
        
        # Filter based on constraints
        allowed_recipes = [r for r in recipes if is_recipe_allowed(r)]
        
        if not allowed_recipes:
            # Fallback
            fallback_query = db.query(models.Recipe).options(joinedload(models.Recipe.ingredients)).filter(
                models.Recipe.gold_standard == True
            )
            if selected_recipe_ids:
                fallback_query = fallback_query.filter(~models.Recipe.id.in_(selected_recipe_ids))
            fallback_recipes = fallback_query.all()
            allowed_recipes = [r for r in fallback_recipes if is_recipe_allowed(r)]
            
        if allowed_recipes:
            selected_recipe = random.choice(allowed_recipes)
            plan[day] = selected_recipe
            selected_recipe_ids.add(selected_recipe.id)
        else:
            plan[day] = None
            
    return plan