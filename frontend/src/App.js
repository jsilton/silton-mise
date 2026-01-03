import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState('meal-plan');
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [pantry, setPantry] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/recipes/')
      .then(res => res.json())
      .then(data => setRecipes(data));
      
    fetch('http://localhost:8000/meal-plan/')
      .then(res => res.json())
      .then(data => setMealPlan(data));
      
    fetch('http://localhost:8000/pantry/')
      .then(res => res.json())
      .then(data => setPantry(data));
  }, []);

  const renderMealPlan = () => (
    <div className="view">
      <h2>Weekly Meal Plan</h2>
      <div className="meal-grid">
        {Object.entries(mealPlan).map(([day, recipe]) => (
          <div key={day} className="meal-card">
            <h3>{day}</h3>
            <p>{recipe ? recipe.name : 'No meal planned'}</p>
          </div>
        ))}
      </div>
      <button onClick={() => {
        fetch('http://localhost:8000/meal-plan/')
          .then(res => res.json())
          .then(data => setMealPlan(data));
      }}>Regenerate Plan</button>
    </div>
  );

  const renderRecipes = () => (
    <div className="view">
      <h2>Recipe Library</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name} {recipe.gold_standard && '⭐'}</h3>
            <p>{recipe.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPantry = () => (
    <div className="view">
      <h2>Pantry Management</h2>
      <div className="pantry-list">
        {pantry.map(item => (
          <div key={item.id} className="pantry-item">
            <span>{item.name}</span>
            <span>{item.quantity} {item.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Silton-Mise</h1>
        <nav>
          <button onClick={() => setView('meal-plan')}>Meal Plan</button>
          <button onClick={() => setView('recipes')}>Recipes</button>
          <button onClick={() => setView('pantry')}>Pantry</button>
        </nav>
      </header>
      <main>
        {view === 'meal-plan' && renderMealPlan()}
        {view === 'recipes' && renderRecipes()}
        {view === 'pantry' && renderPantry()}
      </main>
    </div>
  );
}

export default App;