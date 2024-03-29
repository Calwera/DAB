import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__header">
        Strona stworzona przez Krzysztof Wróbel
      </h3>
      <p className="footer__text">Tu mnie znajdziesz:</p>
      <div className="footer__link">
        <img
          src="./icons/email.svg"
          alt="e-mail logo link"
          className="footer__link-img"
        />
        <img
          src="./icons/github.svg"
          alt="github logo link"
          className="footer__link-img"
        />
        <img
          src="./icons/linkedin.svg"
          alt="linkedin logo link"
          className="footer__link-img"
        />
      </div>
    </footer>
  );
};

export default Footer;
