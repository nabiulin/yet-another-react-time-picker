import React, {PropTypes} from 'react';

const handleClick = (component) => {
  component.setState({clicked: !component.state.clicked});
};

const padLeft = (number) => {
  const num = parseInt(number);
  if(num < 10)
    return '0' + num.toString();
  else
    return num.toString();
};

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
    showSecond: PropTypes.bool
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
    let timePicker = document.querySelector('.timepicker-input');
    timePicker.addEventListener('click', () => handleClick(this));
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
    let timePicker = document.querySelector('.timepicker-input');
    timePicker.removeEventListener('click', () => handleClick(this));
  }

  handleHourChange = (e) => {
    const {value} = e.target;
    const hour = parseInt(value);

    if(hour >= 0 && hour <= 23)
      this.setState({hour: padLeft(hour)});
  };

  handleMinuteChange = (e) => {
    const {value} = e.target;
    const minute = parseInt(value);

    if(minute >= 0 && minute <= 60)
      this.setState({minute: padLeft(minute)});
  };

  handleSecondChange = (e) => {
    const {value} = e.target;
    const second = parseInt(value);

    if(second >= 0 && second <= 60)
      this.setState({second: padLeft(second)});
  };

  render() {
    return (
      <div className="timepicker">
        <input type="text" className={'timepicker-input ' + this.props.className} ref="timepicker" name={this.props.name} id={this.props.name} value={`${this.state.hour}:${this.state.minute}:${this.state.second}`} readOnly={true}/>
        {this.state.clicked ?
          <div className="timepicker-controls">
            <div className="timepicker-controls-hour">
              <button className="fa fa-chevron-up" type="button" onClick={() => this.setState({hour: this.state.hour < 23 ? padLeft(parseInt(this.state.hour) + 1) : this.state.hour})} disabled={parseInt(this.state.hour) === 23}/>
              <input type="text" name={`${this.props.name}-hour`} value={this.state.hour} onChange={this.handleHourChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={() => this.setState({hour: this.state.hour > 0 ? padLeft(parseInt(this.state.hour) - 1) : this.state.hour})} disabled={parseInt(this.state.hour) === 0}/>
            </div>
            <div className="timepicker-controls-minute">
              <button className="fa fa-chevron-up" type="button" onClick={() => this.setState({minute: this.state.minute < 59 ? padLeft(parseInt(this.state.minute) + 1) : this.state.minute})} disabled={parseInt(this.state.minute) === 59}/>
              <input type="text" name={`${this.props.name}-minute`} value={this.state.minute} onChange={this.handleMinuteChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={() => this.setState({minute: this.state.minute > 0 ? padLeft(parseInt(this.state.minute) - 1): this.state.minute})} disabled={parseInt(this.state.minute) === 0}/>
            </div>
            <div className="timepicker-controls-second">
              <button className="fa fa-chevron-up" type="button" onClick={() => this.setState({second: this.state.second < 59 ? padLeft(parseInt(this.state.second) + 1) : this.state.second})} disabled={parseInt(this.state.second) === 59}/>
              <input type="text" name={`${this.props.name}-second`} value={this.state.second} onChange={this.handleSecondChange}/>
              <button className="fa fa-chevron-down" type="button" onClick={() => this.setState({second: this.state.second > 0 ? padLeft(parseInt(this.state.second) - 1) : this.state.second})} disabled={parseInt(this.state.second) === 0}/>
            </div>
          </div>
          : null}
      </div>
    );
  }
}
