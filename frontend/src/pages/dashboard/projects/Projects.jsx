/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   getProjects,
// } from 'features/projects/projectsSlice';

const Projects = function () {
  // hooks
  const dispatch = useDispatch();

  const reRunUseEffectHookOn = [];
  useEffect(() => {
    console.log('inside projects.js');
    dispatch();
  }, reRunUseEffectHookOn);
  return (
    <div>
      <ProjectThumbnail {...{
        project_id: 1,
        title: 10,
        description: 'hello',
        created_at: '1999',
        last_updated_at: '1999',

      }}
      />
    </div>
  );
};

const ProjectThumbnail = function ({
  projectId,
  title,
  description,
  createdAt,
  lastUpdatedAt,
}) {
  return (
    <div>
      {JSON.stringify({
        projectId,
        title,
        description,
        createdAt,
        lastUpdatedAt,
      }, null, 2)}
    </div>
  );
  // return (
  //   <div className="box">
  //     <article className="media">
  //       <div className="media-left">
  //         <figure className="image is-64x64">
  //           <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
  //         </figure>
  //       </div>
  //       <div className="media-content">
  //         <div className="content">
  //           <p>
  //             <strong>John Smith</strong>
  //             {' '}
  //             <small>@johnsmith</small>
  //             {' '}
  //             <small>31m</small>
  //             <br />
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
  //           </p>
  //         </div>
  //         <nav className="level is-mobile">
  //           <div className="level-left">
  //             <a className="level-item" aria-label="reply">
  //               <span className="icon is-small">
  //                 <i className="fas fa-reply" aria-hidden="true" />
  //               </span>
  //             </a>
  //             <a className="level-item" aria-label="retweet">
  //               <span className="icon is-small">
  //                 <i className="fas fa-retweet" aria-hidden="true" />
  //               </span>
  //             </a>
  //             <a className="level-item" aria-label="like">
  //               <span className="icon is-small">
  //                 <i className="fas fa-heart" aria-hidden="true" />
  //               </span>
  //             </a>
  //           </div>
  //         </nav>
  //       </div>
  //     </article>
  //   </div>
  // );
};

export default Projects;
