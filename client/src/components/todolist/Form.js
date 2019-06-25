import React from 'react';

function constructInputState(fields) {
  const input = {};

  for (const field of fields) {
    if (typeof field === 'string') {
      input[field] = '';
    }
  }
  return input;
}

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    const { fields } = props;

    this.state = {
      focus: false,
      inputs: constructInputState(fields),
    };
  }

  updateInputs = inputs => {
    this.setState({ inputs });
  };

  onSubmit = event => {
    event.preventDefault();
    const { parentId } = this.props;
    const { focus, inputs } = this.state;
    this.props.submit({ ...inputs, parentId });

    //reset states
    const { fields } = this.props;
    this.setState({
      ...this.state,
      inputs: constructInputState(fields),
    });
  };

  renderFields = () => {
    const { focus, inputs } = this.state;

    const { fields } = this.props;

    const comps = fields.map(field => (
      <input
        key={field}
        onFocus={() => this.setState({ focus: true })}
        value={inputs[field]}
        type="text"
        className="form-control bg-white"
        placeholder={`${field}...`}
        onChange={event => {
          this.updateInputs({
            ...inputs,
            [field]: event.target.value,
          });
        }}
      />
    ));

    return (
      <React.Fragment>
        {comps.map((comp, index) => (index === 0 ? comp : focus && comp))}
      </React.Fragment>
    );
  };

  render() {
    const {
      focus,
      inputs: { name, description },
    } = this.state;

    const descriptionComp = (
      <input
        type="text"
        className="form-control"
        placeholder="detail..."
        value={description}
        onChange={event => {
          this.updateInputs({ description: event.target.value, name });
        }}
      />
    );

    return (
      <div className="widget-todolist-item">
        <form onSubmit={this.onSubmit}>
          <div className="widget-todolist-input">
            <button type="submit" className="btn">
              <i className="fa fa-plus text-muted" />
            </button>
            {focus && (
              <button
                type="submit"
                className="btn"
                onClick={() => this.setState({ focus: false })}
              >
                <i className="fas fa-times text-muted" />
              </button>
            )}
          </div>
          <div className="widget-todolist-content">{this.renderFields()}</div>
        </form>
      </div>
    );
  }
}
