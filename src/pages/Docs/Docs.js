import React from "react"

import SideNav from "components/SideNav"
import DocsRoutes from "./DocsRoutes"
import { ITEMS } from "./docs-nav-items"
import "./styles.scss"

export default function Docs() {
  return (
    <div id="docs" className="fluid grid has-no-padding">
      <div className="row">
        <SideNav navListClasses="xsmall-12 columns has-no-padding" navItems={ITEMS} />
        <div className="xsmall-12 xlarge-10 has-no-padding columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  )
}
