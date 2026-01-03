import os
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from typing import Optional

from backend.app import crud, models, schemas
from backend.app.database import SessionLocal, engine

# Ensure tables are created
models.Base.metadata.create_all(bind=engine)

def parse_recipe_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'lxml')

    recipe_data = {}

    # Extract Name
    name_tag = soup.find('h1', itemprop='name', class_='name')
    if name_tag:
        recipe_data['name'] = name_tag.get_text(strip=True)

    # Extract Categories (Tags)
    categories_tag = soup.find('p', itemprop='recipeCategory', class_='categories')
    if categories_tag:
        recipe_data['tags'] = categories_tag.get_text(strip=True)

    # Extract Source
    source_tag = soup.find('a', itemprop='url')
    if source_tag:
        recipe_data['source'] = source_tag.find('span', itemprop='author').get_text(strip=True) if source_tag.find('span', itemprop='author') else source_tag['href']
    
    # Prep Time, Cook Time, Servings are not directly in our model, so we'll skip for now.
    # We can add these as separate fields in the future or parse them into notes.

    # Extract Ingredients
    ingredients = []
    ingredients_div = soup.find('div', class_='ingredients text')
    if ingredients_div:
        for p_tag in ingredients_div.find_all('p', class_='line', itemprop='recipeIngredient'):
            ingredient_text = p_tag.get_text(strip=True)
            # Filter out lines that are likely section headers (e.g., "FOR THE CHICKEN TENDERS:")
            # A simple heuristic: if it ends with ':' and has few words, it's likely a header.
            if not (ingredient_text.endswith(':') and len(ingredient_text.split()) < 5):
                ingredients.append(ingredient_text)
    recipe_data['ingredients'] = ingredients

    # Extract Instructions
    instructions = []
    directions_div = soup.find('div', itemprop='recipeInstructions', class_='directions text')
    if directions_div:
        for p_tag in directions_div.find_all('p', class_='line'):
            instructions.append(p_tag.get_text(strip=True))
    recipe_data['instructions'] = "\n".join(instructions)

    # For 'why' and 'notes', we don't have direct HTML elements, so they will be empty initially.
    recipe_data['why'] = ""
    recipe_data['notes'] = ""

    return recipe_data

def populate_database(db: Session, recipes_dir: str):
    for filename in os.listdir(recipes_dir):
        if filename.endswith(".html"):
            file_path = os.path.join(recipes_dir, filename)
            print(f"Parsing and adding {filename} to database...")
            data = parse_recipe_html(file_path)

            recipe_name: str = data.get('name', 'Unknown Recipe')
            source: Optional[str] = data.get('source')
            tags: Optional[str] = data.get('tags')
            instructions: Optional[str] = data.get('instructions')
            why: Optional[str] = data.get('why')
            notes: Optional[str] = data.get('notes')

            # Create Recipe
            recipe_in = schemas.RecipeCreate(
                name=recipe_name,
                source=source,
                tags=tags,
                why=why,
                instructions=instructions,
                notes=notes
            )
            db_recipe = crud.create_recipe(db=db, recipe=recipe_in)

            # Create Ingredients
            for ingredient_name in data.get('ingredients', []):
                ingredient_in = schemas.IngredientCreate(name=ingredient_name)
                crud.create_ingredient(db=db, ingredient=ingredient_in, recipe_id=db_recipe.id)
            print(f"  Added '{recipe_name}' with {len(data.get('ingredients', []))} ingredients.")
            print("-" * 30)

if __name__ == "__main__":
    db_session = SessionLocal()
    try:
        populate_database(db=db_session, recipes_dir="My Recipes/Recipes")
        print("Database population complete.")
    except Exception as e:
        print(f"An error occurred: {e}")
        db_session.rollback()
    finally:
        db_session.close()