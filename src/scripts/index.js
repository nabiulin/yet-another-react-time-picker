import React, {PropTypes} from 'react';

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function handleClick(e, component) {
  component.setState({clicked: !component.state.clicked});
}

function handleMouseDown(e, component, node, done) {
  if(!isDescendant(node, e.target)) {
    done();
  }
}

function padLeft(number) {
  const num = parseInt(number);
  if(num < 10)
    return '0' + num.toString();
  else
    return num.toString();
}

function getTime(component) {
  const hour = parseInt(React.findDOMNode(component.refs.hours).value);
  const minute = parseInt(React.findDOMNode(component.refs.minutes).value);
  const second = parseInt(React.findDOMNode(component.refs.seconds).value);

  return {hour, minute, second};
}

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      hour: padLeft(props.hour),
      minute: padLeft(props.minute),
      second: padLeft(props.second)
    };
  }

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    hour: PropTypes.number,
    showHour: PropTypes.bool,
    minute: PropTypes.number,
    showMinute: PropTypes.bool,
    second: PropTypes.number,
    showSecond: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: '',
    hour: 0,
    showHour: true,
    minute: 0,
    showMinute: true,
    second: 0,
    showSecond: true
  };

  componentDidMount() {
    let timePicker = React.findDOMNode(this.refs.timepicker);
    timePicker.addEventListener('click', (e) => handleClick(e, this));
    document.addEventListener('mousedown', (e) => handleMouseDown(e, this, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  componentWillReceiveProps(nextProps) {
    let nextState = {};

    if(typeof nextProps.hour !== 'undefined')
      nextState.hour = padLeft(nextProps.hour);

    if(typeof nextProps.minute !== 'undefined')
      nextState.minute = padLeft(nextProps.minute);

    if(typeof nextProps.second !== 'undefined')
      nextState.second = padLeft(nextProps.second);

    this.setState(nextState);
  }

  componentWillUnmount() {
    let timePicker = React.findDOMNode(this.refs.timepicker);
    timePicker.removeEventListener('click', (e) => handleClick(e, this));
    document.removeEventListener('mousedown', (e) => handleMouseDown(e, this, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  handleIncreaseHour = () => {
    if(parseInt(this.state.hour) < 23) {
      const hour = parseInt(this.state.hour) + 1;
      const {minute, second} = this.state;
      this.props.onChange(hour, parseInt(minute), parseInt(second));
      this.setState({hour: padLeft(hour)});
    }
  };

  handleDecreaseHour = () => {
    if(parseInt(this.state.hour) > 0) {
      const hour = parseInt(this.state.hour) - 1;
      const {minute, second} = this.state;
      this.props.onChange(hour, parseInt(minute), parseInt(second));
      this.setState({hour: padLeft(hour)});
    }
  };

  handleHourChange = () => {
    const time = getTime(this);

    if(time.hour >= 0 && time.hour <= 23) {
      this.props.onChange(time.hour, time.minute, time.second);
      this.setState({hour: padLeft(time.hour)});
    }
  };

  handleIncreaseMinute = () => {
    if(parseInt(this.state.minute) < 59) {
      const minute = parseInt(this.state.minute) + 1;
      const {hour, second} = this.state;
      this.props.onChange(parseInt(hour), minute, parseInt(second));
      this.setState({minute: padLeft(minute)});
    }
  };

  handleDecreaseMinute = () => {
    if(parseInt(this.state.minute) > 0) {
      const minute = parseInt(this.state.minute) - 1;
      const {hour, second} = this.state;
      this.props.onChange(parseInt(hour), minute, parseInt(second));
      this.setState({minute: padLeft(minute)});
    }
  };

  handleMinuteChange = () => {
    const time = getTime(this);

    if(time.minute >= 0 && time.minute <= 60) {
      this.props.onChange(time.hour, time.minute, time.second);
      this.setState({minute: padLeft(time.minute)});
    }
  };

  handleIncreaseSecond = () => {
    if(parseInt(this.state.second) < 59) {
      const second = parseInt(this.state.second) + 1;
      const {minute, hour} = this.state;
      this.props.onChange(parseInt(hour), parseInt(minute), second);
      this.setState({second: padLeft(second)});
    }
  };

  handleDecreaseSecond = () => {
    if(parseInt(this.state.second) > 0) {
      const second = parseInt(this.state.second) - 1;
      const {minute, hour} = this.state;
      this.props.onChange(parseInt(hour), parseInt(minute), second);
      this.setState({second: padLeft(second)});
    }
  };

  handleSecondChange = () => {
    const time = getTime(this);

    if(time.second >= 0 && time.second <= 60) {
      this.props.onChange(time.hour, time.minute, time.second);
      this.setState({second: padLeft(time.second)});
    }
  };

  render() {
    return (
      <div className="timepicker">
        <input ref="timepicker" type="text" className={'timepicker-input ' + this.props.className} name={this.props.name} id={this.props.name} value={`${this.state.hour}:${this.state.minute}:${this.state.second}`} readOnly={true}/>
        {this.state.clicked ?
          <div className="timepicker-controls">
            <div className="timepicker-controls-hour">
              <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseHour} disabled={parseInt(this.state.hour) === 23}/>
              <input ref="hours" type="text" name={`${this.props.name}-hour`} value={this.state.hour} onChange={this.handleHourChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseHour} disabled={parseInt(this.state.hour) === 0}/>
            </div>
            <div className="timepicker-controls-minute">
              <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseMinute} disabled={parseInt(this.state.minute) === 59}/>
              <input ref="minutes" type="text" name={`${this.props.name}-minute`} value={this.state.minute} onChange={this.handleMinuteChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseMinute} disabled={parseInt(this.state.minute) === 0}/>
            </div>
            <div className="timepicker-controls-second">
              <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseSecond} disabled={parseInt(this.state.second) === 59}/>
              <input ref="seconds" type="text" name={`${this.props.name}-second`} value={this.state.second} onChange={this.handleSecondChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseSecond} disabled={parseInt(this.state.second) === 0}/>
            </div>
          </div>
          : null}
      </div>
    );
  }
}
