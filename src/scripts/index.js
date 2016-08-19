import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

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
    hour = parseInt(findDOMNode(component.refs.hours).value);

  if(component.refs.hasOwnProperty('minutes'))
    minute = parseInt(findDOMNode(component.refs.minutes).value);

  if(component.refs.hasOwnProperty('seconds'))
    second = parseInt(findDOMNode(component.refs.seconds).value);

  return {hour, minute, second};
}

const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  showHour: PropTypes.bool,
  maxHour: PropTypes.number,
  minute: PropTypes.number.isRequired,
  showMinute: PropTypes.bool,
  maxMinute: PropTypes.number,
  second: PropTypes.number.isRequired,
  showSecond: PropTypes.bool,
  maxSecond: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  className: '',
  showHour: true,
  maxHour: 23,
  showMinute: true,
  maxMinute: 59,
  showSecond: true,
  maxSecond: 59
};

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  componentDidMount() {
    let timePicker = findDOMNode(this.refs.timepicker);
    timePicker.addEventListener('click', (e) => handleClick(e, this));
    document.addEventListener('mousedown', (e) => handleMouseDown(e, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  componentWillUnmount() {
    let timePicker = findDOMNode(this.refs.timepicker);
    timePicker.removeEventListener('click', (e) => handleClick(e, this));
    document.removeEventListener('mousedown', (e) => handleMouseDown(e, timePicker.parentNode, () => this.setState({clicked: false})));
  }

  handleIncreaseHour = () => {
    const {hour, maxHour, minute, second, onChange} = this.props;

    if(parseInt(hour) < 23 && hour < maxHour) {
      onChange(parseInt(hour) + 1, parseInt(minute), parseInt(second));
    }
  };

  handleDecreaseHour = () => {
    const {hour, minute, second, onChange} = this.props;

    if(parseInt(hour) > 0) {
      onChange(parseInt(hour) - 1, parseInt(minute), parseInt(second));
    }
  };

  handleHourChange = () => {
    const {maxHour, onChange} = this.props;
    const {hour, minute, second} = getTime(this);

    if(hour >= 0 && hour <= 23 && hour <= maxHour) {
      onChange(hour, minute, second);
    }
  };

  handleIncreaseMinute = () => {
    const {hour, minute, maxMinute, second, onChange} = this.props;

    if(parseInt(minute) < 59 && minute < maxMinute) {
      onChange(parseInt(hour), parseInt(minute) + 1, parseInt(second));
    }
  };

  handleDecreaseMinute = () => {
    const {minute, hour, second, onChange} = this.props;

    if(parseInt(minute) > 0) {
      onChange(parseInt(hour), parseInt(minute) - 1, parseInt(second));
    }
  };

  handleMinuteChange = () => {
    const {maxMinute, onChange} = this.props;
    const {hour, minute, second} = getTime(this);

    if(minute >= 0 && minute <= 59 && minute <= maxMinute) {
      onChange(hour, minute, second);
    }
  };

  handleIncreaseSecond = () => {
    const {hour, minute, second, maxSecond, onChange} = this.props;

    if(parseInt(second) < 59 && second < maxSecond) {
      onChange(parseInt(hour), parseInt(minute), parseInt(second) + 1);
    }
  };

  handleDecreaseSecond = () => {
    const {hour, minute, second, onChange} = this.props;

    if(parseInt(second) > 0) {
      onChange(parseInt(hour), parseInt(minute), parseInt(second) - 1);
    }
  };

  handleSecondChange = () => {
    const {maxSecond, onChange} = this.props;
    const {hour, minute, second} = getTime(this);

    if(second >= 0 && second <= 59 && second <= maxSecond) {
      onChange(hour, minute, second);
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

TimePicker.defaultProps = defaultProps;
TimePicker.propTypes = propTypes;
