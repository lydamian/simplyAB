import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getVariants, fetchVariants } from 'features/variants/variantsSlice';

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
      <h6>Variants</h6>
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
              <td>{variant.description}</td>
              <td>{variant.created_at}</td>
              <td>{variant.last_updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
