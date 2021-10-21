/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ApplicantsDataList = ({ applicantsData, setApplicantInfo }) => (
  <div className="applicants-data-list box">
    <Filters />
    <ApplicantsTable applicantsData={applicantsData} setApplicantInfo={setApplicantInfo} />
    <Pagination />
  </div>
);
ApplicantsDataList.propTypes = {
  applicantsData: PropTypes.object.isRequired,
  setApplicantInfo: PropTypes.func.isRequired,
};

const Filters = () => {
  console.log('filters');
  return (
    <div className="filters-section">
      <label className="label" htmlFor="applicants-search">Filters</label>
      <div className="box filters">
        <p className="control">
          <div className="select is-fullwidth">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </p>
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>
    </div>
  );
};

const ApplicantsTable = ({ applicantsData, setApplicantInfo }) => {
  const applicantDataOnClickHandler = (id) => {
    console.log(`the applicantid is: ${id}`);
    setApplicantInfo(applicantsData.find((applicant) => applicant.id === id));
  };

  return (
    <table className="table is-striped is-bordered is-hoverable is-fullwidth">
      <thead>

        <tr>
          {
          [
            'Name',
            'Handle',
            'Priority Queue',
            'Score',
            'Application Date',
            'City of Residence',
            'Contacts on Raya',
            'CCM Contacts on Raya',
            'Waitlist Votes',
            'Accept Votes',
            'Strong Votes',
            'Industries First Set',
            'Waitlist Reason',
          ].map((columnHeader) => <th>{columnHeader}</th>)
        }
        </tr>
        {/* <tr>
          <th>
            <div className="field">
              <input className="input" type="text" placeholder="Filter" />
            </div>
          </th>
          <th>
            {' '}
            <div className="field">
              <input className="input" type="text" placeholder="Filter" />
            </div>
          </th>
          <th>
            <abbr title="Prior. Q.">
              {' '}
              <div className="field">
                <input className="input" type="text" placeholder="Filter" />
              </div>
            </abbr>
          </th>
          <th>
            {' '}
            <div className="field">
              <input className="input" type="text" placeholder="Filter" />
            </div>
          </th>
          <th>
            <abbr title="App. Date">
              {' '}
              <div className="field">
                <input className="input" type="text" placeholder="Filter" />
              </div>
            </abbr>
          </th>
        </tr> */}
      </thead>
      <tbody>
        {
      applicantsData.map((applicantData) => (
        // column_display_properties: ['full_name',
        // 'computed_instagram_username',
        // 'priority_queue_score',
        // 'score',
        // 'application_date_and_timezone',
        // 'residence_location.name',
        // 'number_incoming_and_outgoing_member_contacts',
        // 'number_vip_incoming_and_outgoing_member_contacts',
        // 'incoming_votes.waitlist',
        // 'incoming_votes.accept',
        // 'incoming_votes.strong',
        // 'industries_first_set_at',
        // 'waitlist_reason'],
        <tr onClick={() => applicantDataOnClickHandler(applicantData.id)}>
          <td>{`${applicantData.first_name} ${applicantData.last_nane}` || ''}</td>
          <td>{applicantData.instagram_user.username || ''}</td>
          <td>{applicantData.priority_queue_score}</td>
          <td>{applicantData.score}</td>
          <td>{applicantData.application_date && format(new Date(applicantData.application_date), 'MM/dd/yyyy hh:mm:ss')}</td>
          <td>{applicantData.residence_location_name}</td>
          <td>{applicantData.number_incoming_and_outgoing_member_contacts}</td>
          <td>{applicantData.number_vip_incoming_and_outgoing_member_contacts}</td>
          <td>{applicantData.incoming_votes.waitlist}</td>
          <td>{applicantData.incoming_votes.accept}</td>
          <td>{applicantData.incoming_votes.strong}</td>
          <td>{applicantData.industries_first_set_at}</td>
          <td>{applicantData.waitlist_reason}</td>
        </tr>
      ))
    }
      </tbody>
    </table>
  );
};

const Pagination = () => {
  console.log('Pagination');

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        <li>
          <a className="pagination-link" aria-label="Goto page 1">1</a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 45">45</a>
        </li>
        <li>
          <a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 47">47</a>
        </li>
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 86">86</a>
        </li>
      </ul>
    </nav>
  );
};

export default ApplicantsDataList;
