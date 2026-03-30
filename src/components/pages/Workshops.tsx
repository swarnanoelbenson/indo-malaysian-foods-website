import React from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import './Workshops.css';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'Date TBA';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

const Workshops: React.FC = () => {
  const { data: workshops, loading, error } = useGoogleSheets('workshops');

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
                <article key={workshop.id} className="workshop-card">
                  <div className="workshop-card__img-wrap">
                    {workshop.imageUrls && workshop.imageUrls.length > 0 ? (
                      <img
                        src={workshop.imageUrls[0]}
                        alt={workshop.title}
                        className="workshop-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="workshop-card__img-placeholder" aria-hidden="true">🌿</div>
                    )}
                    {workshop.date && (
                      <span className="workshop-card__date-tag">
                        {formatDate(workshop.date)}
                      </span>
                    )}
                  </div>

                  <div className="workshop-card__body">
                    <h2 className="workshop-card__title">{workshop.title}</h2>

                    {workshop.location && (
                      <p className="workshop-card__location">
                        <span aria-hidden="true">📍</span> {workshop.location}
                      </p>
                    )}

                    <p className="workshop-card__description">{workshop.description}</p>

                    <div className="workshop-card__footer">
                      {workshop.capacity > 0 && (
                        <span className="workshop-card__capacity">
                          {workshop.capacity} spots available
                        </span>
                      )}
                      {workshop.registrationLink ? (
                        <a
                          href={workshop.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary workshop-card__btn"
                        >
                          Register Now
                        </a>
                      ) : (
                        <span className="workshop-card__closed">Registration Closed</span>
                      )}
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

    </main>
  );
};

export default Workshops;
