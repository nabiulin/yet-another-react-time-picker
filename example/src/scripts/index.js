import React from 'react';
import {render} from 'react-dom';

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

  render() {
    return (
      <div>
        <TimePicker
          hour={this.state.hours}
          minute={this.state.minutes}
          second={this.state.seconds}
          name="myTimePicker"
          onChange={this.handleTimeChange}
        />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
