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
  selectAllProjects,
  fetchProjects,
  deleteProject,
} from 'features/projects/projectsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import './Projects.css';
import useOutsideClick from 'hooks/useOutsideClick';

const Projects = function Projects() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div className="box">
      <DashboardBodyTitle title="Projects" />
      <button
        className="button is-link rs-mb-3"
        type="button"
        onClick={() => {
          navigate('/dashboard/projects/create');
        }}
      >
        Create new
      </button>
      <div id="projects">
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
                <td><Link to={`/dashboard/projects/${project.id}/experiments`}>{project.title}</Link></td>
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
  const dispatch = useDispatch();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

  const deleteAndRefetchProjects = async (projectIdToDelete) => {
    dispatch(deleteProject({ projectId: projectIdToDelete }));
  };

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
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span className="icon">
            <i className="fas fa-ellipsis-v" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <p>
              <Link to={`/dashboard/projects/edit/${project.id}`}>Edit</Link>
            </p>
          </div>
          <div className="dropdown-item">
            <div
              role="button"
              tabIndex={0}
              onClick={() => deleteAndRefetchProjects(project.id)}
              onKeyDown={() => deleteAndRefetchProjects(project.id)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
