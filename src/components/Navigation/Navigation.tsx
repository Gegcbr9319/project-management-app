import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Navigation.module.scss';
import { IStore, setToken, Token } from 'store';

export const Navigation = () => {
  const [isSticky, setSticky] = useState(true);
  const { token } = useSelector((store: IStore) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 10) {
        setSticky(false);
      } else {
        setSticky(true);
      }
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    const { value, time, decoded, isValid, timeout } = new Token();
    const token = { value, time, decoded, isValid, timeout };
    dispatch(setToken({ token }));
  };

  return (
    <header className={`${styles.header} ${isSticky ? styles.stickyHeader : ''}`}>
      <nav className={`${styles.navigation} ${isSticky ? styles.stickyNavigation : ''}`}>
        <NavLink className={styles.link} to="/main">
          <h1>Project Manager</h1>
        </NavLink>
        <div className={`${styles.links} .links`}>
          {token.isValid && (
            <>
              <NavLink className={styles.link} to="/boards">
                Boards
              </NavLink>
              <button className={styles.link} onClick={handleSignOut}>
                Sign out
              </button>
            </>
          )}
          {!token.isValid && (
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
