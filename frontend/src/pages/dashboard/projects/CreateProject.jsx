/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPostProjectSuccess,
  postProject,
  clearPostProjectSuccess,
} from 'features/projects/projectsSlice';

const CreateProject = function CreateProject() {
  // hooks
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postProjectSuccess = useSelector(getPostProjectSuccess);
  const status = useSelector((state) => state.projects.status);

  useEffect(() => {
    if (postProjectSuccess === true && status !== 'loading') {
      dispatch(clearPostProjectSuccess());
      navigate('/dashboard/projects');
    }
  }, [postProjectSuccess]);

  const submitCreateProjectFormHandler = (event) => {
    event.preventDefault();
    dispatch(postProject({
      title: newProjectTitle,
      description: newProjectDescription,
    }));
  };

  return (
    <div>
      <div className="box">
        <h3 className="title is-3">Create new project</h3>
        <p>
          Use SimplyAB to run experiments on a variety of platforms.
        </p>
        <form>
          <div className="field">
            <h4 className="title is-size-4">
              Title
            </h4>
            <label htmlFor="new-project-title" className="label subtitle has-text-weight-light">{'Choose a title that reflects you\'re project, like "AB Testing Platform Frontend"'}</label>
            <div className="control">
              <input
                className="input"
                id="new-project-title"
                type="text"
                placeholder="Title"
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <h4 className="title is-size-4">
              Project Description
              {' '}
              <span className="is-size-7 has-text-weight-light">(optional)</span>
            </h4>
            <label htmlFor="new-project-name" className="label subtitle has-text-weight-light">
              What is your project? give a quick description
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id="new-project-description"
                placeholder="Description"
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="button is-info"
            onClick={submitCreateProjectFormHandler}
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
