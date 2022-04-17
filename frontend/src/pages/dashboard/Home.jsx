/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';

const Home = function Home() {
  return (
    <div className="box">
      <DashboardBodyTitle title="Welcome," />
    </div>
  );
};

export default Home;
