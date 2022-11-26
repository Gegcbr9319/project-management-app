import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.logoLink}
        href="https://rs.school/react/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={styles.logo}
          src="https://rs.school/images/rs_school.svg"
          alt="RSSchool Logo"
        />
      </a>
      <div className={styles.links}>
        <a
          className={styles.github}
          href="https://github.com/badikgit/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://badikgit.github.io/rsschool-cv/image/icon/icon-github-footer.svg"
            alt="GitHub Logo"
          />
          badikgit
        </a>
        <a
          className={styles.github}
          href="https://github.com/Gegcbr9319/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://badikgit.github.io/rsschool-cv/image/icon/icon-github-footer.svg"
            alt="GitHub Logo"
          />
          Gegcbr9319
        </a>
        <a
          className={styles.github}
          href="https://github.com/malashonock/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://badikgit.github.io/rsschool-cv/image/icon/icon-github-footer.svg"
            alt="GitHub Logo"
          />
          malashonock
        </a>
      </div>
      <span>© 2022</span>
    </footer>
  );
};
