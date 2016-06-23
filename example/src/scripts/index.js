import React from 'react';

import TimePicker from 'yet-another-react-time-picker';
import 'styles/main.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <TimePicker name="myTimePicker"/>
      </div>
    );
  }
}

React.render(<App/>, document.getElementById('app'));
