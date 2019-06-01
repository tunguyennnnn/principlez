import React from 'react';
import FromContext from '../../contexts/FormContext';
import FormContext from '../../contexts/FormContext';

export default class Form extends React.Component {
  state = {
    focus: false,
    inputs: {
      name: '',
      description: '',
    },
  };

  updateInputs = inputs => {
    this.setState({ inputs });
  };

  render() {
    const {
      focus,
      inputs: { name, description },
    } = this.state;

    const descriptionComp = (
      <input
        type="text"
        class="form-control"
        placeholder="detail..."
        value={description}
        onChange={event => {
          this.updateInputs({ description: event.target.value, name });
        }}
      />
    );

    return (
      <FormContext.Consumer>
        {({ submit }) => (
          <div class="widget-todolist-item">
            <form
              onSubmit={event => {
                event.preventDefault();
                if (!name) return;
                submit({ name, description });
              }}
            >
              <div class="widget-todolist-input">
                <button type="submit" className="btn">
                  <i class="fa fa-plus text-muted" />
                </button>
                {focus && (
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => this.setState({ focus: false })}
                  >
                    <i class="fas fa-times text-muted" />
                  </button>
                )}
              </div>
              <div class="widget-todolist-content">
                <input
                  onFocus={() => this.setState({ focus: true })}
                  value={name}
                  type="text"
                  className="form-control bg-white"
                  placeholder="name..."
                  onChange={event => {
                    this.updateInputs({
                      description,
                      name: event.target.value,
                    });
                  }}
                />
                {focus && descriptionComp}
              </div>
            </form>
          </div>
        )}
      </FormContext.Consumer>
    );
  }
}
