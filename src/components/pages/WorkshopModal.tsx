import React, { useEffect, useState } from 'react';
import { Workshop } from '../../types';
import './WorkshopModal.css';

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

  // Reset carousel index when a different workshop is opened
  useEffect(() => {
    setCurrentIndex(0);
  }, [workshop]);

  // Close on Escape key
  useEffect(() => {
    if (!workshop) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [workshop, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (workshop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [workshop]);

  if (!workshop) return null;

  const images = workshop.imageUrls ?? [];
  const hasImages = images.length > 0;

  const prev = () =>
    setCurrentIndex(i => (i - 1 + images.length) % images.length);

  const next = () =>
    setCurrentIndex(i => (i + 1) % images.length);

  return (
    <div
      className="wm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={workshop.title}
      onClick={onClose}
    >
      <div
        className="wm-panel"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Close ─────────────────────────── */}
        <button className="wm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* ── Header ────────────────────────── */}
        <div className="wm-header">
          <h2 className="wm-title">{workshop.title}</h2>
          <div className="wm-meta">
            {workshop.location && (
              <span className="wm-meta__item">
                <span aria-hidden="true">📍</span> {workshop.location}
              </span>
            )}
            {workshop.date && (
              <span className="wm-meta__item">
                <span aria-hidden="true">📅</span> {formatDate(workshop.date)}
              </span>
            )}
          </div>
        </div>

        {/* ── Image Carousel ────────────────── */}
        {hasImages && (
          <div className="wm-carousel">
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${workshop.title} — ${currentIndex + 1} of ${images.length}`}
              className="wm-carousel__img"
            />

            {images.length > 1 && (
              <>
                <button
                  className="wm-carousel__arrow wm-carousel__arrow--prev"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="wm-carousel__arrow wm-carousel__arrow--next"
                  onClick={next}
                  aria-label="Next image"
                >
                  ›
                </button>
                <span className="wm-carousel__counter">
                  {currentIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        )}

        {/* ── Context ───────────────────────── */}
        {workshop.fullDescription && (
          <div className="wm-context">
            <h3 className="wm-context__heading">About This Workshop</h3>
            <p className="wm-context__body">{workshop.fullDescription}</p>
          </div>
        )}

        {/* ── Registration (commented out as requested) ── */}
        {/*
        <div className="wm-footer">
          {workshop.registrationLink ? (
            <a
              href={workshop.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Register Now
            </a>
          ) : (
            <span className="wm-footer__closed">Registration Closed</span>
          )}
        </div>
        */}
      </div>
    </div>
  );
};

export default WorkshopModal;
