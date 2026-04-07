import React, { useEffect } from 'react';
import { Recipe } from '../../types';
import './RecipeModal.css';

const formatTime = (minutes: number): string => {
  if (!minutes || minutes <= 0) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const truncateWords = (text: string, max: number): string => {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= max) return text;
  return words.slice(0, max).join(' ') + '…';
};

const difficultyClass = (level: string): string => {
  switch (level?.toLowerCase()) {
    case 'easy':   return 'rm-difficulty--easy';
    case 'medium': return 'rm-difficulty--medium';
    case 'hard':   return 'rm-difficulty--hard';
    default:       return '';
  }
};

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {

  // Close on Escape key
  useEffect(() => {
    if (!recipe) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [recipe, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (recipe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [recipe]);

  if (!recipe) return null;

  const instructions = recipe.instructions
    ? recipe.instructions.split('|').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="rm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={recipe.name}
      onClick={onClose}
    >
      <div className="rm-panel" onClick={e => e.stopPropagation()}>

        {/* ── Close ─────────────────────────── */}
        <button className="rm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Image ─────────────────────────── */}
        {recipe.imageUrls && recipe.imageUrls.length > 0 && (
          <div className="rm-image-wrap">
            <img
              src={recipe.imageUrls[0]}
              alt={recipe.name}
              className="rm-image"
            />
            {recipe.cuisine && (
              <span className="rm-cuisine-tag">{recipe.cuisine}</span>
            )}
          </div>
        )}

        {/* ── Title & Description ───────────── */}
        <div className="rm-header">
          <h2 className="rm-title">{recipe.name}</h2>
          {recipe.description && (
            <p className="rm-description">{truncateWords(recipe.description, 50)}</p>
          )}
        </div>

        {/* ── Stats row ─────────────────────── */}
        <div className="rm-stats">
          <div className="rm-stat">
            <span className="rm-stat__label">Prep</span>
            <span className="rm-stat__value">{formatTime(recipe.prepTime)}</span>
          </div>
          <div className="rm-stat">
            <span className="rm-stat__label">Cook</span>
            <span className="rm-stat__value">{formatTime(recipe.cookTime)}</span>
          </div>
          <div className="rm-stat">
            <span className="rm-stat__label">Serves</span>
            <span className="rm-stat__value">{recipe.servings || '—'}</span>
          </div>
          {recipe.cuisine && (
            <div className="rm-stat">
              <span className="rm-stat__label">Cuisine</span>
              <span className="rm-stat__value rm-stat__value--cuisine">{recipe.cuisine}</span>
            </div>
          )}
          {recipe.difficulty && (
            <div className="rm-stat">
              <span className="rm-stat__label">Difficulty</span>
              <span className={`rm-stat__value rm-difficulty ${difficultyClass(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
            </div>
          )}
        </div>

        {/* ── Ingredients ───────────────────── */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="rm-section">
            <h3 className="rm-section__heading">Ingredients</h3>
            <ol className="rm-list">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="rm-list__item">{item}</li>
              ))}
            </ol>
          </div>
        )}

        {/* ── Instructions ──────────────────── */}
        {instructions.length > 0 && (
          <div className="rm-section rm-section--last">
            <h3 className="rm-section__heading">Instructions</h3>
            <ol className="rm-list">
              {instructions.map((step, i) => (
                <li key={i} className="rm-list__item">{step}</li>
              ))}
            </ol>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecipeModal;
