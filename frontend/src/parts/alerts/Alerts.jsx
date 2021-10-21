/* eslint-disable react/prop-types */
import React from 'react';
import './Alerts.css';
import { clearAlert, getAllAlerts } from 'features/alerts/alertsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ALERT_TYPES from '../../features/alerts/ALERT_TYPES';
// import PropTypes from 'prop-types';

const Alerts = () => {
  const alerts = useSelector(getAllAlerts);
  return (
    <div className="alerts is-fullwidth rs-fixed rs-w-full rs-z-40">
      {
        alerts.map((alert) => (
          <Alert
            key={alert.id}
            id={alert.id}
            message={alert.message}
            type={alert.type}
          />
        ))
      }
    </div>
  );
};

const getAlertBackground = (alertType) => ({
  [ALERT_TYPES.SUCCESS]: 'has-background-success',
  [ALERT_TYPES.INFO]: 'has-background-info',
  [ALERT_TYPES.WARNING]: 'has-background-warning',
  [ALERT_TYPES.DANGER]: 'has-background-danger',
}[alertType] || '');

const Alert = ({ id, message, type }) => {
  const dispatch = useDispatch();
  const bulmaBackground = getAlertBackground(type);

  return (
    <div id={id} className={`alert has-text-white ${bulmaBackground}`}>
      {message}
      <button type="button" className="button is-ghost is-pulled-right" onClick={() => dispatch(clearAlert(id))}>
        <span className="alert-close icon is-large">
          <i className="has-text-white fas fa-times" />
        </span>
      </button>
    </div>
  );
};

Alert.propTypes = {
};

export default Alerts;
