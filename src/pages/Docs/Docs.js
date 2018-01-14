import React, { Component } from 'react';
import './Docs.scss';
import { Switch, Route, NavLink } from 'react-router-dom';

import { ChevronDown } from 'react-feather';

import {
  Overview, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from './Articles/Articles';

export const Docs = () => {
  return (
    <div id="docs" className="medium-section fluid grid">
      <div className="row">
        <div className="xsmall-order-1 xsmall-12 show-for-xsmall hide-for-small columns docs-nav-bg">
          <a className="explore-link" href="#explore-components">Explore Components <ChevronDown size={20} /></a>
        </div>
        
        <div className="xsmall-order-3 xlarge-order-2 xsmall-12 xlarge-2 columns docs-nav-bg">
          
          <div id="explore-components" className="docs-nav">
            <nav>
              <h3 className="paragraph"><strong>Explore Monolith</strong></h3>
              <h4 className="paragraph">Getting Started</h4>
              <ul>
                <li><NavLink activeClassName="selected" to='/docs/overview'>Overview</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/download'>Download</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/configuration'>Configuration</NavLink></li>
              </ul>
              <h4 className="paragraph">Components</h4>
              <ul>
                <li><NavLink activeClassName="selected" to='/docs/grid'>Grid</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/typography'>Typography</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/buttons'>Buttons</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/forms'>Forms</NavLink></li>
              </ul>
              <h4 className="paragraph">Helpers</h4>
              <ul>
                <li><NavLink activeClassName="selected" to='/docs/classes'>Classes</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/mixins'>Mixins</NavLink></li>
                <li><NavLink activeClassName="selected" to='/docs/functions'>Functions</NavLink></li>
              </ul>
            </nav>
          </div>
            
        </div>
        <div className="xsmall-order-2 xlarge-order-3 xsmall-12 xlarge-10 columns">
          <div className="small-section grid">
            
            <div className="docs-content">
              <Route exact path="/docs/overview" component={ Overview } />
              <Route exact path="/docs/download" component={ Download } />
              <Route exact path="/docs/configuration" component={ Config } />
              <Route exact path="/docs/grid" component={ Grid } />
              <Route exact path="/docs/typography" component={ Type } />
              <Route exact path="/docs/buttons" component={ Buttons } />
              <Route exact path="/docs/forms" component={ Forms } />
              <Route exact path="/docs/classes" component={ Classes } />
              <Route exact path="/docs/mixins" component={ Mixins } />
              <Route exact path="/docs/functions" component={ Functions } />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}