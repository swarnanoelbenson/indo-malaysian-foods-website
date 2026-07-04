import React from 'react';
import Container from '../common/Container';
import './ContactUs.css';

// ── Submission logic (commented out — wire up when ready) ─────────────────────
//
// import { useState, FormEvent, ChangeEvent } from 'react';
//
// type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
//
// interface FormData {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }
//
// const EMPTY_FORM: FormData = { name: '', email: '', subject: '', message: '' };
//
// const formspreeUrl = process.env.REACT_APP_FORMSPREE_URL ?? '';
//
// const countWords = (text: string): number =>
//   text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
//
// const handleChange = (
//   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// ) => {
//   const { name, value } = e.target;
//   if (name === 'message' && countWords(value) > 50) return;
//   setForm(prev => ({ ...prev, [name]: value }));
// };
//
// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setStatus('submitting');
//   try {
//     const res = await fetch(formspreeUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//       body: JSON.stringify(form),
//     });
//     if (res.ok) {
//       setStatus('success');
//       setForm(EMPTY_FORM);
//     } else {
//       setStatus('error');
//     }
//   } catch {
//     setStatus('error');
//   }
// };
// ─────────────────────────────────────────────────────────────────────────────

const ContactUs: React.FC = () => {
  return (
    <main className="page page--contact">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="contact-hero hero-section">
        <Container>
          <div className="contact-hero__content">
            <h1 className="contact-hero__title">Contact Us</h1>
            <p className="contact-hero__subtitle">
              Have a question, want to collaborate, or share a recipe? We'd love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <section className="page-section contact-body">
        <Container>
          <div className="contact-layout">

            {/* ─ Info column ─ */}
            <aside className="contact-info">
              <h2 className="section-title">Get In Touch</h2>

              {/* <div className="contact-info__item">
                <span className="contact-info__icon" aria-hidden="true">✉️</span>
                <div>
                  <p className="contact-info__label">Email</p>
                  <a href="mailto:info@imif.com" className="contact-info__value contact-info__link">
                    info@imif.com
                  </a>
                </div>
              </div> */}

              <div className="contact-info__item">
                <span className="contact-info__icon" aria-hidden="true">📍</span>
                <div>
                  <p className="contact-info__label">Location</p>
                  <p className="contact-info__value">Malaysia &amp; Indonesia</p>
                </div>
              </div>

              <div className="contact-info__item">
                <span className="contact-info__icon" aria-hidden="true">🕐</span>
                <div>
                  <p className="contact-info__label">Response Time</p>
                  <p className="contact-info__value">Within 2–3 business days</p>
                </div>
              </div>
            </aside>

            {/* ─ Form column — commented out until submission is wired up ─
            <div className="contact-form-panel">
              <form className="contact-form" noValidate>
                <h2 className="contact-form__heading">Send a Message</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="form-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text"
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="form-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email"
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select id="subject" name="subject" className="form-input form-select">
                    <option value="">Select a topic…</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Recipe Submission">Recipe Submission</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Media & Press">Media &amp; Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="form-required" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message" name="message"
                    className="form-input form-textarea"
                    placeholder="Tell us what's on your mind… (max 50 words)"
                    rows={6}
                  />
                </div>

                <button type="button" className="btn-secondary contact-form__submit" disabled>
                  Send Message
                </button>
              </form>
            </div>
            ─ */}

          </div>
        </Container>
      </section>

    </main>
  );
};

export default ContactUs;
