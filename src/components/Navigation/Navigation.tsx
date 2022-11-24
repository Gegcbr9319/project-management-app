import { AppState } from 'store';
import { AuthState } from 'models';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const [isSticky, setSticky] = useState(true);

  const { isAuthenticated } = useSelector(({ auth }: AppState): AuthState => auth);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 10) {
        setSticky(false);
      } else {
        setSticky(true);
      }
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.stickyHeader : ''}`}>
      <nav className={`${styles.navigation} ${isSticky ? styles.stickyNavigation : ''}`}>
        <NavLink className={styles.link} to="/">
          <h1>Project Manager</h1>
        </NavLink>
        <div className={`${styles.links} .links`}>
          {isAuthenticated ? (
            <>
              <NavLink className={styles.link} to="/boards">
                Boards
              </NavLink>
              <NavLink className={styles.link} to="/signout">
                Sign Out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={styles.link} to="/signin">
                Sign In
              </NavLink>
              <NavLink className={styles.link} to="/signup">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
