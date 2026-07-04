import React, { useEffect, useState } from 'react';
import { Workshop } from '../../types';
import './WorkshopModal.css';

const renderBold = (text: string): React.ReactNode[] => {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'Date TBA';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

interface WorkshopModalProps {
  workshop: Workshop | null;
  onClose: () => void;
}

const WorkshopModal: React.FC<WorkshopModalProps> = ({ workshop, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => { setCurrentIndex(0); }, [workshop]);

  useEffect(() => {
    if (!workshop) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [workshop, onClose]);

  useEffect(() => {
    document.body.style.overflow = workshop ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [workshop]);

  if (!workshop) return null;

  const images = workshop.imageUrls ?? [];
  const hasImages = images.length > 0;
  const prev = () => setCurrentIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrentIndex(i => (i + 1) % images.length);

  return (
    <div
      className="wm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={workshop.title}
      onClick={onClose}
    >
      <div className="wm-panel" onClick={e => e.stopPropagation()}>

        {/* ── Close ─────────────────────────── */}
        <button className="wm-close" onClick={onClose} aria-label="Close">×</button>

        {/* ── Title (full width, centered) ──── */}
        <div className="wm-header">
          <h2 className="wm-title">{workshop.title}</h2>
        </div>

        {/* ── Two-column body ───────────────── */}
        <div className="wm-body">

          {/* Left: image carousel */}
          <div className="wm-left">
            {hasImages ? (
              <div className="wm-carousel">
                <img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${workshop.title} — ${currentIndex + 1} of ${images.length}`}
                  className="wm-carousel__img"
                />
                {images.length > 1 && (
                  <>
                    <button className="wm-carousel__arrow wm-carousel__arrow--prev" onClick={prev} aria-label="Previous image">‹</button>
                    <button className="wm-carousel__arrow wm-carousel__arrow--next" onClick={next} aria-label="Next image">›</button>
                    <span className="wm-carousel__counter">{currentIndex + 1} / {images.length}</span>
                  </>
                )}
              </div>
            ) : (
              <div className="wm-no-image" aria-hidden="true">🏛️</div>
            )}
          </div>

          {/* Right: scrollable content */}
          <div className="wm-right">

            {/* Meta: date + location */}
            <div className="wm-meta-row">
              {workshop.date && (
                <span className="wm-meta__item">
                  <span aria-hidden="true">📅</span> {formatDate(workshop.date)}
                </span>
              )}
              {workshop.location && (
                <span className="wm-meta__item">
                  <span aria-hidden="true">📍</span> {workshop.location}
                </span>
              )}
            </div>

            {/* Organizers */}
            {workshop.organizers && (
              <div className="wm-section">
                <h3 className="wm-section__heading">Organizers</h3>
                <p className="wm-section__body">{renderBold(workshop.organizers)}</p>
              </div>
            )}

            {/* Full Description */}
            {workshop.fullDescription && (
              <div className="wm-section wm-section--last">
                <h3 className="wm-section__heading">About This Workshop</h3>
                <p className="wm-section__body">{workshop.fullDescription}</p>
              </div>
            )}

          </div>
        </div>

        {/* ── Registration footer ───────────── */}
        <div className="wm-footer">
          <button className="wm-reg-btn wm-reg-btn--closed" disabled>
            Registration Closed
          </button>
        </div>

      </div>
    </div>
  );
};

export default WorkshopModal;
