/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useEffect, useState, useRef } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  useNavigate,
  Link,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import {
  selectAllProjects,
  fetchProjects,
  deleteProject,
} from 'features/projects/projectsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import './Projects.css';
import useOutsideClick from 'hooks/useOutsideClick';
import APIToken from './APIToken';

const ProjectInfo = function Projects() {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(selectAllProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div className="box">
    </div>
  );
};

export default ProjectInfo;
