import React, { useState } from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import WorkshopModal from './WorkshopModal';
import { Workshop } from '../../types';
import './Workshops.css';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'Date TBA';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Workshops: React.FC = () => {
  const { data: workshops, loading, error } = useGoogleSheets('workshops');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  return (
    <main className="page page--workshops">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="workshops-hero hero-section">
        <Container>
          <div className="workshops-hero__content">
            <h1 className="workshops-hero__title">Workshops</h1>
            <p className="workshops-hero__subtitle">
              Hands-on learning experiences celebrating the culinary traditions of
              Indo-Malaysian indigenous communities. Register for an upcoming session.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Grid ─────────────────────────────────────────── */}
      <section className="page-section workshops-body">
        <Container>
          {loading && (
            <div className="workshops-grid">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton workshops-skeleton--card" />
              ))}
            </div>
          )}

          {error && (
            <p className="workshops-msg workshops-msg--error">
              Failed to load workshops. Please try again later.
            </p>
          )}

          {workshops && workshops.length > 0 && (
            <div className="workshops-grid">
              {workshops.map(workshop => (
                <article
                  key={workshop.id}
                  className="workshop-card workshop-card--clickable"
                  onClick={() => setSelectedWorkshop(workshop)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedWorkshop(workshop); }}
                  aria-label={`View more about ${workshop.title}`}
                >
                  <div className="workshop-card__img-wrap">
                    {workshop.imageUrls && workshop.imageUrls.length > 0 ? (
                      <img
                        src={workshop.imageUrls[0]}
                        alt={workshop.title}
                        className="workshop-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="workshop-card__img-placeholder" aria-hidden="true"></div>
                    )}
                    {workshop.date && (
                      <span className="workshop-card__date-tag">
                        {formatDate(workshop.date)}
                      </span>
                    )}
                  </div>

                  <div className="workshop-card__body">
                    <h2 className="workshop-card__title">{workshop.title}</h2>

                    {workshop.fullDescription && (
                      <p className="workshop-card__description">
                        {workshop.fullDescription.length > 160
                          ? workshop.fullDescription.slice(0, 160).trimEnd() + '…'
                          : workshop.fullDescription}
                      </p>
                    )}

                    {workshop.location && (
                      <p className="workshop-card__location">
                        <span aria-hidden="true">📍</span> {workshop.location}
                      </p>
                    )}

                    <div className="workshop-card__footer">
                      <button
                        className="btn-secondary workshop-card__btn"
                        onClick={e => { e.stopPropagation(); setSelectedWorkshop(workshop); }}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {workshops && workshops.length === 0 && (
            <p className="workshops-msg">
              No workshops are currently scheduled. Check back soon!
            </p>
          )}
        </Container>
      </section>

      <WorkshopModal
        workshop={selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
      />
    </main>
  );
};

export default Workshops;
