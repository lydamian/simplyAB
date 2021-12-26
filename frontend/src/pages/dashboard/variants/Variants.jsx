import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { getVariants, fetchVariants } from 'features/variants/variantsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';

const Variants = function Variants() {
  const dispatch = useDispatch();
  const variants = useSelector(getVariants);
  const params = useParams();
  const { experimentId } = params;
  const variantsStatus = useSelector((state) => state.variants.status);

  useEffect(() => {
    if (variantsStatus !== 'loading') {
      dispatch(fetchVariants({ experimentId }));
    }
  }, []);

  return (
    <div>
      <DashboardBodyTitle title="Experiments" />
      <table className="table rs-shadow-1 is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Percent</th>
            <th>Created</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={nanoid()}>
              <td><Link to={`/dashboard/variants/edit/${variant.id}`}>{variant.title}</Link></td>
              <td>{variant.trafficAllocationPercentage}</td>
              <td>{format(new Date(variant.createdAt), 'PPpp')}</td>
              <td>{format(new Date(variant.lastUpdatedAt), 'PPpp')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
