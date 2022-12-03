import { AppState } from 'store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { AuthState } from 'models';
import { ModalBoard, UserMenu } from 'components';
import { AddCircle } from '@mui/icons-material';
import { Button } from '@mui/material';

export const Navigation = () => {
  const [isSticky, setSticky] = useState(true);

  const { token } = useSelector(({ auth }: AppState): AuthState => auth);

  const [callingForm, setCallingForm] = useState(false);

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
          {token?.isValid ? (
            <>
              <NavLink className={styles.link} to="/boards">
                Boards
              </NavLink>
              <UserMenu />
              <Button
                variant="outlined"
                startIcon={<AddCircle />}
                onClick={() => setCallingForm(true)}
                size="small"
                color="info"
                className={styles.addBoard}
              >
                Add Board
              </Button>
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
      {callingForm && <ModalBoard type="create board" setCallingForm={setCallingForm} />}
    </header>
  );
};
