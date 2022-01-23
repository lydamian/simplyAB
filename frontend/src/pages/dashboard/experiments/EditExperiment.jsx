/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addAlert } from 'features/alerts/alertsSlice';
import {
  fetchExperiments,
  updateExperiment,
  selectExperimentById,
} from 'features/experiments/experimentsSlice';
import constants from 'Constants';

const EditExperiment = function EditExperiment() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    experimentId,
    projectId,
  } = params;
  const originalExperiment = useSelector((state) => selectExperimentById(state, experimentId));
  const [key, setKey] = useState(originalExperiment.key);
  const [title, setTitle] = useState(originalExperiment.title);
  const [description, setDescription] = useState(originalExperiment.description);
  const [trafficAllocationPercentage, setTrafficAllocationPercentage] = (
    useState(originalExperiment.trafficAllocationPercentage)
  );

  useEffect(() => {
    dispatch(fetchExperiments({ projectId, experimentId }));
  }, []);

  const submitCreateExperimentFormHandler = async (event) => {
    event.preventDefault();
    const dispatchResult = await dispatch(updateExperiment({
      experimentId,
      key,
      title,
      description,
      trafficAllocationPercentage,
    }));
    console.log('dispatchResults', dispatchResult.payload, dispatchResult.payload);
    if (dispatchResult.type === 'experiments/updateExperiment/fulfilled'
    && dispatchResult.payload === true
    ) {
      await dispatch(addAlert({
        message: 'Successfully updated experiment',
        type: 'SUCCESS',
      }));
      return navigate(`/dashboard/projects/${projectId}/experiments`);
    }
    await dispatch(addAlert({
      message: 'Error updating experiment',
      type: 'DANGER',
    }));
  };

  return (
    <div>
      <div className="box">
        <h3 className="title is-3">Update Experiment</h3>
        <p>
          Use SimplyAB to run experiments on a variety of platforms.
        </p>
        <form onSubmit={submitCreateExperimentFormHandler}>
          <div className="field">
            <h4 className="title is-size-4">
              Key
            </h4>
            <label htmlFor="new-project-title" className="label subtitle has-text-weight-light">
              Choose a unique meaningful key name for this experiment like
              &nbsp;
              <span className="has-background-warning">
                &quot;login_button_experiment&quot;
              </span>
              &nbsp;
              <strong>Note:</strong>
              {' '}
              Must be in
              {' '}
              <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>
            </label>
            <div className="control">
              <input
                className="input"
                id="experiment-key"
                type="text"
                placeholder="Key"
                name="experiment-key"
                pattern={constants.HTML_REGEXES.SNAKE_CASE}
                title="key must be in snake case"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <h4 className="title is-size-4">
              Title
            </h4>
            <label htmlFor="new-project-title" className="label subtitle has-text-weight-light">{'Choose a title that reflects you\'re project, like "AB Testing Platform Frontend"'}</label>
            <div className="control">
              <input
                className="input"
                id="experiment-title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <h4 className="title is-size-4">
              Traffic Allocation Percentage
            </h4>
            <label htmlFor="new-project-title" className="label subtitle has-text-weight-light">Percentage of users you want to be sharded into this experiment.</label>
            <div className="control has-icons-right">
              <input
                className="input"
                id="experiment-traffic-allocation-percentage"
                type="number"
                min="0"
                max="100"
                placeholder="Percentage"
                value={trafficAllocationPercentage}
                title="number must be between 0 - 100"
                onChange={(e) => setTrafficAllocationPercentage(e.target.value)}
                required
              />
              <span className="icon is-small is-right">
                <i className="fas fa-percent" />
              </span>
            </div>
          </div>
          <div className="field">
            <h4 className="title is-size-4">
              Description
              {' '}
              <span className="is-size-7 has-text-weight-light">(optional)</span>
            </h4>
            <label htmlFor="new-project-name" className="label subtitle has-text-weight-light">
              What is your experiment for? give a quick description
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id="experiment-description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="button is-info"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExperiment;
