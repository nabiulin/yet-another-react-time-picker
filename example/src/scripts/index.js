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
      seconds: 0,
      anotherHours: 0,
      anotherMinutes: 0,
      anotherSeconds: 0
    };
  }

  handleTimeChange = (h, m, s) => {
    this.setState({hours: h, minutes: m, seconds: s});
  };

  handleAnotherTimeChange = (h, m, s) => {
    this.setState({anotherHours: h, anotherMinutes: m, anotherSeconds: s});
  };

  render() {
    return (
      <div>
        <h2>Basic Usage</h2>
        <TimePicker
          hour={this.state.hours}
          minute={this.state.minutes}
          second={this.state.seconds}
          name="myTimePicker"
          onChange={this.handleTimeChange}
        />
        <h2>Max Time</h2>
        <p>The max time on this TimePicker is 22:18:25.</p>
        <TimePicker
          hour={this.state.anotherHours}
          maxHour={22}
          minute={this.state.anotherMinutes}
          maxMinute={18}
          second={this.state.anotherSeconds}
          maxSecond={25}
          name="anotherTimePicker"
          onChange={this.handleAnotherTimeChange}
        />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
