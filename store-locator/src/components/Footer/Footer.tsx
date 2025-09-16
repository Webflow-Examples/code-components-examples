import React from "react";

interface FooterProps {
  textColor?: string;
  backgroundColor?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const Footer: React.FC<FooterProps> = ({
  textColor = "#000",
  backgroundColor = "#fff",
  socialLinks = {},
}) => {
  const footerStyle = {
    color: textColor,
    backgroundColor: backgroundColor,
    padding: "2rem",
    borderTop: "1px solid #e0e0e0",
    textAlign: "center" as const,
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Webflow Developers</p>
      <div className="social-links">
        {socialLinks.twitter && <a href={socialLinks.twitter}>Twitter</a>}
        {socialLinks.linkedin && <a href={socialLinks.linkedin}>LinkedIn</a>}
        {socialLinks.github && <a href={socialLinks.github}>GitHub</a>}
      </div>
    </footer>
  );
};

export default Footer;
