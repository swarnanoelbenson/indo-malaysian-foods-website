import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <main className="not-found">
      <div className="not-found__inner container">
        <span className="not-found__code" aria-hidden="true">404</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__message">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary not-found__btn">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
