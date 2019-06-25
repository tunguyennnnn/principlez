import React from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';

import { Link } from 'react-router-dom';

import Form from './todolist/Form';
import MenuOption from './todolist/MenuOption';

import FormContext from '../contexts/FormContext';
import MenuContext from '../contexts/MenuContext';

function TodoItem({ parentId, id, title, description, source }) {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="m-t-0 m-b-10">
          {title}
        </CardTitle>
        {description && <CardText>{description}</CardText>}
        {source && <CardText>{source}</CardText>}
        {parentId && (
          <Link to={`/notes/${id}`}>
            <Button color="default" size="sm">
              Add note
            </Button>
          </Link>
        )}
      </CardBody>
    </Card>
  );
}

export default class TodoList extends React.Component {
  renderIconCheck(done) {
    const { cart } = this.props;
    if (cart) {
      return null;
    }

    return (
      <div className="widget-todolist-input">
        <div className="checkbox checkbox-css">
          <input type="checkbox" id="widget_todolist_1" checked={done} />
          <label for="widget_todolist_1" className="p-l-15" />
        </div>
      </div>
    );
  }

  render() {
    const { id: parentId, header, items, keyPrefix, cart } = this.props;

    return (
      <div
        className="widget-todolist widget-todolist-rounded"
        style={{ marginBottom: 10 }}
      >
        <div className="widget-todolist-header">
          <div className="widget-todolist-header-left">
            <h4 className="widget-todolist-header-title">{header}</h4>
          </div>
        </div>

        <div className="widget-todolist-body">
          {items.map(props => {
            const { id } = props;
            return (
              <div
                className="widget-list-item"
                key={`${keyPrefix}-${header.split(/\s+/).join('')}-item-${id}`}
              >
                <TodoItem {...props} parentId={parentId} cart={cart} />
                <MenuContext.Consumer>
                  {({ items, keyPrefix }) => (
                    <MenuOption
                      keyPrefix={keyPrefix}
                      parentId={parentId}
                      id={id}
                      items={items}
                    />
                  )}
                </MenuContext.Consumer>
              </div>
            );
          })}
          <FormContext.Consumer>
            {({ submit, fields }) => (
              <Form submit={submit} fields={fields} parentId={parentId} />
            )}
          </FormContext.Consumer>
        </div>
      </div>
    );
  }
}
