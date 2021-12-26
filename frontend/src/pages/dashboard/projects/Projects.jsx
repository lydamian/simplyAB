/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
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
import useOutsideClick from 'hooks/useOutsideClick';

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
                  <EditProjectMenu project={project} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditProjectMenu = function EditProjectMenu({ project }) {
  // hooks
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

  return (
    <div
      className={`dropdown ${isActive ? 'is-active' : ''}`}
      role="menu"
      onClick={(event) => {
        setIsActive(!isActive);
      }}
      tabIndex={0}
      onKeyDown={(event) => {
        setIsActive(!isActive);
      }}
      ref={dropdownRef}
    >
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
  );
};

export default Projects;
