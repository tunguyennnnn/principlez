import React from 'react';
import { Link } from 'react-router-dom';

import StoryEditorContext from '../../contexts/StoryWriteContext';
import BlurbEditor from '../../components/BlurbEditor';

export default class About extends React.Component {
  render() {
    const { profile } = this.props;
    const { blurb, fullname, location } = profile;
    return (
      <div className="table-responsive">
        <table className="table table-profile">
          <thead>
            <tr>
              <th />
              <th>
                <h4>
                  {fullname} <small>{location.city}</small>
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="highlight">
              <td className="field">{`About ${fullname}`}</td>
              <td>
                <StoryEditorContext.Provider
                  value={{
                    titlePlaceholder: 'No title',
                    readOnly: true,
                  }}
                >
                  <BlurbEditor blurb={blurb} readOnly />
                </StoryEditorContext.Provider>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
