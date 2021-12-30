/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProjects,
  selectProjectById,
  selectProjectStatus,
  updateProject,
} from 'features/projects/projectsSlice';

const EditProject = function EditProject() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    projectId,
  } = params;
  const projectToUpdate = useSelector((state) => selectProjectById(state, projectId));
  const [newProjectTitle, setNewProjectTitle] = useState(projectToUpdate.title);
  const [newProjectDescription, setNewProjectDescription] = useState(projectToUpdate.description);
  const status = useSelector(selectProjectStatus);

  useEffect(() => {
    if (status !== 'loading') {
      // lets refetch projects to be safe.
      dispatch(fetchProjects());
    }
  }, []);

  const submitEditProjectFormHandler = async (event) => {
    event.preventDefault();
    const dispatchResult = await dispatch(updateProject({
      projectId,
      title: newProjectTitle,
      description: newProjectDescription,
    }));
    if (dispatchResult.type === 'projects/updateProject/fulfilled'
    && dispatchResult.payload === true
    ) {
      navigate('/dashboard/projects');
    }
  };

  return (
    <div>
      <div className="box">
        <h3 className="title is-3">Edit project</h3>
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
                value={newProjectTitle}
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
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="button is-info"
            onClick={submitEditProjectFormHandler}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
