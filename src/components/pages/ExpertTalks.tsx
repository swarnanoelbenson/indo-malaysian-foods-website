import React from 'react';
import useGoogleSheets from '../../hooks/useGoogleSheets';
import Container from '../common/Container';
import './ExpertTalks.css';

const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

const ExpertTalks: React.FC = () => {
  const { data: videos, loading, error } = useGoogleSheets('videos');

  return (
    <main className="page page--expert-talks">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="expert-hero hero-section">
        <Container>
          <div className="expert-hero__content">
            <h1 className="expert-hero__title">Expert Talks</h1>
            <p className="expert-hero__subtitle">
              Insights from leading scholars, food practitioners, and community voices on
              Indo-Malaysian indigenous food heritage.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Video Grid ───────────────────────────────────── */}
      <section className="page-section expert-body">
        <Container>
          {loading && (
            <div className="expert-grid">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton expert-skeleton--card" />
              ))}
            </div>
          )}

          {error && (
            <p className="expert-msg expert-msg--error">
              Failed to load videos. Please try again later.
            </p>
          )}

          {videos && videos.length > 0 && (
            <div className="expert-grid">
              {videos.map(video => (
                <article key={video.id} className="video-card">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card__thumb-wrap"
                    aria-label={`Watch: ${video.title}`}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="video-card__thumb"
                      loading="lazy"
                    />
                    <div className="video-card__play" aria-hidden="true">▶</div>
                  </a>

                  <div className="video-card__body">
                    <h2 className="video-card__title">{video.title}</h2>

                    {video.speaker && (
                      <p className="video-card__speaker">
                        <span className="video-card__speaker-label">Speaker: </span>
                        {video.speaker}
                      </p>
                    )}

                    {video.description && (
                      <p className="video-card__description">{video.description}</p>
                    )}

                    <div className="video-card__footer">
                      {video.uploadDate && (
                        <span className="video-card__date">{formatDate(video.uploadDate)}</span>
                      )}
                      {video.tags && (
                        <div className="video-card__tags">
                          {video.tags.split(',').map((t, i) => (
                            <span key={i} className="tag">{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {videos && videos.length === 0 && (
            <p className="expert-msg">No talks available yet. Check back soon!</p>
          )}
        </Container>
      </section>

    </main>
  );
};

export default ExpertTalks;
