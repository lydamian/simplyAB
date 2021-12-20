/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Link,
  useParams,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getExperiments, fetchExperiments } from 'features/experiments/experimentsSlice';

const Experiments = () => {
  // hooks
  const dispatch = useDispatch()
  const experiments = useSelector(getExperiments)
  const params = useParams();
  const projectId = params.projectId;
  const experimentsStatus = useSelector(state => state.experiments.status)

  useEffect(() => {
    if (experimentsStatus === 'idle') {
      dispatch(fetchExperiments({projectId}));
    }
  }, []);

  return (
    <div>
      <h2 className="title is-2">Experiments</h2>
      <button
        className="button is-link"
        onClick={() => {}}>
        {'Create New'}
      </button>
      <div className="box">
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Active</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {experiments.map((experiment) => (
            <tr key={nanoid()}>
              <td><Link to={`/dashboard/variants/${experiment.id}`}>{experiment.title}</Link></td>
              <td>{experiment.description}</td>
              <td>{experiment.active}</td>
              <td>{experiment.created_at}</td>
              <td>{experiment.last_updated_at}</td>
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

const EditExperimentDropdown = () => {
  return (
    <div className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button className="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu">
          <span className="icon">
            <i className="fas fa-ellipsis-v"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item">
            Copy
          </a>
          <hr className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            Delete
          </a>
        </div>
      </div>
    </div>
  )
};

export default Experiments;
