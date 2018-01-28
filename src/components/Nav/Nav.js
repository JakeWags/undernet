import React from 'react';
import './Nav.scss';

import Logo from 'images/mono-logo.png';
import { Github, Twitter } from 'react-feather';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-wrapper fluid grid">
      <ul className="row collapsed">
        <li className="small-6 xsmall-12 columns">
          <Link to='/'>
            <img height="30px" width="auto" src={Logo} alt="Monolith CSS logo"/>
          </Link>
        </li>
        <li className="small-6 xsmall-12 columns">
          <ul className="row">
            <li>
              <a className="has-feather" href='https://www.github.com/geotrev/monolith'>
                <Github />
              </a>
            </li>
            <li>
              <Link to='/docs/overview'>
                Docs
              </Link>
            </li>
            <li>
              <Link to='/examples/grid'>
                Examples
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
