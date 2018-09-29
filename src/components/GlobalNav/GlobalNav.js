import React from "react"
import "./GlobalNav.scss"

import Routes from "routes"
import Logo from "assets/images/un-logo.png"
import Github from "react-feather/dist/icons/github"
import Twitter from "react-feather/dist/icons/twitter"
import { Link } from "react-router-dom"

export default function GlobalNav() {
  return (
    <nav id="global-nav" className="fluid grid">
      <ul className="nav-list row has-no-padding">
        <li className="small-5 xsmall-12 columns">
          <Link to="/" className="logo">
            <img src={Logo} alt="Undernet" />
          </Link>
        </li>
        <li className="small-7 xsmall-12 columns">
          <ul className="row">
            <li>
              <a className="has-feather" href="https://www.twitter.com/gwtrev">
                <Twitter />
              </a>
            </li>
            <li>
              <a className="has-feather" href="https://www.github.com/geotrev/undernet">
                <Github />
              </a>
            </li>
            <li>
              <Link to={Routes.docs.overview.introduction}>Documentation</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
