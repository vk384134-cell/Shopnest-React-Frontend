import React, { useState } from 'react';
import {
  BsEnvelopeFill,
  BsGeoAltFill,
  BsTelephoneFill,
  BsCheckCircleFill,
  BsSendFill,
} from 'react-icons/bs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }, 600);
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary text-uppercase px-3 py-2 rounded-pill fw-bold mb-2">
            Get In Touch
          </span>
          <h1 className="fw-bold text-dark">We'd Love to Hear From You</h1>
          <p className="text-secondary lead fs-6 col-md-7 mx-auto">
            Have questions about our products, orders, or delivery? Reach out to our customer support
            team and we'll respond within 24 hours.
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Information & Channels */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 h-100 bg-dark text-white">
              <h3 className="fw-bold text-warning mb-4">Contact Information</h3>
              <p className="text-light opacity-75 mb-4">
                Fill out the form and our team will get back to you promptly. You can also reach us directly through our official channels.
              </p>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="bg-warning text-dark p-3 rounded-circle">
                  <BsGeoAltFill className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Our Headquarters</h6>
                  <p className="text-light opacity-75 mb-0 small">
                    123 Market Square, Suite 400<br />San Francisco, CA 94105, USA
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="bg-warning text-dark p-3 rounded-circle">
                  <BsTelephoneFill className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Customer Support</h6>
                  <p className="text-light opacity-75 mb-0 small">+1 (800) 555-0199</p>
                  <small className="text-warning">Mon - Fri: 8am - 8pm EST</small>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <div className="bg-warning text-dark p-3 rounded-circle">
                  <BsEnvelopeFill className="fs-5" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email Us</h6>
                  <p className="text-light opacity-75 mb-0 small">support@shopnest.example.com</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-top border-secondary border-opacity-50">
                <small className="text-light opacity-75">
                  &copy; {new Date().getFullYear()} ShopNest Retail Inc. All rights reserved.
                </small>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <h3 className="fw-bold text-dark mb-4">Send Us a Message</h3>

              {submitted && (
                <div
                  className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-3 p-3 mb-4 rounded-3 shadow-sm"
                  role="alert"
                >
                  <BsCheckCircleFill className="fs-4 text-success flex-shrink-0" />
                  <div>
                    <h6 className="alert-heading mb-1 fw-bold">Thank you for contacting us!</h6>
                    <p className="mb-0 small">
                      Your message has been received. Our team will review it and get back to you shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    onClick={() => setSubmitted(false)}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="contact-name" className="form-label fw-semibold text-dark">
                    Your Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    placeholder="Jane Doe"
                    aria-describedby={errors.name ? 'name-feedback' : undefined}
                  />
                  {errors.name && (
                    <div id="name-feedback" className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label fw-semibold text-dark">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    placeholder="jane@example.com"
                    aria-describedby={errors.email ? 'email-feedback' : undefined}
                  />
                  {errors.email && (
                    <div id="email-feedback" className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Subject (Optional) */}
                <div className="mb-3">
                  <label htmlFor="contact-subject" className="form-label fw-semibold text-dark">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Product inquiry, feedback, order help..."
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label htmlFor="contact-message" className="form-label fw-semibold text-dark">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    placeholder="How can we help you today? Please include details..."
                    aria-describedby={errors.message ? 'message-feedback' : undefined}
                  ></textarea>
                  {errors.message && (
                    <div id="message-feedback" className="invalid-feedback d-block">
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg rounded-pill px-5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  <BsSendFill />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
