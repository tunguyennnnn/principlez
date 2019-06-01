import React from 'react';

export default class TodoList extends React.Component {
  renderIconCheck(done) {
    const { cart } = this.props;
    if (cart) {
      return null;
    }

    return (
      <div class="widget-todolist-input">
        <div class="checkbox checkbox-css">
          <input type="checkbox" id="widget_todolist_1" checked={done} />
          <label for="widget_todolist_1" class="p-l-15" />
        </div>
      </div>
    );
  }

  render() {
    const { header, items, keyPrefix, cart } = this.props;

    return (
      <div
        class="widget-todolist widget-todolist-rounded"
        style={{ marginBottom: 10 }}
      >
        <div class="widget-todolist-header">
          <div class="widget-todolist-header-left">
            <h4 class="widget-todolist-header-title">{header}</h4>
          </div>
        </div>

        <div class="widget-todolist-body">
          {items.map(({ id, title, description, done }) => {
            return (
              <div
                class="widget-todolist-item"
                key={`${keyPrefix}-${header.split(/\s+/).join('')}-item-${id}`}
              >
                {this.renderIconCheck(done)}
                <div class="widget-todolist-content">
                  <h4 class="widget-todolist-title">{title}</h4>
                  <p class="widget-todolist-desc">{description}</p>
                </div>
              </div>
            );
          })}
          <div class="widget-todolist-item">
            <div class="widget-todolist-input">
              <i class="fa fa-plus text-muted" />
            </div>
            <div class="widget-todolist-content">
              <input
                type="text"
                class="form-control"
                placeholder="Write your task here..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
