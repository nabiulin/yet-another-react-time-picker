import React from 'react';
import {render} from 'react-dom';

import TimePicker from 'react-time-picker';
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

render(<App/>, document.getElementById('app'));
