import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

export default function Chapter({ children, link }) {
  return (
    <Card className="chapter-content">
      <Card.Content>
        <Card.Header>
          <Link class="" to={link}>
            {children}
          </Link>
        </Card.Header>
        <Card.Meta>
          <span className="date">Written in 2019</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <a>
          <Icon name="user" />
          150 views
        </a>
      </Card.Content>
    </Card>
  );
}
