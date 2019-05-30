import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { generateId } from '../../utils/userId';
import BlogEditor from '../../components/BlogEditor';
import StoryMetaData from '../../components/commons/StoryMetaData';

export default function Story({
  id,
  title,
  body,
  updatedAt,
  like,
  view,
  author,
  likeChapter,
  unlikeChapter,
}) {
  const viewCount = view.count + view.anonymousCount;
  const { liked, count: likeCount } = like;
  const likeAction = liked ? unlikeChapter : likeChapter;
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h2" className="m-t-0 m-b-10">
          {title}
        </CardTitle>
        <div className="author">
          <Link to={`/of/${generateId(author.id, author.fullname)}`}>
            <Icon name="id badge outline" />
            {author.fullname}
          </Link>
        </div>
        <StoryMetaData
          likeCount={like.count}
          viewCount={viewCount}
          likeAction={() => likeAction(id)}
          updatedAt={updatedAt}
        />
        <BlogEditor title={title} body={body} readOnly noTitle />
      </CardBody>
    </Card>
  );
}
