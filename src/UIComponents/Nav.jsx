import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Logo</div>
      <ul style={styles.navList}>
        <li className='nav-link'>
          <Link to="/">Home</Link>
        </li>
        <li className='nav-link' >
          <Link to="/about">About</Link>
        </li>
        <li className='nav-link'>
          <Link to="/projects">Projects</Link>
        </li>
        <li className='nav-link'>
          <Link to="/contact">Contact</Link>
        </li>
        <li className='resume'>
            <a className='outline-button' href="/Resume2023PDF.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

// Styles
const styles = {
  logo: {
    width: '200px',
    color: '#00E8D5',
    paddingLeft: '10px'

  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    // background: '#333',
    padding: '10px',
    alignItems: 'center'
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: '4px',
    alignItems: 'center',
    lineHeight: '40px',
    margin: '0px'
  },
};
