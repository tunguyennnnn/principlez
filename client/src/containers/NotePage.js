import React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Card,
  CardGroup,
  CardColumns,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { itemToLearnQuery, updateLearnNoteMutation } from './notepage/graphql';

import Sidebar from './SideBar';
import NoteHeader from './notepage/NoteHeader';
import LearnNote from './notepage/LearnNote';

class NotePage extends React.Component {
  updateLearnNote = async body => {
    const { id } = this.props.data.itemToLearn;
    await this.props.updateLearnNote({
      variables: { id, body },
    });
  };

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>loading...</div>;
    }

    if (data.error) {
      return <div>error...</div>;
    }

    const { id, name, description, source, learnNote } = data.itemToLearn;

    return (
      <div>
        <Card>
          <CardHeader>
            <Sidebar />
            <NoteHeader
              id={id}
              name={name}
              description={description}
              source={source}
            />
          </CardHeader>
          <CardBody>
            <LearnNote
              learnNote={learnNote}
              updateLearnNote={this.updateLearnNote}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default compose(
  graphql(itemToLearnQuery, {
    options: props => {
      return {
        variables: {
          id: props.match.params.noteId,
        },
      };
    },
  }),
  graphql(updateLearnNoteMutation, { name: 'updateLearnNote' }),
)(NotePage);
