import React from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import './About.css';

const About: React.FC = () => {
  const { data: about, loading, error } = useGoogleSheets('about');

  const sorted = about
    ? [...about].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    : null;

  return (
    <main className="page page--about">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about-hero hero-section">
        <Container>
          <div className="about-hero__content">
            <h1 className="about-hero__title">About This Project</h1>
            <p className="about-hero__subtitle">
              Discover the mission, vision, and people behind the Indo-Malaysian Indigenous Foods initiative.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="about-body">
        {loading && (
          <Container>
            <div className="about-skeletons">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton about-skeleton--section" />
              ))}
            </div>
          </Container>
        )}

        {error && (
          <Container>
            <p className="about-msg about-msg--error">
              Failed to load content. Please try again later.
            </p>
          </Container>
        )}

        {sorted && sorted.map((section, idx) => (
          <section
            key={section.id}
            className={`about-section ${idx % 2 === 1 ? 'about-section--alt' : ''}`}
          >
            <Container>
              <div
                className={`about-section__inner${
                  !section.imageUrls?.length ? ' about-section__inner--no-img' : ''
                }`}
              >
                {section.imageUrls && section.imageUrls.length > 0 && (
                  <div className="about-section__img-wrap">
                    <img
                      src={section.imageUrls[0]}
                      alt={section.heading}
                      className="about-section__img"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="about-section__text">
                  {section.section && (
                    <span className="badge badge-outline about-section__label">
                      {section.section}
                    </span>
                  )}
                  <h2 className="section-title">{section.heading}</h2>
                  <div className="about-section__content">
                    {section.content
                      .split('\n')
                      .filter(Boolean)
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        ))}

        {sorted && sorted.length === 0 && !loading && (
          <Container>
            <p className="about-msg">Content coming soon.</p>
          </Container>
        )}
      </div>

    </main>
  );
};

export default About;
