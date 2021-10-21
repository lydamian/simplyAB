/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const ApplicantsTabBar = ({ applicantsSectionEnum, applicantsSection, setApplicantsSection }) => {
  const applicantsSectionOnClickHandler = (section) => {
    setApplicantsSection(applicantsSectionEnum[section]);
  };

  return (
    <div className="applicants-tab-bar tabs is-boxed">
      <ul>
        {
              [
                { title: 'Search', section: applicantsSectionEnum.SEARCH },
                { title: 'To Review', section: applicantsSectionEnum.TO_REVIEW },
                { title: 'Friend Pass', section: applicantsSectionEnum.FRIEND_PASS },
                { title: 'Accepted: Push to Release', section: applicantsSectionEnum.ACCEPTED_PUSH_TO_RELEASE },
                { title: 'GIA', section: applicantsSectionEnum.GIA },
                { title: 'Waitlisted: Push to Release', section: applicantsSectionEnum.WAITLISTED_PUSH_TO_RELEASE },
                { title: 'Accepted: On App', section: applicantsSectionEnum.ACCEPTED_ON_APP },
                { title: 'Waitlisted', section: applicantsSectionEnum.WAITLISTED },
                { title: 'Banned', section: applicantsSectionEnum.BANNED },
              ].map((tabInfo) => (
                <li className={`${applicantsSection === tabInfo.section ? 'is-active' : ''}`}>
                  <a
                    role="tabpanel"
                    onClick={() => applicantsSectionOnClickHandler(tabInfo.section)}
                  >
                    {tabInfo.title}
                  </a>
                </li>
              ))
            }
      </ul>
    </div>
  );
};

ApplicantsTabBar.propTypes = {
  applicantsSectionEnum: PropTypes.shape({
    SEARCH: PropTypes.string.isRequired,
    TO_REVIEW: PropTypes.string.isRequired,
    FRIEND_PASS: PropTypes.string.isRequired,
    ACCEPTED_PUSH_TO_RELEASE: PropTypes.string.isRequired,
    GIA: PropTypes.string.isRequired,
    WAITLISTED_PUSH_TO_RELEASE: PropTypes.string.isRequired,
    ACCEPTED_ON_APP: PropTypes.string.isRequired,
    WAITLISTED: PropTypes.string.isRequired,
    BANNED: PropTypes.string.isRequired,
  }).isRequired,
  applicantsSection: PropTypes.string.isRequired,
  setApplicantsSection: PropTypes.func.isRequired,
};

export default ApplicantsTabBar;
