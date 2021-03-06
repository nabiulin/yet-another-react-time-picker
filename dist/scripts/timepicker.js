'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function handleClick(e, component) {
  component.setState({ clicked: !component.state.clicked });
}

function handleMouseDown(e, node, done) {
  if (!isDescendant(node, e.target)) {
    done();
  }
}

function padLeft(number) {
  var num = parseInt(number);
  if (num < 10) return '0' + num.toString();else return num.toString();
}

function getTime(component) {
  var hour = 0,
      minute = 0,
      second = 0;

  if (component.refs.hasOwnProperty('hours')) hour = parseInt((0, _reactDom.findDOMNode)(component.refs.hours).value);

  if (component.refs.hasOwnProperty('minutes')) minute = parseInt((0, _reactDom.findDOMNode)(component.refs.minutes).value);

  if (component.refs.hasOwnProperty('seconds')) second = parseInt((0, _reactDom.findDOMNode)(component.refs.seconds).value);

  return { hour: hour, minute: minute, second: second };
}

var propTypes = {
  className: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  hour: _react.PropTypes.number.isRequired,
  showHour: _react.PropTypes.bool,
  maxHour: _react.PropTypes.number,
  minute: _react.PropTypes.number.isRequired,
  showMinute: _react.PropTypes.bool,
  maxMinute: _react.PropTypes.number,
  second: _react.PropTypes.number.isRequired,
  showSecond: _react.PropTypes.bool,
  maxSecond: _react.PropTypes.number,
  onChange: _react.PropTypes.func.isRequired
};

