/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './Applicants.css';
import devHelpers from 'utils/devHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicants, getApplicants } from 'features/applicants/applicantsSlice';
import ApplicantsDataList from './ApplicantsDataList';
import ApplicantsTabBar from './ApplicantsTabBar';
import ApplicantDetailedInfo from './ApplicantDetailedInfo';

const Applicants = () => {
  const dispatch = useDispatch();
  const applicantsData = useSelector(getApplicants);
  console.log('[Applicant.jsx] Applicants:', applicantsData);
  const applicantsSectionEnum = {
    SEARCH: 'SEARCH',
    TO_REVIEW: 'TO_REVIEW',
    FRIEND_PASS: 'FRIEND_PASS',
    ACCEPTED_PUSH_TO_RELEASE: 'ACCEPTED_PUSH_TO_RELEASE',
    GIA: 'GIA',
    WAITLISTED_PUSH_TO_RELEASE: 'WAITLISTED_PUSH_TO_RELEASE',
    ACCEPTED_ON_APP: 'ACCEPTED_ON_APP',
    WAITLISTED: 'WAITLISTED',
    BANNED: 'BANNED',
  };

  const [applicantsSection, setApplicantsSection] = useState(applicantsSectionEnum.SEARCH);
  const [applicantInfo, setApplicantInfo] = useState(devHelpers
    .getFakeApplicantData({ userId: 1 }));

  useEffect(() => {
    console.log('applicants page loading');
    dispatch(fetchApplicants());
  }, []);

  return (
    <div className="applicants">
      <ApplicantsTabBar
        applicantsSectionEnum={applicantsSectionEnum}
        applicantsSection={applicantsSection}
        setApplicantsSection={setApplicantsSection}
      />
      <ApplicantsDataList
        applicantsData={applicantsData}
        applicantInfo={applicantInfo}
        setApplicantInfo={setApplicantInfo}
      />
      {(!_.isEmpty(applicantInfo)) && (
      <ApplicantDetailedInfo
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...applicantInfo}
        setApplicantInfo={setApplicantInfo}
      />
      )}
    </div>
  );
};

export default Applicants;
