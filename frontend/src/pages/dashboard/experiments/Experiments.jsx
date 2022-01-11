/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import {
  selectAllExperiments,
  fetchExperimentsAndSet,
  updateExperiment,
} from 'features/experiments/experimentsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import useOutsideClick from 'hooks/useOutsideClick';
import experimentConstants from './ExperimentConstants';

const Experiments = function Experiments() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const experiments = useSelector(selectAllExperiments);
  const params = useParams();
  const { projectId } = params;
  const experimentsStatus = useSelector((state) => state.experiments.status);

  useEffect(() => {
    if (experimentsStatus === 'idle') {
      dispatch(fetchExperimentsAndSet({ projectId }));
    }
  }, []);

  return (
    <div className="box">
      <DashboardBodyTitle title="Experiments" />
      <button
        type="button"
        className="button is-link rs-mb-3"
        onClick={() => { navigate(`/dashboard/projects/${projectId}/experiments/create`); }}
      >
        Create New
      </button>
      <div>
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experiments.map((experiment) => (
              <tr key={nanoid()}>
                <td><Link to={`/dashboard/variants/${experiment.id}`}>{experiment.title}</Link></td>
                <td>{experiment.description}</td>
                <td
                  style={{
                    color: experimentConstants.STATUS_MAP[experiment.status].DISPLAY_COLOR,
                  }}
                >
                  {`⬤ ${experiment.status}`}
                </td>
                <td>{format(new Date(experiment.createdAt), 'PPpp')}</td>
                <td>{format(new Date(experiment.lastUpdatedAt), 'PPpp')}</td>
                <td className="rs-cursor-pointer">
                  <EditExperimentMenu experiment={experiment} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditExperimentMenu = function EditProjectMenu({ experiment }) {
  // hooks
  const params = useParams();
  const { projectId } = params;
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

  const archiveAndRefetchExperiments = async (experimentId) => {
    dispatch(updateExperiment({ experimentId }));
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
              <Link to={`/dashboard/projects/${projectId}/experiments/edit/${experiment.id}`}>Edit</Link>
            </p>
          </div>
          <div className="dropdown-item">
            <div
              role="button"
              tabIndex={0}
              onClick={() => archiveAndRefetchExperiments(experiment.id)}
              onKeyDown={() => archiveAndRefetchExperiments(experiment.id)}
            >
              Archive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiments;
