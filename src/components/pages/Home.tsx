import React from 'react';
import { Link } from 'react-router-dom';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import './Home.css';

const Home: React.FC = () => {
const { data: universities, loading: universitiesLoading } = useGoogleSheets('universities');

  return (
    <main className="page page--home">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="home-hero hero-section">
        <Container>
          <div className="home-hero__content">
            <h1 className="home-hero__title">
              Preserving the Flavours of{' '}
              <span className="home-hero__accent">Indo-Malaysian</span>{' '}
              Indigenous Heritage
            </h1>
            <p className="home-hero__subtitle">
              Explore the rich culinary traditions of indigenous communities across India
              and Malaysia — from ancient recipes passed down through generations to modern
              workshops celebrating cultural identity.
            </p>
            <div className="home-hero__actions">
              <Link to="/workshops" className="btn-secondary">Explore Workshops</Link>
              <Link to="/food-recipes" className="btn-outline-light">Discover Recipes</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Why These Foods Matter ────────────────────────── */}
      <section className="page-section home-why">
        <Container narrow>
          <h2 className="section-title centered">Why These Foods Matter</h2>
          <div className="home-why__body">
            <p>
              Indigenous foods are more than sustenance — they are living archives of culture,
              ecology, and identity. The culinary traditions of Indo-Malaysian indigenous communities
              encode generations of knowledge about local ecosystems, seasonal rhythms, and communal
              values that cannot be found in any cookbook.
            </p>
            <p>
              As globalisation reshapes food systems, many of these traditions face the risk of
              being forgotten. This project brings together researchers, community leaders, and food
              practitioners to document, celebrate, and revitalise these irreplaceable culinary heritages.
            </p>
            <p>
              Through hands-on workshops, expert talks, and accessible recipe guides, we aim to make
              indigenous food knowledge available to new generations — honouring the past while
              nourishing the future.
            </p>
          </div>
        </Container>
      </section>

      {/* ── University Collaboration ──────────────────────── */}
      <section className="page-section home-universities bg-light">
        <Container>
          <h2 className="section-title centered">University Collaboration</h2>
          <p className="home-section-lead">
            This project is a joint initiative between leading research universities committed
            to the preservation of indigenous cultural heritage.
          </p>

          {universitiesLoading && (
            <div className="home-universities__grid">
              {[1, 2].map(i => <div key={i} className="skeleton home-skeleton--uni" />)}
            </div>
          )}

          {!universitiesLoading && universities && universities.length > 0 && (
            <div className="home-universities__grid">
              {universities.map(uni => (
                <a
                  key={uni.id}
                  href={uni.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uni-card"
                >
                  {uni.logoUrl ? (
                    <img
                      src={uni.logoUrl}
                      alt={`${uni.name} logo`}
                      className="uni-card__logo"
                      loading="lazy"
                    />
                  ) : (
                    <div className="uni-card__logo-placeholder" aria-hidden="true">
                      {uni.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="uni-card__name">{uni.name}</h3>
                  <p className="uni-card__description">{uni.description}</p>
                  <span className="uni-card__cta">Visit Website →</span>
                </a>
              ))}
            </div>
          )}

          {!universitiesLoading && (!universities || universities.length === 0) && (
            <p className="home-empty">University information coming soon.</p>
          )}
        </Container>
      </section>



      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="home-cta hero-section">
        <Container>
          <div className="home-cta__inner">
            <h2 className="home-cta__title">Ready to Explore?</h2>
            <p className="home-cta__text">
              Join us in rediscovering the rich culinary traditions of Indo-Malaysian indigenous communities.
            </p>
            <div className="home-cta__actions">
              <Link to="/workshops" className="btn-secondary">Explore Workshops</Link>
              <Link to="/food-recipes" className="btn-outline-light">Discover Recipes</Link>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
};

export default Home;
