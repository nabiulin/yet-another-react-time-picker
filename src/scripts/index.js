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

function handleMouseDown(e, node, done) {
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
  let hour = 0, minute = 0, second = 0;

  if(component.refs.hasOwnProperty('hours'))
    hour = React.findDOMNode(component.refs.hours).value;

  if(component.refs.hasOwnProperty('minutes'))
    minute = React.findDOMNode(component.refs.minutes).value;

  if(component.refs.hasOwnProperty('seconds'))
    second = React.findDOMNode(component.refs.seconds).value;

  return {hour, minute, second};
}

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
    showHour: PropTypes.bool,
    minute: PropTypes.number.isRequired,
    showMinute: PropTypes.bool,
    second: PropTypes.number.isRequired,
    showSecond: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: '',
    showHour: true,
    showMinute: true,
    showSecond: true
  };

  componentDidMount() {
    let timePicker = React.findDOMNode(this.refs.timepicker);
    timePicker.addEventListener('click', (e) => handleClick(e, this));
    document.addEventListener('mousedown', (e) => handleMouseDown(e, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  componentWillUnmount() {
    let timePicker = React.findDOMNode(this.refs.timepicker);
    timePicker.removeEventListener('click', (e) => handleClick(e, this));
    document.removeEventListener('mousedown', (e) => handleMouseDown(e, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  handleIncreaseHour = () => {
    if(parseInt(this.props.hour) < 23) {
      const hour = parseInt(this.props.hour) + 1;
      const {minute, second} = this.props;
      this.props.onChange(hour, parseInt(minute), parseInt(second));
    }
  };

  handleDecreaseHour = () => {
    if(parseInt(this.props.hour) > 0) {
      const hour = parseInt(this.props.hour) - 1;
      const {minute, second} = this.props;
      this.props.onChange(hour, parseInt(minute), parseInt(second));
    }
  };

  handleHourChange = () => {
    const time = getTime(this);

    if(time.hour >= 0 && time.hour <= 23) {
      this.props.onChange(time.hour, time.minute, time.second);
    }
  };

  handleIncreaseMinute = () => {
    if(parseInt(this.props.minute) < 59) {
      const minute = parseInt(this.props.minute) + 1;
      const {hour, second} = this.props;
      this.props.onChange(parseInt(hour), minute, parseInt(second));
    }
  };

  handleDecreaseMinute = () => {
    if(parseInt(this.props.minute) > 0) {
      const minute = parseInt(this.props.minute) - 1;
      const {hour, second} = this.props;
      this.props.onChange(parseInt(hour), minute, parseInt(second));
    }
  };

  handleMinuteChange = () => {
    const time = getTime(this);

    if(time.minute >= 0 && time.minute <= 60) {
      this.props.onChange(time.hour, time.minute, time.second);
    }
  };

  handleIncreaseSecond = () => {
    if(parseInt(this.props.second) < 59) {
      const second = parseInt(this.props.second) + 1;
      const {minute, hour} = this.props;
      this.props.onChange(parseInt(hour), parseInt(minute), second);
    }
  };

  handleDecreaseSecond = () => {
    if(parseInt(this.props.second) > 0) {
      const second = parseInt(this.props.second) - 1;
      const {minute, hour} = this.props;
      this.props.onChange(parseInt(hour), parseInt(minute), second);
    }
  };

  handleSecondChange = () => {
    const time = getTime(this);

    if(time.second >= 0 && time.second <= 60) {
      this.props.onChange(time.hour, time.minute, time.second);
    }
  };

  render() {
    return (
      <div className="timepicker">
        <input ref="timepicker" type="text" className={'timepicker-input ' + this.props.className} name={this.props.name} id={this.props.name} value={`${padLeft(this.props.hour)}:${padLeft(this.props.minute)}:${padLeft(this.props.second)}`} readOnly={true}/>
        {this.state.clicked ?
          <div className="timepicker-controls">
            {this.props.showHour ? (
              <div className="timepicker-controls-hour">
                <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseHour} disabled={parseInt(this.props.hour) === 23}/>
                <input ref="hours" type="text" name={`${this.props.name}-hour`} value={padLeft(this.props.hour)} onChange={this.handleHourChange}/>
                <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseHour} disabled={parseInt(this.props.hour) === 0}/>
              </div>
            ) : null}
            {this.props.showMinute ? (
              <div className="timepicker-controls-minute">
                <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseMinute} disabled={parseInt(this.props.minute) === 59}/>
                <input ref="minutes" type="text" name={`${this.props.name}-minute`} value={padLeft(this.props.minute)} onChange={this.handleMinuteChange}/>
                <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseMinute} disabled={parseInt(this.props.minute) === 0}/>
              </div>
            ) : null}
            {this.props.showSecond ? (
              <div className="timepicker-controls-second">
                <button className="fa fa-chevron-up" type="button" onClick={this.handleIncreaseSecond} disabled={parseInt(this.props.second) === 59}/>
                <input ref="seconds" type="text" name={`${this.props.name}-second`} value={padLeft(this.props.second)} onChange={this.handleSecondChange}/>
                <button className="fa fa-chevron-down" type="button" onClick={this.handleDecreaseSecond} disabled={parseInt(this.props.second) === 0}/>
              </div>
            ) : null}
          </div>
          : null}
      </div>
    );
  }
}
