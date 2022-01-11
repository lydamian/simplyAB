/* eslint-disable wrap-iife */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const getCurrentPageEntity = (pathname) => {
  if (pathname.includes('variants')) return 'variants';
  if (pathname.includes('experiments')) return 'experiments';
  if (pathname.includes('projects')) return 'projects';
};

const Breadcrumb = function Breadcrumb() {
  const location = useLocation();
  const { pathname } = location;
  const currentPageEntity = getCurrentPageEntity(pathname);

  const breadCrumbList = [
    {
      name: 'Projects',
      entity: 'projects',
    },
    {
      name: 'Experiments',
      entity: 'experiments',
    },
    {
      name: 'Variants',
      entity: 'variants',
    },
  ];

  return (
    <nav className="has-text-weight-bold is-medium sab-breadcrumb breadcrumb has-background-black-ter rs-p-4" style={{ marginBottom: '1px' }} aria-label="breadcrumbs">
      <ul>
        {breadCrumbList.map((breadcrumb) => {
          if (breadcrumb.entity === currentPageEntity) {
            return (
              <li>
                <Link className="has-text-info" aria-current="page" to="/dashboard/projects">{breadcrumb.name}</Link>
              </li>
            );
          }
          return (
            <li>
              <Link className="has-text-white" to="/dashboard/projects">{breadcrumb.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Breadcrumb;
