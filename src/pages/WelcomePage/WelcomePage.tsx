import React from 'react';
import styles from './WelcomePage.module.scss';
import logo from 'assets/svg/logo.svg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function WelcomePage() {
  const navigate = useNavigate();

  function enterHandler() {
    navigate('/signin');
  }

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.project}>
        <h2 className={styles.start}>
          Start your projects with our Project Manager. Use handy boards, lists, and cards. Manage
          your projects, organize tasks, and build team spirit—all in one place.
        </h2>
        <div className={styles.intro}>
          <div>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              <h2>
                Project<span>Manager</span>
              </h2>
            </div>
            <p>{` — It’s more than work.`}</p>
            <p> It’s a way of working together.</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button onClick={enterHandler} variant="contained" className={styles.button}>
            Try It Now!
          </Button>
        </div>
      </section>
      <section className={styles.about}>
        <h2>Our team</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img
              src="https://avatars.githubusercontent.com/u/49131247?v=4"
              width="200"
              height="200"
              alt="@badikgit"
              className={styles.avatar}
            />
            <div>
              <h3>badikgit</h3>
              <ul>
                <li>Front page</li>
                <li>API interaction</li>
                <li>Confirm Delete Modal</li>
                <li>App Structure</li>
                <li>Сommon design</li>
              </ul>
            </div>
          </div>
          <div className={styles.card}>
            <img
              src="https://avatars.githubusercontent.com/u/95624971?v=4"
              width="200"
              height="200"
              alt="@Gegcbr9319"
              className={styles.avatar}
            />
            <div>
              <h3>Gegcbr9319</h3>
              <ul>
                <li>Boards page</li>
                <li>Board page - columns, tasks</li>
                <li>Boards management</li>
                <li>Tasks managemet</li>
                <li>Modal boxes (creating/edition boards, columns, tasks)</li>
              </ul>
            </div>
          </div>
          <div className={styles.card}>
            <img
              src="https://avatars.githubusercontent.com/u/58024256?v=4"
              width="200"
              height="200"
              alt="@malashonock"
              className={styles.avatar}
            />
            <div>
              <h3>malashonock</h3>
              <ul>
                <li>Sign in/up pages</li>
                <li>Profile page</li>
                <li>Routing</li>
                <li>Project Architecture</li>
                <li>Backend error handling</li>
                <li>Drag-n-Drop</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
