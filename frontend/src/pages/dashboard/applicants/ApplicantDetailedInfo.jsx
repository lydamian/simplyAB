/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import helpers from 'utils/helpers';

const ApplicantDetailedInfo = (props) => {
  console.log('ApplicantDetailedInfo');
  return (
    <div className={'applicant-detailed-info box'}>
      <ApplicantPanel setApplicantInfo={props.setApplicantInfo} />
      <InstagramPanel />
      <TagsPanel />
      <FeatureEnablementsPanel />
    </div>
  );
};

ApplicantDetailedInfo.propTypes = {
  name: PropTypes.string.isRequired,
  instagramId: PropTypes.string.isRequired,
  instagramVisibility: PropTypes.string.isRequired,
  isInstagramVerified: PropTypes.string.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  displayGender: PropTypes.string.isRequired,
};

const ApplicantPanel = ({ setApplicantInfo }) => (
  <div className="panel is-primary">
    <p className="panel-heading">
      Applicant
      <span className="alert-close icon is-large is-pulled-right is-clickable" onClick={() => setApplicantInfo({})}>
        <i className="has-text-white fas fa-times mb-2" />
      </span>
    </p>
    <div className="panel-block">
      <div>
        <div>
          Instagram ID: 718064129
        </div>
        <div>
          Instagram: Private
        </div>
        <div>
          Instagram Verified: true
        </div>
        <div>
          Age: 51 years old
        </div>
        <div>
          Display Gender: N/A
        </div>
        <div>
          Recs Gender: female
        </div>
        <div>
          Born in: New York, NY
        </div>
        <div>
          Lives in (applicant): New York, NY
        </div>
        <div>
          Lives in (member):
        </div>
        <div>
          Hopeful Use:
        </div>
        <div>
          Application Occupation:
        </div>
        <div>
          Application Company:
        </div>
        <div>
          In-App Occupation:
        </div>
        <div>
          Release Location: New York, NY (Released on 5/20/2021, 4:27:02 PM)
        </div>
        <div>
          Email: 8e04994c-bbba-438a-b346-28f1bb414971@gmail.com
        </div>
        <div>
          Email Verified at:
        </div>
        <div>
          Verification Email Sent at:
        </div>
        <div>
          Score: -1
        </div>
        <div>
          World Percentile: 49.9
        </div>
        <div>
          Regional Percentile: 49.8
        </div>
        <div>
          Phone Number Verified: false
        </div>
        <div>
          Phone Number:
        </div>
        <div>
          Wikipedia: yes (but please manually view it to make sure it's really them)
        </div>
        <div>
          Has Given Contacts: No. We either haven't asked 61-create-test-users for contacts, or we did, and they denied permission.
        </div>
        <div>
          "Application" Here Just For Friends: false
        </div>
        <br />
        <button className="button is-primary m-1">
          Creates 24-hour Verification Code
        </button>
        
        <br />
        <button className="button is-primary m-1">
          Request Age Verification
        </button>
      
        <br />
        <button className="button is-primary m-1">
          Send screenshot email
        </button>

        <br />
        <button className="button is-primary m-1">
          Send Expired Token Email
        </button>
        <br />

        <button className="button is-danger m-1">
          Force Log out
        </button>
      </div>
    </div>
  </div>
);

const InstagramPanel = () => (
  <div className="panel is-primary">
    <p className="panel-heading">
      Instagram
    </p>
    <div className="panel-block">
      <div>
        Follow Requests: 0
      </div>
    </div>
  </div>
)

const TagsPanel = () => (
  <div className="panel is-primary">
    <p className="panel-heading">
      Tags
    </p>
    <div className="panel-block">
      <div>
        <div class="dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Dropdown button</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item">
                Dropdown item
              </a>
              <a class="dropdown-item">
                Other dropdown item
              </a>
              <a href="#" class="dropdown-item">
                Active dropdown item
              </a>
              <a href="#" class="dropdown-item">
                Other dropdown item
              </a>
              <hr class="dropdown-divider" />
              <a href="#" class="dropdown-item">
                With a divider
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="button is-link">
          Add tag to applicant
        </button>
      </div>
    </div>
  </div>
)

const FeatureEnablementsPanel = () => (
  <div className="panel is-primary">
    <p className="panel-heading">
      Features
    </p>
    <div className="panel-block">
      <div className="feature-block">
        <div className="box">
          <div>
            <strong>Feature:</strong>ADD_PEOPLE
          </div>
          <div>
            <strong>Active:</strong>false
          </div>
          <div>
            <strong>Source:</strong>ADMIN
          </div>
          <div>
            <strong>Set At:</strong>5/26/2021, 9:01:01 PM
          </div>
          <div>
            <strong>Latest:</strong>true
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ApplicantDetailedInfo;
