import React, { useEffect, useState } from 'react';

import apiAuthController from 'features/api-auth/apiAuthController';

const Home = function Home() {
  const [apiAuthToken, setApiAuthToken] = useState('');

  useEffect(() => {
    (async () => {
      const authToken = await apiAuthController.generateAPIAuthToken();
      setApiAuthToken(apiAuthToken);
    })();
  });

  return (
    <div className="box">
      <h1 className="h1">Auth Token</h1>
      <p>{apiAuthToken}</p>
      <form>
        <fieldset>
          <label htmlFor="get-auth-token">
            <input id="get-auth-token" type="button" value="Get auth token" className="button is-info" />
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default Home;
