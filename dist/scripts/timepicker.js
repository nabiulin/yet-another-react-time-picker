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

var handleClick = function handleClick(component) {
  component.setState({ clicked: !component.state.clicked });
};

var padLeft = function padLeft(number) {
  var num = parseInt(number);
  if (num < 10) return '0' + num.toString();else return num.toString();
};

var TimePicker = function (_React$Component) {
  _inherits(TimePicker, _React$Component);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TimePicker).call(this, props));

    _this.handleHourChange = function (e) {
      var value = e.target.value;

      var hour = parseInt(value);

      if (hour >= 0 && hour <= 23) _this.setState({ hour: padLeft(hour) });
    };

    _this.handleMinuteChange = function (e) {
      var value = e.target.value;

      var minute = parseInt(value);

      if (minute >= 0 && minute <= 60) _this.setState({ minute: padLeft(minute) });
    };

    _this.handleSecondChange = function (e) {
      var value = e.target.value;

      var second = parseInt(value);

      if (second >= 0 && second <= 60) _this.setState({ second: padLeft(second) });
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

      var timePicker = document.querySelector('.timepicker-input');
      timePicker.addEventListener('click', function () {
        return handleClick(_this2);
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

      var timePicker = document.querySelector('.timepicker-input');
      timePicker.removeEventListener('click', function () {
        return handleClick(_this3);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'timepicker' },
        _react2.default.createElement('input', { type: 'text', className: 'timepicker-input', ref: 'timepicker', name: this.props.name, id: this.props.name, value: this.state.hour + ':' + this.state.minute + ':' + this.state.second, readOnly: true }),
        this.state.clicked ? _react2.default.createElement(
          'div',
          { className: 'timepicker-controls' },
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-hour' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: function onClick() {
                return _this4.setState({ hour: _this4.state.hour < 23 ? padLeft(parseInt(_this4.state.hour) + 1) : _this4.state.hour });
              }, disabled: parseInt(this.state.hour) === 23 }),
            _react2.default.createElement('input', { type: 'text', name: this.props.name + '-hour', value: this.state.hour, onChange: this.handleHourChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: function onClick() {
                return _this4.setState({ hour: _this4.state.hour > 0 ? padLeft(parseInt(_this4.state.hour) - 1) : _this4.state.hour });
              }, disabled: parseInt(this.state.hour) === 0 })
          ),
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-minute' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: function onClick() {
                return _this4.setState({ minute: _this4.state.minute < 59 ? padLeft(parseInt(_this4.state.minute) + 1) : _this4.state.minute });
              }, disabled: parseInt(this.state.minute) === 59 }),
            _react2.default.createElement('input', { type: 'text', name: this.props.name + '-minute', value: this.state.minute, onChange: this.handleMinuteChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: function onClick() {
                return _this4.setState({ minute: _this4.state.minute > 0 ? padLeft(parseInt(_this4.state.minute) - 1) : _this4.state.minute });
              }, disabled: parseInt(this.state.minute) === 0 })
          ),
          _react2.default.createElement(
            'div',
            { className: 'timepicker-controls-second' },
            _react2.default.createElement('button', { className: 'fa fa-chevron-up', type: 'button', onClick: function onClick() {
                return _this4.setState({ second: _this4.state.second < 59 ? padLeft(parseInt(_this4.state.second) + 1) : _this4.state.second });
              }, disabled: parseInt(this.state.second) === 59 }),
            _react2.default.createElement('input', { type: 'text', name: this.props.name + '-second', value: this.state.second, onChange: this.handleSecondChange }),
            _react2.default.createElement('button', { className: 'fa fa-chevron-down', type: 'button', onClick: function onClick() {
                return _this4.setState({ second: _this4.state.second > 0 ? padLeft(parseInt(_this4.state.second) - 1) : _this4.state.second });
              }, disabled: parseInt(this.state.second) === 0 })
          )
        ) : null
      );
    }
  }]);

  return TimePicker;
}(_react2.default.Component);

TimePicker.propTypes = {
  name: _react.PropTypes.string.isRequired,
  hour: _react.PropTypes.number,
  showHour: _react.PropTypes.bool,
  minute: _react.PropTypes.number,
  showMinute: _react.PropTypes.bool,
  second: _react.PropTypes.number,
  showSecond: _react.PropTypes.bool
};
TimePicker.defaultProps = {
  hour: 0,
  showHour: true,
  minute: 0,
  showMinute: true,
  second: 0,
  showSecond: true
};
exports.default = TimePicker;
