/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import useOutsideClick from 'hooks/useOutsideClick';
import { nanoid } from 'nanoid';
import {
  selectVariantsByExperimentId,
  fetchVariants,
  updateVariants,
} from 'features/variants/variantsSlice';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';

const Variants = function Variants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    projectId,
    experimentId,
  } = params;
  const variants = useSelector((state) => selectVariantsByExperimentId(state, experimentId));
  const variantsStatus = useSelector((state) => state.variants.status);

  useEffect(() => {
    if (variantsStatus !== 'loading') {
      dispatch(fetchVariants({ experimentId }));
    }
  }, []);

  return (
    <div className="box">
      <DashboardBodyTitle title="Variants" />
      <table className="table rs-shadow-1 is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Percent</th>
            <th>Created</th>
            <th>Last Modified</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={nanoid()}>
              <td><Link to={`/dashboard/variants/edit/${variant.id}`}>{variant.title}</Link></td>
              <td>{variant.trafficAllocationPercentage}</td>
              <td>{format(new Date(variant.createdAt), 'PPpp')}</td>
              <td>{format(new Date(variant.lastUpdatedAt), 'PPpp')}</td>
              <td className="rs-cursor-pointer">
                <EditVariantMenu variant={variant} />
              </td>
            </tr>
          ))}
          <button
            type="button"
            className="button is-ghost rs-m-3"
            onClick={() => { navigate(`/dashboard/projects/${projectId}/experiments/${experimentId}/variants/create`); }}
          >
            Create New
          </button>
        </tbody>
      </table>
    </div>
  );
};

const EditVariantMenu = function EditProjectMenu({ variant }) {
  // hooks
  const params = useParams();
  const { projectId } = params;
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

  const archiveAndRefetchExperiments = async (experimentId) => {
    dispatch(updateVariants({ experimentId }));
  };

  return (
    <div
      className={`dropdown ${isActive ? 'is-active' : ''}`}
      role="menu"
      onClick={(event) => {
        setIsActive(!isActive);
      }}
      tabIndex={0}
      onKeyDown={(event) => {
        setIsActive(!isActive);
      }}
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span className="icon">
            <i className="fas fa-ellipsis-v" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <p>
              <Link to={`/dashboard/projects/${projectId}/experiments/edit/${variant.id}`}>Edit</Link>
            </p>
          </div>
          <div className="dropdown-item">
            <div
              role="button"
              tabIndex={0}
              onClick={() => archiveAndRefetchExperiments(variant.id)}
              onKeyDown={() => archiveAndRefetchExperiments(variant.id)}
            >
              Archive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variants;
