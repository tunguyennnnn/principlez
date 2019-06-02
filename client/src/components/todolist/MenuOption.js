import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function(props) {
  const { id, items, keyPrefix } = props;
  if (!items || !keyPrefix) return null;

  return (
    <div className="widget-list-action">
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-muted pull-right p-0 bg-none">
          <i className="fa fa-ellipsis-h f-s-14" />
        </DropdownToggle>
        <DropdownMenu>
          {items.map(({ name, action }) => (
            <DropdownItem
              key={`${keyPrefix}-${name.split(/\s+/).join('')}`}
              onClick={event => action(id)}
            >
              {name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}
