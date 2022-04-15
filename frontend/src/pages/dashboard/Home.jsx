/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import apiAccessController from 'features/api-access/apiAccessController';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';
import { useDispatch } from 'react-redux';
import { addAlert } from 'features/alerts/alertsSlice';

const Home = function Home() {
  const [apiTokens, setAPITokens] = useState([]);
  const dispatch = useDispatch();

  const getAPITokens = async () => {
    const currentAPITokens = await apiAccessController.getAPITokens();
    setAPITokens(currentAPITokens);
  };

  useEffect(() => {
    (async () => getAPITokens())();
  }, []);

  const APIAccessSubmitHandler = async (event) => {
    event.preventDefault();
    const success = await apiAccessController.createAPIToken();

    if (!success) {
      await dispatch(addAlert({
        message: 'ERROR creating API Token, possibly max 5 reached',
        type: 'DANGER',
      }));
      return false;
    }

    await dispatch(addAlert({
      message: 'Succesfully created API Token',
      type: 'SUCCESS',
    }));

    await getAPITokens();
  };

  const deleteAPITokenHandler = async (event, apiToken) => {
    event.preventDefault();
    const confirmed = confirm('Are you sure you want to delete this API Token, NOTE: this action cannot be undone!');
    if (!confirmed) {
      return;
    }

    const success = await apiAccessController.deleteAPIToken(apiToken);

    if (!success) {
      await dispatch(addAlert({
        message: 'ERROR deleting API Token',
        type: 'DANGER',
      }));
      return false;
    }

    await dispatch(addAlert({
      message: 'Succesfully deleted API Token',
      type: 'SUCCESS',
    }));

    await getAPITokens();
  };

  return (
    <div className="box">
      <DashboardBodyTitle title="API Access" />
      <button
        type="button"
        className="button is-link rs-mb-3"
        onClick={APIAccessSubmitHandler}
      >
        Get API Access Token
      </button>
      <div>
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>API Access Token</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {apiTokens.map((apiToken) => (
              <tr key={nanoid()}>
                <td>{apiToken.token}</td>
                <td>{format(new Date(apiToken.createdAt), 'PPpp')}</td>
                <td>{format(new Date(apiToken.lastUpdatedAt), 'PPpp')}</td>
                <td className="rs-cursor-pointer">
                  <span
                    className="icon is-small is-right"
                    onClick={(event) => deleteAPITokenHandler(event, apiToken.token)}
                  >
                    <i className="fa-regular fa-trash-can" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
