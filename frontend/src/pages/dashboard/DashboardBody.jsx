/* eslint-disable */

import React from 'react';
import Experiments from 'pages/dashboard/experiments/Experiments';
import DefaultDashboardBody from 'pages/dashboard/DefaultDashboardBody';
import Variants from 'pages/dashboard/variants/Variants';
import Constants from 'Constants';
import PropTypes from 'prop-types';

const DashboardBody = ({ section }) => (
  <div>
    {
      // Switch Statement
      {
        [Constants.dashboard.sections.EXPERIMENTS]: <Experiments />,
        [Constants.dashboard.sections.VARIANTS]: <Variants />,
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
