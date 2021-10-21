/* eslint-disable */

import React, { useState } from 'react';
import faker from 'faker';
import { Link } from 'react-router-dom';

const DefaultDashboardBody = () => {
  const [display_create_experiment_modal, set_display_create_experiment_modal] = useState(false);

  return (
    <div>
      <h6>Experiments</h6>
      <button
        className="button is-info rs-m-1"
        onClick={() => {set_display_create_experiment_modal(true)}}>
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
        {[
          {
            id: faker.datatype.uuid(),
            title: `${faker.random.word()} Experiment `,
            description: faker.commerce.productDescription(),
            active: faker.datatype.boolean() ? 'true': 'false',
            created_at: faker.datatype.datetime().toISOString(),
            last_updated_at: faker.datatype.datetime().toISOString(),
          },
          {
            id: faker.datatype.uuid(),
            title: `${faker.random.word()} Experiment `,
            description: faker.commerce.productDescription(),
            active: faker.datatype.boolean() ? 'true': 'false',
            created_at: faker.datatype.datetime().toISOString(),
            last_updated_at: faker.datatype.datetime().toISOString(),
          },
        ].map((experiment) => (
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
        display_create_experiment_modal={display_create_experiment_modal}
        set_display_create_experiment_modal={set_display_create_experiment_modal}
      />
    </div>
  );
};

const CreateExperimentModal = ({
  display_create_experiment_modal,
  set_display_create_experiment_modal
}) => {
  return (
    <div className={`modal ${display_create_experiment_modal ? 'is-active': ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Experiment</p>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => {
              set_display_create_experiment_modal(false);
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
              set_display_create_experiment_modal(false);
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
