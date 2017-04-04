webpackHotUpdate(0,{

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _jsonwebtoken = __webpack_require__(82);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _reactTinymce = __webpack_require__(631);

var _reactTinymce2 = _interopRequireDefault(_reactTinymce);

var _reactRedux = __webpack_require__(30);

var _reactRouter = __webpack_require__(25);

var _documentAction = __webpack_require__(57);

var _reactMaterialize = __webpack_require__(127);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Documents = function (_React$Component) {
  _inherits(Documents, _React$Component);

  function Documents(props) {
    _classCallCheck(this, Documents);

    var _this = _possibleConstructorReturn(this, (Documents.__proto__ || Object.getPrototypeOf(Documents)).call(this, props));

    _this.state = {
      title: '',
      content: '',
      access: '',
      userId: _jsonwebtoken2.default.decode(localStorage.getItem('token')).userId
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Documents, [{
    key: 'handleChange',
    value: function handleChange(event) {
      var changeProps = {};
      changeProps[event.target.name] = event.target.value;
      this.setState(changeProps);
      // this.setState({access: event.target.value})
    }
  }, {
    key: 'handleEditorChange',
    value: function handleEditorChange(e) {
      console.log('Content was updated:', e.target.getContent());
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      this.props.createDocAction(this.state.title, this.state.content, 'public', _jsonwebtoken2.default.decode(localStorage.getItem('token')).userId);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // $('select').material_select();
      $('#selectMe').on('change', this.handleChange);
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.props.user);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'row card' },
          _react2.default.createElement(
            'div',
            { className: '' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col m8' },
                _react2.default.createElement(_reactMaterialize.Input, { type: 'text', onChange: this.handleChange, value: this.state.title, name: 'title', label: 'Title' }),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field' },
                  _react2.default.createElement(_reactTinymce2.default, { content: 'This is the initial content of the editor',
                    config: {
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    },
                    onChange: this.handleEditorChange })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s3 hoverable', id: 'access-chip' },
              _react2.default.createElement(
                'select',
                { value: this.state.access, id: 'selectMe' },
                _react2.default.createElement(
                  'option',
                  { value: '' },
                  'Select an access type'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'public' },
                  'Public'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'private' },
                  'Private'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'role' },
                  'Role'
                )
              )
            ),
            _react2.default.createElement(
              'button',
              { className: 'waves-effect btn', onClick: this.handleSubmit, type: 'button', value: 'submit' },
              'Save'
            )
          )
        )
      );
    }
  }]);

  return Documents;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    docCreated_Success: state.documentReducer.docCreated_Success
  };
};

var mapDispatchToProps = {
  createDocAction: _documentAction.createDocAction
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Documents);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(27)))

/***/ })

})