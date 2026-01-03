from googleapiclient.discovery import build
from datetime import datetime, timedelta

def sync_plan_to_calendar(plan, service):
    # plan is a dict: {"Monday": RecipeObject, ...}
    # service is the Google Calendar API service object
    
    # We'll assume the sync is for the "upcoming" week starting from today or next Monday
    # For simplicity, let's start from today
    start_date = datetime.now()
    
    # Days mapping to offset from start_date
    days_offset = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
    }
    
    # Ensure start_date is Monday if we want a clean weekly sync
    # while start_date.strftime("%A") != "Monday":
    #     start_date += timedelta(days=1)

    for day, recipe in plan.items():
        if not recipe:
            continue
            
        event_date = (start_date + timedelta(days=days_offset[day])).strftime('%Y-%m-%d')
        
        # Prepare ingredients list for description
        ingredients_text = "\n".join([f"- {ing.name}" for ing in recipe.ingredients])
        
        description = f"Recipe: {recipe.name}\n\nIngredients:\n{ingredients_text}\n\nInstructions:\n{recipe.instructions}"
        
        event = {
            'summary': f"Dinner: {recipe.name}",
            'description': description,
            'start': {
                'date': event_date,
                'timeZone': 'UTC', # Should be user's timezone
            },
            'end': {
                'date': event_date,
                'timeZone': 'UTC',
            },
        }
        
        event = service.events().insert(calendarId='primary', body=event).execute()
        print(f"Event created: {event.get('htmlLink')}")
