import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home',          path: '/' },
  { label: 'About',         path: '/about' },
  { label: 'Workshops',     path: '/workshops' },
  { label: 'Expert Talks',  path: '/expert-talks' },
  { label: 'Food & Recipes',path: '/food-recipes' },
  { label: 'Contact Us',    path: '/contact-us' },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">

        {/* Left — Branding */}
        <div className="footer__col footer__col--brand">
          <div className="footer__logo">
            <span className="footer__logo-icon" aria-hidden="true">🌿</span>
            <span className="footer__logo-name">IndoMalaysian Foods</span>
          </div>
          <p className="footer__tagline">
            Preserving and celebrating the rich culinary heritage of Indo-Malaysian
            indigenous communities — one dish, one story at a time.
          </p>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Indo-Malaysian Foods Project.
            <br />All rights reserved.
          </p>
        </div>

        {/* Center — Quick Links */}
        <div className="footer__col footer__col--links">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
            {QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} className="footer__link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Contact & Social */}
        <div className="footer__col footer__col--contact">
          <h3 className="footer__heading">Get In Touch</h3>
          <address className="footer__address">
            <p>
              <span className="footer__contact-label">Email</span>
              <a href="mailto:info@indomalaysianfoods.org" className="footer__link">
                info@indomalaysianfoods.org
              </a>
            </p>
            <p>
              <span className="footer__contact-label">Location</span>
              <span> India / Malaysia</span>
            </p>
            <p>
              <span className="footer__contact-label">Phone</span>
              <span>+60 00-000 0000</span>
            </p>
          </address>

          <div className="footer__social" aria-label="Social media links">
            {/* Facebook */}
            <a href="javascript:void(0)" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="javascript:void(0)" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="javascript:void(0)" className="footer__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="javascript:void(0)" className="footer__social-link" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <p>Built with care to honour indigenous food traditions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
