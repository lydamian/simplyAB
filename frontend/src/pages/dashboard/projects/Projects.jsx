/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  useNavigate,
  Link,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import {
  getProjects,
  fetchProjects,
} from 'features/projects/projectsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import './Projects.css';

const Projects = function Projects() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(getProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  return (
    <div>
      <DashboardBodyTitle title="Projects" />
      <button
        className="button is-link"
        type="button"
        onClick={() => {
          navigate('/dashboard/projects/create');
        }}
      >
        Create new
      </button>
      <div id="projects" className="box">
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={nanoid()}>
                <td><Link to={`/dashboard/experiments/${project.id}`}>{project.title}</Link></td>
                <td>{project.description}</td>
                <td>{format(new Date(project.createdAt), 'PPpp')}</td>
                <td>{format(new Date(project.lastUpdatedAt), 'PPpp')}</td>
                <td className="rs-cursor-pointer">
                  <EditProjectMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditProjectMenu = function EditProjectMenu() {
  return (
    <div className="dropdown is-active">
      <div className="dropdown-trigger">
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
          <span>Content</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <p>
              You can insert
              <strong>any type of content</strong>
              {' '}
              within the dropdown menu.
            </p>
          </div>
          <hr className="dropdown-divider" />
          <div className="dropdown-item">
            <p>
              You simply need to use a
              <code>&lt;div&gt;</code>
              {' '}
              instead.
            </p>
          </div>
          <hr className="dropdown-divider" />
          <Link to="/dashboard/experiments" className="dropdown-item">
            This is a link
          </Link>
        </div>
      </div>
    </div>
    // <div className="menu">
    //   <p className="menu-label">
    //     Administration
    //   </p>
    //   <ul className="menu-list">
    //     <li>Archive</li>
    //     <li>Delete</li>
    //     <li>Run</li>
    //     <li>Pause</li>
    //   </ul>
    //   <p className="menu-label">
    //     General
    //   </p>
    //   <ul className="menu-list">
    //     <li>Edit</li>
    //   </ul>
    // </div>
  );
};

export default Projects;
