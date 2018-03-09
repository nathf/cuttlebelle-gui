import React from 'react';

import './Header.css';

const resetApp = () => {
  window.localStorage.removeItem('githubAccessToken');
  window.localStorage.removeItem('projectPath');
  window.location.reload();
}

const Header = ({ children }) => (
  <div className="header--bar">
    {children}
    
    <button className="reset-button" onClick={resetApp}>[debug] Reset App</button>
  </div>
);

export default Header;