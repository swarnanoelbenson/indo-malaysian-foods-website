import React, { useState } from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import RecipeModal from './RecipeModal';
import { Recipe } from '../../types';
import './FoodRecipes.css';

const formatTime = (minutes: number): string => {
  if (!minutes || minutes <= 0) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const difficultyClass = (level: string): string => {
  switch (level?.toLowerCase()) {
    case 'easy':   return 'recipe-card__difficulty--easy';
    case 'medium': return 'recipe-card__difficulty--medium';
    case 'hard':   return 'recipe-card__difficulty--hard';
    default:       return '';
  }
};

const FoodRecipes: React.FC = () => {
  const { data: recipes, loading, error } = useGoogleSheets('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <main className="page page--food-recipes">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="recipes-hero hero-section">
        <Container>
          <div className="recipes-hero__content">
            <h1 className="recipes-hero__title">Food &amp; Recipes</h1>
            <p className="recipes-hero__subtitle">
              Traditional recipes passed down through generations — authentic flavours from
              Indo-Malaysian indigenous communities, now in your kitchen.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Recipe Grid ──────────────────────────────────── */}
      <section className="page-section recipes-body">
        <Container wide>
          {loading && (
            <div className="recipes-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="skeleton recipes-skeleton--card" />
              ))}
            </div>
          )}

          {error && (
            <p className="recipes-msg recipes-msg--error">
              Failed to load recipes. Please try again later.
            </p>
          )}

          {recipes && recipes.length > 0 && (
            <div className="recipes-grid">
              {recipes.map(recipe => (
                <article
                  key={recipe.id}
                  className="recipe-card recipe-card--clickable"
                  onClick={() => setSelectedRecipe(recipe)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedRecipe(recipe); }}
                  aria-label={`View recipe for ${recipe.name}`}
                >
                  <div className="recipe-card__img-wrap">
                    {recipe.imageUrls && recipe.imageUrls.length > 0 ? (
                      <img
                        src={recipe.imageUrls[0]}
                        alt={recipe.name}
                        className="recipe-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="recipe-card__img-placeholder" aria-hidden="true">🍲</div>
                    )}
                    {recipe.cuisine && (
                      <span className="recipe-card__cuisine">{recipe.cuisine}</span>
                    )}
                  </div>

                  <div className="recipe-card__body">
                    <div className="recipe-card__header">
                      <h2 className="recipe-card__name">{recipe.name}</h2>
                      {recipe.difficulty && (
                        <span
                          className={`recipe-card__difficulty ${difficultyClass(recipe.difficulty)}`}
                        >
                          {recipe.difficulty}
                        </span>
                      )}
                    </div>

                    {recipe.description && (
                      <p className="recipe-card__description">{recipe.description}</p>
                    )}

                    <div className="recipe-card__stats">
                      <div className="recipe-stat">
                        <span className="recipe-stat__label">Prep</span>
                        <span className="recipe-stat__value">{formatTime(recipe.prepTime)}</span>
                      </div>
                      <div className="recipe-stat">
                        <span className="recipe-stat__label">Cook</span>
                        <span className="recipe-stat__value">{formatTime(recipe.cookTime)}</span>
                      </div>
                      <div className="recipe-stat">
                        <span className="recipe-stat__label">Serves</span>
                        <span className="recipe-stat__value">{recipe.servings || '—'}</span>
                      </div>
                    </div>

                    <div className="recipe-card__footer">
                      <button
                        className="btn-secondary recipe-card__btn"
                        onClick={e => { e.stopPropagation(); setSelectedRecipe(recipe); }}
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {recipes && recipes.length === 0 && (
            <p className="recipes-msg">No recipes available yet. Check back soon!</p>
          )}
        </Container>
      </section>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </main>
  );
};

export default FoodRecipes;
