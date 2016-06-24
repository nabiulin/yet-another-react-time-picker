import React from 'react';

import TimePicker from 'yet-another-react-time-picker';
import 'styles/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  handleTimeChange = (h, m, s) => {
    this.setState({hours: h, minutes: m, seconds: s});
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <TimePicker name="myTimePicker" onChange={this.handleTimeChange}/>
      </div>
    );
  }
}

React.render(<App/>, document.getElementById('app'));
