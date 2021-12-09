/* eslint-disable */

import React from 'react';
import Experiments from 'pages/dashboard/experiments/Experiments';
import DefaultDashboardBody from 'pages/dashboard/DefaultDashboardBody';
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
