import React from 'react';
import DevArea from './DevArea';
import ListLoading from '../../components/hoc/ListLoadingHoc';

@ListLoading
export default class DevAreas extends React.Component {
  render() {
    const { data } = this.props;
    const { learningAreas } = data;

    return (
      <div>
        {learningAreas.map(({ id, title }) => {
          return <DevArea key={`dev-area-${id}`} id={id} title={title} />;
        })}
      </div>
    );
  }
}
