import React, { Fragment, useState, useEffect } from 'react';
import useLocalStorage from './assets/useLocalStorage';

/* Components */
import Header from './header/Header';
import Friendship from './main/Friendship';
import Footer from './footer/Footer';

const App = () => {
  const [themeColor, setThemeColor] = useLocalStorage('themeColor', true);

  useEffect(() => {
    themeColor ? document.body.setAttribute('theme-color', 'light') : document.body.setAttribute('theme-color', 'dark');
  }, [themeColor]);

  return (
    <Fragment>
      <Header
        themeColor={themeColor}
        setThemeColor={setThemeColor}
      />
      <Friendship />
      <Footer />
    </Fragment>
  );
}

export default App;