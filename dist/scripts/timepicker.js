'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function handleMouseDown(e, component, node, done) {
  if (!isDescendant(node, e.target)) {
    done();
  }
}

function padLeft(number) {
  var num = parseInt(number);
  if (num < 10) return '0' + num.toString();else return num.toString();
}

function getTime(component) {
  var hour = parseInt(_react2.default.findDOMNode(component.refs.hours).value);
  var minute = parseInt(_react2.default.findDOMNode(component.refs.minutes).value);
  var second = parseInt(_react2.default.findDOMNode(component.refs.seconds).value);

  return { hour: hour, minute: minute, second: second };
}

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this, props));

    _this.handleIncreaseHour = function () {
      if (parseInt(_this.state.hour) < 23) {
        var hour = parseInt(_this.state.hour) + 1;
        var _this$state = _this.state;
        var minute = _this$state.minute;
        var second = _this$state.second;

        _this.props.onChange(hour, parseInt(minute), parseInt(second));
        _this.setState({ hour: padLeft(hour) });
      }
    };

    _this.handleDecreaseHour = function () {
      if (parseInt(_this.state.hour) > 0) {
        var hour = parseInt(_this.state.hour) - 1;
        var _this$state2 = _this.state;
        var minute = _this$state2.minute;
        var second = _this$state2.second;

        _this.props.onChange(hour, parseInt(minute), parseInt(second));
        _this.setState({ hour: padLeft(hour) });
      }
    };

    _this.handleHourChange = function () {
      var time = getTime(_this);

      if (time.hour >= 0 && time.hour <= 23) {
        _this.props.onChange(time.hour, time.minute, time.second);
        _this.setState({ hour: padLeft(time.hour) });
      }
    };

    _this.handleIncreaseMinute = function () {
      if (parseInt(_this.state.minute) < 59) {
        var minute = parseInt(_this.state.minute) + 1;
        var _this$state3 = _this.state;
        var hour = _this$state3.hour;
        var second = _this$state3.second;

        _this.props.onChange(parseInt(hour), minute, parseInt(second));
        _this.setState({ minute: padLeft(minute) });
      }
    };

    _this.handleDecreaseMinute = function () {
      if (parseInt(_this.state.minute) > 0) {
        var minute = parseInt(_this.state.minute) - 1;
        var _this$state4 = _this.state;
        var hour = _this$state4.hour;
        var second = _this$state4.second;

        _this.props.onChange(parseInt(hour), minute, parseInt(second));
        _this.setState({ minute: padLeft(minute) });
      }
    };

    _this.handleMinuteChange = function () {
      var time = getTime(_this);

      if (time.minute >= 0 && time.minute <= 60) {
        _this.props.onChange(time.hour, time.minute, time.second);
        _this.setState({ minute: padLeft(time.minute) });
      }
    };

    _this.handleIncreaseSecond = function () {
      if (parseInt(_this.state.second) < 59) {
        var second = parseInt(_this.state.second) + 1;
        var _this$state5 = _this.state;
        var minute = _this$state5.minute;
        var hour = _this$state5.hour;

        _this.props.onChange(parseInt(hour), parseInt(minute), second);
        _this.setState({ second: padLeft(second) });
      }
    };

    _this.handleDecreaseSecond = function () {
      if (parseInt(_this.state.second) > 0) {
        var second = parseInt(_this.state.second) - 1;
        var _this$state6 = _this.state;
        var minute = _this$state6.minute;
        var hour = _this$state6.hour;

        _this.props.onChange(parseInt(hour), parseInt(minute), second);
        _this.setState({ second: padLeft(second) });
      }
    };

    _this.handleSecondChange = function () {
      var time = getTime(_this);

      if (time.second >= 0 && time.second <= 60) {
        _this.props.onChange(time.hour, time.minute, time.second);
        _this.setState({ second: padLeft(time.second) });
      }
    };

    _this.state = {
      clicked: false,
      hour: padLeft(props.hour),
      minute: padLeft(props.minute),
      second: padLeft(props.second)
    };
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var timePicker = _react2.default.findDOMNode(this.refs.timepicker);
      timePicker.addEventListener('click', function (e) {
        return handleClick(e, _this2);
      });
      document.addEventListener('mousedown', function (e) {
        return handleMouseDown(e, _this2, timePicker.parentNode, function () {
          return _this2.setState({ clicked: false });
        });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextState = {};

      if (typeof nextProps.hour !== 'undefined') nextState.hour = padLeft(nextProps.hour);

      if (typeof nextProps.minute !== 'undefined') nextState.minute = padLeft(nextProps.minute);

      if (typeof nextProps.second !== 'undefined') nextState.second = padLeft(nextProps.second);

      this.setState(nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      var timePicker = _react2.default.findDOMNode(this.refs.timepicker);
      timePicker.removeEventListener('click', function (e) {
        return handleClick(e, _this3);
      });
      document.removeEventListener('mousedown', function (e) {
        return handleMouseDown(e, _this3, timePicker.parentNode, function () {
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
        _react2.default.createElement('input', { ref: 'timepicker', type: 'text', className: 'timepicker-input ' + this.props.className, name: this.props.name, id: this.props.name, value: this.state.hour + ':' + this.state.minute + ':' + this.state.second, readOnly: true }),
        this.state.clicked ? _react2.default.createElement(
          'div',
          { className: 'timepicker-controls' },
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-hour' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseHour, disabled: parseInt(this.state.hour) === 23 }),
            _react2.default.createElement('input', { ref: 'hours', type: 'text', name: this.props.name + '-hour', value: this.state.hour, onChange: this.handleHourChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseHour, disabled: parseInt(this.state.hour) === 0 })
          ),
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-minute' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseMinute, disabled: parseInt(this.state.minute) === 59 }),
            _react2.default.createElement('input', { ref: 'minutes', type: 'text', name: this.props.name + '-minute', value: this.state.minute, onChange: this.handleMinuteChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseMinute, disabled: parseInt(this.state.minute) === 0 })
          ),
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-second' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: this.handleIncreaseSecond, disabled: parseInt(this.state.second) === 59 }),
            _react2.default.createElement('input', { ref: 'seconds', type: 'text', name: this.props.name + '-second', value: this.state.second, onChange: this.handleSecondChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: this.handleDecreaseSecond, disabled: parseInt(this.state.second) === 0 })
          )
        ) : null
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = {
  className: _react.PropTypes.string,
  name: _react.PropTypes.string.isRequired,
  hour: _react.PropTypes.number,
  showHour: _react.PropTypes.bool,
  minute: _react.PropTypes.number,
  showMinute: _react.PropTypes.bool,
  second: _react.PropTypes.number,
  showSecond: _react.PropTypes.bool,
  onChange: _react.PropTypes.func.isRequired
};
TimePicker.defaultProps = {
  className: '',
  hour: 0,
  showHour: true,
  minute: 0,
  showMinute: true,
  second: 0,
  showSecond: true
};
exports.default = TimePicker;
