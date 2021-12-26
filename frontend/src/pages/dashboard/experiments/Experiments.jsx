/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { getExperiments, fetchExperiments } from 'features/experiments/experimentsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import experimentConstants from './ExperimentConstants';

const Experiments = function Experiments() {
  // hooks
  const dispatch = useDispatch();
  const experiments = useSelector(getExperiments);
  const params = useParams();
  const { projectId } = params;
  const experimentsStatus = useSelector((state) => state.experiments.status);

  useEffect(() => {
    if (experimentsStatus === 'idle') {
      dispatch(fetchExperiments({ projectId }));
    }
  }, []);

  return (
    <div>
      <DashboardBodyTitle title="Experiments" />
      <button
        type="button"
        className="button is-link"
        onClick={() => {}}
      >
        Create New
      </button>
      <div className="box">
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
                  <EditExperimentDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EditExperimentDropdown = function EditExperimentDropdown() {
  return (
    <div className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button type="button" className="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu">
          <span className="icon">
            <i className="fas fa-ellipsis-v" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="/dashboard/" className="dropdown-item">
            Copy
          </a>
          <hr className="dropdown-divider" />
          <a href="/dashboard/" className="dropdown-item">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Experiments;
