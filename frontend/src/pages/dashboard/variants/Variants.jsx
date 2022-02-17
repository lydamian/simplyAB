/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { addAlert, ALERT_TYPES } from 'features/alerts/alertsSlice';
import {
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { format } from 'date-fns';
import useOutsideClick from 'hooks/useOutsideClick';
import { nanoid } from 'nanoid';
import constants from 'Constants';
import variantsController from 'features/variants/variantsController';
import DashboardBodyTitle from 'parts/title/DashboardBodyTitle';

const Variants = function Variants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {
    projectId,
    experimentId,
  } = params;
  const [variants, setVariants] = useState({});
  const defaultVariant = {
    id: -1,
    experimentId,
    key: 'unique_key',
    title: 'new title',
    trafficAllocationPercentage: 0,
    createdAt: (new Date()).toISOString(),
    lastUpdatedAt: (new Date()).toISOString(),
  };

  useEffect(() => {
    (async () => {
      const fetchedVariants = await variantsController.fetchVariants(experimentId);
      setVariants(_.keyBy(fetchedVariants, 'id'));
    })();
  }, []);

  const handleCreateNewVariant = (event) => {
    const tempId = nanoid();
    setVariants({
      ...variants,
      [tempId]: {
        ...defaultVariant,
        id: tempId,
      },
    });
  };

  const handleDeleteVariant = (event, variantId) => {
    setVariants(_.omit(variants, variantId));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const success = await variantsController.createVariants(experimentId, Object.values(variants));
    if (success) {
      return dispatch(addAlert({
        message: 'Successfully saved variants',
        type: ALERT_TYPES.SUCCESS,
      }));
    }
    return dispatch(addAlert({
      message: 'Error saving variants',
      type: ALERT_TYPES.DANGER,
    }));
  };

  const onChange = (event, variantId, property) => {
    const newVariants = {
      ...variants,
      [variantId]: {
        ...variants[variantId],
        [property]: event.target.value,
      },
    };
    setVariants(newVariants);
  };

  return (
    <div className="box">
      <DashboardBodyTitle title="Variants" />
      <form onSubmit={onSubmitHandler}>
        <table className="table rs-shadow-1 is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unique Key</th>
              <th>Percent</th>
              <th>Created</th>
              <th>Last Modified</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {Object.values(variants).map((variant) => (
              <tr key={variant.id}>
                <td>
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    defaultValue={variant.title}
                    onBlur={(event) => { onChange(event, variant.id, 'title'); }}
                    required
                  />
                </td>
                <td>
                  <input
                    className="input"
                    id="experiment-key"
                    type="text"
                    placeholder="Key"
                    name="key"
                    pattern={constants.HTML_REGEXES.SNAKE_CASE}
                    title="key must be in snake case"
                    defaultValue={variant.key}
                    onBlur={(event) => { onChange(event, variant.id, 'key'); }}
                    required
                  />
                </td>
                <td>
                  <div className="field">
                    <p className="control has-icons-right has-icons-right">
                      <input
                        className="input"
                        type="number"
                        placeholder="title"
                        defaultValue={variant.trafficAllocationPercentage}
                        step="any"
                        onBlur={(event) => { onChange(event, variant.id, 'trafficAllocationPercentage'); }}
                        min="0"
                        max="100"
                        required
                      />
                      <span className="icon is-small is-right">
                        <i className="fas fa-percent" />
                      </span>
                    </p>
                  </div>
                </td>
                <td>{format(new Date(variant.createdAt), 'PPpp')}</td>
                <td>{format(new Date(variant.lastUpdatedAt), 'PPpp')}</td>
                <td className="rs-cursor-pointer">
                  <EditVariantMenu variant={variant} handleDeleteVariant={handleDeleteVariant} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons is-grouped">
          <button
            type="button"
            className="button is-primary is-light is-outlined"
            onClick={handleCreateNewVariant}
          >
            Create New
          </button>
          <button
            type="submit"
            className="button is-link is-light is-outlined"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const EditVariantMenu = function EditProjectMenu({ variant, handleDeleteVariant }) {
  // hooks
  const params = useParams();
  const { projectId } = params;
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  // Change my dropdown state to close when clicked outside
  useOutsideClick(dropdownRef, () => setIsActive(false));

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
            <div
              role="button"
              tabIndex={0}
              onClick={(event) => handleDeleteVariant(event, variant.id)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variants;
