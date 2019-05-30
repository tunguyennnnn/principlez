import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import StoryMetaData from './StoryMetaData';
import * as UserId from '../../utils/userId';
import BlogEditor from '../BlogEditor';

export default function CardComponent(props) {
  const { id, title, body, updatedAt, isAuthor, author, view, like } = props;
  const viewCount = view.count + view.anonymousCount;

  const link = '/of/' + UserId.generateId(author.id, author.fullname);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="m-t-0 m-b-10">
          {title}
        </CardTitle>

        <BlogEditor title={title} body={body} readOnly previewOnly />

        {isAuthor ? (
          <Link to={`${link}/stories/${id}`}>
            <Button color="default" size="sm">
              Edit...
            </Button>
          </Link>
        ) : null}
        <Link to={`${link}/stories?id=${id}`}>
          <Button color="default" size="sm">
            Read...
          </Button>
        </Link>

        <div className="card-actions">
          <StoryMetaData
            viewCount={viewCount}
            likeCount={like.count}
            updatedAt={updatedAt}
          />
        </div>
      </CardBody>
    </Card>
  );
}
