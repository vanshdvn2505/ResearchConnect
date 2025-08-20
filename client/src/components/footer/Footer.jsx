import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Research Fields</h2>
            <span>Computer Science & AI</span>
            <span>Life Sciences & Medicine</span>
            <span>Engineering & Technology</span>
            <span>Physical Sciences</span>
            <span>Social Sciences</span>
            <span>Humanities</span>
            <span>Environmental Studies</span>
            <span>Data Science</span>
            <span>View All Fields</span>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Our Mission</span>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>University Relations</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>For Professors</span>
            <span>For Students</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Invite a Colleague</span>
            <span>Post a Research Project</span>
            <span>Community Standards</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>ResearchConnect</h2>
            {/* Using a dynamic year would be best, but for now, we can set it. */}
            <span>© ResearchConnect Ltd. 2025</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="Language" />
              <span>English</span>
            </div>
            <img src="/img/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;