var defaultProps = {
  className: '',
  showHour: true,
  maxHour: 23,
  showMinute: true,
  maxMinute: 59,
  showSecond: true,
  maxSecond: 59
};

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this, props));

    _this.handleIncreaseHour = function () {
      var _this$props = _this.props;
      var hour = _this$props.hour;
      var maxHour = _this$props.maxHour;
      var minute = _this$props.minute;
      var second = _this$props.second;
      var onChange = _this$props.onChange;


      if (parseInt(hour) < 23 && hour < maxHour) {
        onChange(parseInt(hour) + 1, parseInt(minute), parseInt(second));
      }
    };

    _this.handleDecreaseHour = function () {
      var _this$props2 = _this.props;
      var hour = _this$props2.hour;
      var minute = _this$props2.minute;
      var second = _this$props2.second;
      var onChange = _this$props2.onChange;


      if (parseInt(hour) > 0) {
        onChange(parseInt(hour) - 1, parseInt(minute), parseInt(second));
      }
    };

    _this.handleHourChange = function () {
      var _this$props3 = _this.props;
      var maxHour = _this$props3.maxHour;
      var onChange = _this$props3.onChange;

      var _getTime = getTime(_this);

      var hour = _getTime.hour;
      var minute = _getTime.minute;
      var second = _getTime.second;


      if (hour >= 0 && hour <= 23 && hour <= maxHour) {
        onChange(hour, minute, second);
      }
    };

    _this.handleIncreaseMinute = function () {
      var _this$props4 = _this.props;
      var hour = _this$props4.hour;
      var minute = _this$props4.minute;
      var maxMinute = _this$props4.maxMinute;
      var second = _this$props4.second;
      var onChange = _this$props4.onChange;


      if (parseInt(minute) < 59 && minute < maxMinute) {
        onChange(parseInt(hour), parseInt(minute) + 1, parseInt(second));
      }
    };

    _this.handleDecreaseMinute = function () {
      var _this$props5 = _this.props;
      var minute = _this$props5.minute;
      var hour = _this$props5.hour;
      var second = _this$props5.second;
      var onChange = _this$props5.onChange;


      if (parseInt(minute) > 0) {
        onChange(parseInt(hour), parseInt(minute) - 1, parseInt(second));
      }
    };

    _this.handleMinuteChange = function () {
      var _this$props6 = _this.props;
      var maxMinute = _this$props6.maxMinute;
      var onChange = _this$props6.onChange;

      var _getTime2 = getTime(_this);

      var hour = _getTime2.hour;
      var minute = _getTime2.minute;
      var second = _getTime2.second;


      if (minute >= 0 && minute <= 59 && minute <= maxMinute) {
        onChange(hour, minute, second);
      }
    };

    _this.handleIncreaseSecond = function () {
      var _this$props7 = _this.props;
      var hour = _this$props7.hour;
      var minute = _this$props7.minute;
      var second = _this$props7.second;
      var maxSecond = _this$props7.maxSecond;
      var onChange = _this$props7.onChange;


      if (parseInt(second) < 59 && second < maxSecond) {
        onChange(parseInt(hour), parseInt(minute), parseInt(second) + 1);
      }
    };

    _this.handleDecreaseSecond = function () {
      var _this$props8 = _this.props;
      var hour = _this$props8.hour;
      var minute = _this$props8.minute;
      var second = _this$props8.second;
      var onChange = _this$props8.onChange;


      if (parseInt(second) > 0) {
        onChange(parseInt(hour), parseInt(minute), parseInt(second) - 1);
      }
    };

    _this.handleSecondChange = function () {
      var _this$props9 = _this.props;
      var maxSecond = _this$props9.maxSecond;
      var onChange = _this$props9.onChange;

      var _getTime3 = getTime(_this);

      var hour = _getTime3.hour;
      var minute = _getTime3.minute;
      var second = _getTime3.second;


      if (second >= 0 && second <= 59 && second <= maxSecond) {
        onChange(hour, minute, second);
      }
    };

    _this.state = {
      clicked: false
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var timePicker = (0, _reactDom.findDOMNode)(this.refs.timepicker);
      timePicker.addEventListener('click', function (e) {
        return handleClick(e, _this2);
      });
      document.addEventListener('mousedown', function (e) {
        return handleMouseDown(e, timePicker.parentNode, function () {
          return _this2.setState({ clicked: false });
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var timePicker = (0, _reactDom.findDOMNode)(this.refs.timepicker);
      timePicker.removeEventListener('click', function (e) {
        return handleClick(e, _this3);
      });
      document.removeEventListener('mousedown', function (e) {
        return handleMouseDown(e, timePicker.parentNode, function () {
          return _this3.setState({ clicked: false });
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'timepicker' },
        _react2.default.createElement('input', { ref: 'timepicker', type: 'text', className: 'timepicker-input ' + this.props.className, name: this.props.name, id: this.props.name, value: padLeft(this.props.hour) + ':' + padLeft(this.props.minute) + ':' + padLeft(this.props.second), readOnly: true }),
        this.state.clicked ? _react2.default.createElement(
          'div',
          { className: 'timepicker-controls' },
          this.props.showHour ? _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-hour' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseHour, disabled: parseInt(this.props.hour) === 23 }),
            _react2.default.createElement('input', { ref: 'hours', type: 'text', name: this.props.name + '-hour', value: padLeft(this.props.hour), onChange: this.handleHourChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseHour, disabled: parseInt(this.props.hour) === 0 })
          ) : null,
          this.props.showMinute ? _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-minute' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseMinute, disabled: parseInt(this.props.minute) === 59 }),
            _react2.default.createElement('input', { ref: 'minutes', type: 'text', name: this.props.name + '-minute', value: padLeft(this.props.minute), onChange: this.handleMinuteChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseMinute, disabled: parseInt(this.props.minute) === 0 })
          ) : null,
          this.props.showSecond ? _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-second' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseSecond, disabled: parseInt(this.props.second) === 59 }),
            _react2.default.createElement('input', { ref: 'seconds', type: 'text', name: this.props.name + '-second', value: padLeft(this.props.second), onChange: this.handleSecondChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseSecond, disabled: parseInt(this.props.second) === 0 })
          ) : null
        ) : null
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

exports.default = TimePicker;


TimePicker.defaultProps = defaultProps;
TimePicker.propTypes = propTypes;
