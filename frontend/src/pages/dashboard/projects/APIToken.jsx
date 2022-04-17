/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import apiAccessController from 'features/api-access/apiAccessController';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from 'features/alerts/alertsSlice';
import useOutsideClick from 'hooks/useOutsideClick';
import {
  selectAllProjects,
  fetchProjects,
} from 'features/projects/projectsSlice';

const APIToken = function APIToken() {
  const [apiTokens, setAPITokens] = useState([]);
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const [selectedProject, setSelectedProject] = useState(projects?.[0]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const getAPITokens = async () => {
    const currentAPITokens = await apiAccessController.getAPITokens();
    setAPITokens(currentAPITokens);
  };

  useEffect(() => {
    (async () => {
      dispatch(fetchProjects());
      getAPITokens();
    })();
  }, []);

  const APIAccessSubmitHandler = async (event) => {
    event.preventDefault();
    const success = await apiAccessController.createAPIToken(selectedProject);

    if (!success) {
      await dispatch(addAlert({
        message: 'ERROR creating API Token, possibly max 5 reached',
        type: 'DANGER',
      }));
      return false;
    }

    await dispatch(addAlert({
      message: 'Succesfully created API Token',
      type: 'SUCCESS',
    }));

    await getAPITokens();
  };

  const deleteAPITokenHandler = async (event, apiToken) => {
    event.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this API Token, NOTE: this action cannot be undone!');
    if (!confirmed) {
      return;
    }

    const success = await apiAccessController.deleteAPIToken(apiToken);

    if (!success) {
      await dispatch(addAlert({
        message: 'ERROR deleting API Token',
        type: 'DANGER',
      }));
      return false;
    }

    await dispatch(addAlert({
      message: 'Succesfully deleted API Token',
      type: 'SUCCESS',
    }));

    await getAPITokens();
  };

  const selectProjectonChangeHandler = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div className="box">
      <DashboardBodyTitle title="API Access" />
      <button
        type="button"
        className="button is-link rs-mb-3"
        onClick={APIAccessSubmitHandler}
      >
        Create new API Access Token (limit 5 per project)
      </button>
      <div className="select">
        <select onChange={selectProjectonChangeHandler}>
          {(projects ?? []).map((project) => (
            <option value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      {/* <ProjectDropdown /> */}
      <div>
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>API Access Token</th>
              <th>Project Name</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(apiTokens ?? []).map((apiToken) => (
              <tr key={nanoid()}>
                <td>{apiToken.token}</td>
                <td>{apiToken.projectTitle}</td>
                <td>{format(new Date(apiToken.createdAt), 'PPpp')}</td>
                <td>{format(new Date(apiToken.lastUpdatedAt), 'PPpp')}</td>
                <td className="rs-cursor-pointer">
                  <span
                    className="icon is-small is-right has-text-danger"
                    onClick={(event) => deleteAPITokenHandler(event, apiToken.token)}
                  >
                    <i className="fa-regular fa-trash-can" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProjectDropdown = function ProjectDropdown() {
  // hooks
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

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
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          Projects
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">
          {projects.map((project) => (
            <div className="dropdown-item">
              <div
                role="button"
                tabIndex={0}
              >
                {project.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIToken;
