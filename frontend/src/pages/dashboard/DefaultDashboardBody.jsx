/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import faker from 'faker';
import { Link } from 'react-router-dom';
import { getExperiments, fetchExperiments } from 'features/experiments/experimentsSlice';

const DefaultDashboardBody = () => {
  const dispatch = useDispatch()
  const experiments = useSelector(getExperiments)
  const experimentsStatus = useSelector(state => state.experiments.status)
  const [displayCreateExperimentModal, setDisplayCreateExperimentModal] = useState(false);

  useEffect(() => {
    console.log(experimentsStatus);
    if (experimentsStatus === 'idle') {
      dispatch(fetchExperiments())
    }
  }, [])

  return (
    <div>
      <h6>Experiments</h6>
      <button
        className="button is-info rs-m-1"
        onClick={() => {setDisplayCreateExperimentModal(true)}}>
        {'...Create Experiment'}
      </button>
      <table className="table rs-shadow-1 rs-border-radius-sm rs-border is-hoverable is-fullwidth">
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
          <tr>
            <td><Link to="/dashboard/variants">{experiment.title}</Link></td>
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

      {/* Modals */}
      <CreateExperimentModal
        displayCreateExperimentModal={displayCreateExperimentModal}
        setDisplayCreateExperimentModal={setDisplayCreateExperimentModal}
      />
    </div>
  );
};

const CreateExperimentModal = ({
  displayCreateExperimentModal,
  setDisplayCreateExperimentModal
}) => {
  return (
    <div className={`modal ${displayCreateExperimentModal ? 'is-active': ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Experiment</p>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              setDisplayCreateExperimentModal(false);
            }}
          >
          </button>        </header>
        <section className="modal-card-body">
          {/* <!-- Content ... --> */}
          Hi there how is your day
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button
            className="button"
            onClick={() => {
              setDisplayCreateExperimentModal(false);
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

const EditExperimentDropdown = () => {
  return (
    <div className="dropdown is-right is-hoverable">
      <div className="dropdown-trigger">
        <button className="button is-ghost" aria-haspopup="true" aria-controls="dropdown-menu">
          <span class="icon">
            <i class="fas fa-ellipsis-v"></i>
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

export default DefaultDashboardBody;
