import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = function Breadcrumb() {
  return (
    <nav className="has-text-weight-bold is-medium sab-breadcrumb breadcrumb has-background-black-ter rs-p-4" style={{ marginBottom: '1px' }} aria-label="breadcrumbs">
      <ul>
        <li><Link className="has-text-white " to="/dashboard/projects">Projects</Link></li>
        <li><Link className="has-text-white " to="/dashboard/projects">Experiments</Link></li>
        <li className="is-active"><Link className="has-text-info" aria-current="page" to="/dashboard/projects">Variants</Link></li>
      </ul>
    </nav>
  );
};
export default Breadcrumb;
