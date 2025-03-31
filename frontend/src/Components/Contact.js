import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">
            Have questions or need support? Reach out to us—we're here to help!
          </p>
        </div>
        <form className="contact-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" type="text" name="first-name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" type="text" name="last-name" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="phone-number">Phone Number</label>
              <input id="phone-number" type="text" name="phone-number" placeholder="123-456-7890" required />
            </div>
            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
          </div>
          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}
