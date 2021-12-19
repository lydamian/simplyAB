/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  useNavigate,
  Link,
} from 'react-router-dom';
import {
  getProjects,
  fetchProjects,
} from 'features/projects/projectsSlice';

const Projects = function Projects() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(getProjects);

  if (projects == null) {
    alert('WHy is project null');
  }

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  return (
    <div>
      <h2 className="title is-2">Projects</h2>
      <button
        className="button is-link"
        type="button"
        onClick={() => {
          navigate('/dashboard/projects/create');
        }}
      >
        Create new
      </button>
      <div className="box rs-flex">
        {projects.map((project) => (
          <ProjectThumbnail
            projectId={project.id}
            title={project.title}
            description={project.description}
            createdAt={project.createdAt}
            lastUpdatedAt={project.lastUpdatedAt}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectThumbnail = function ProjectThumbnail({
  projectId,
  title,
  description,
  createdAt,
  lastUpdatedAt,
}) {
  return (
    <div className="box" project-id={projectId}>
      <Link to={`/dashboard/experiments/${projectId}`}>
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={`https://picsum.photos/200?dont-cache-me=${Math.random()}`} alt="" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>
                  {title}
                </strong>
                {' '}
                <small>{' '}</small>
                {' '}
                <br />
                <p>
                  {description}
                </p>
              </p>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default Projects;
