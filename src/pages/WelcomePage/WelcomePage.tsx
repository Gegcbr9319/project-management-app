import React from 'react';
import styles from './WelcomePage.module.scss';
import logo from 'assets/svg/logo.svg';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function WelcomePage() {
  const navigate = useNavigate();

  function joinHandler() {
    navigate('/signup');
  }

  function enterHandler() {
    navigate('/signin');
  }

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.project}>
        <h2 className={styles.start}>
          Start your projects with a our Project Manager. Use handy boards, lists, and cards. Manage
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
          <Button
            onClick={enterHandler}
            variant="contained"
            className={styles.button}
            color="inherit"
          >
            SIGN IN
          </Button>
          <Button onClick={joinHandler} variant="contained" className={styles.button}>
            SIGN UP
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
              <p>
                Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные
                тексты. Собрал деревни коварных продолжил ipsum на берегу решила родного, рукопись
                семантика свой сих несколько путь мир, гор единственное первую жаренные.
                Реторический.
              </p>
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
              <p>
                Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные
                тексты. Щеке несколько имеет страна, маленький гор они которой, своих о правилами
                буквенных рекламных раз безорфографичный текст что! Диких, маленькая маленький.
              </p>
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
              <p>
                Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные
                тексты. Обеспечивает первую ты, себя, переписывается строчка образ, встретил текстов
                не подпоясал взгляд подзаголовок предупредила имени свою продолжил путь! Пор,
                приставка?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
