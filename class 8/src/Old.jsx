import { Component } from "react";

class Old extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.state.counter}
        <button
          onClick={() => {
            this.setState((currentState) => ({
              counter: currentState.counter + 1,
            }));
          }}
        >
          increment
        </button>
      </div>
    );
  }
}

function App() {
  return <Old title="Componente viejo" />;
}

export { App };
