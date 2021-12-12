/* eslint-disable */

import React from 'react';
import DefaultDashboardBody from 'pages/dashboard/DefaultDashboardBody';
import Projects from 'pages/dashboard/projects/Projects';
import Experiments from 'pages/dashboard/experiments/Experiments';
import Variants from 'pages/dashboard/variants/Variants';
import constants from 'Constants';
import PropTypes from 'prop-types';

const DashboardBody = ({ section }) => (
  <div>
    {
      // Switch Statement
      {
        [constants.dashboard.sections.EXPERIMENTS]: <Experiments />,
        [constants.dashboard.sections.VARIANTS]: <Variants />,
        [constants.dashboard.sections.PROJECTS]: <Projects />,
      }[section] || <DefaultDashboardBody />
    }
  </div>
);

DashboardBody.defaultProps = {
  section: '',
};
DashboardBody.propTypes = {
  section: PropTypes.string,
};

export default DashboardBody;
