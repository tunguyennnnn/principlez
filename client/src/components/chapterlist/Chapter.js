import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function Chapter({ children, link, deleteChapter }) {
  return (
    <Card className="chapter-content">
      <div class="chapter-delete-icon">
        <Icon name="delete" circular onClick={deleteChapter} />
      </div>
      <Link to={link}>
        <Card.Content>
          <Card.Header>{children}</Card.Header>
          <Card.Meta>
            <span className="date">Written in 2019</span>
          </Card.Meta>
        </Card.Content>
      </Link>
      <Card.Content>
        <a>
          <Icon name="user" />
          150 views
        </a>
      </Card.Content>
    </Card>
  );
}
