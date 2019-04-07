"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var KeyCodes = {
  ESCAPE: 27
};
var Selectors = {
  DATA_MODAL: "data-modal",
  DATA_MODAL_BUTTON: "data-modal-button",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_PARENT: "data-parent",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  NO_SCROLL: "no-scroll"
};
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize"
};
var Messages = {
  NO_BUTTON_ID_ERROR: "Could not find an id on your [data-modal-button] element. Modal can't be opened.",
  NO_MODAL_ID_ERROR: "Could not detect an id on your [data-modal] element. Please add a value matching a button's [data-modal-button] attribute.",
  NO_MODAL_ERROR: function NO_MODAL_ERROR(id) {
    return "Could not find a [data-parent='".concat(id, "'] attribute within your [data-modal='").concat(id, "'] element.");
  }
};

var Modal = function (_Utils) {
  _inherits(Modal, _Utils);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_this));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_this));
    _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_this));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_this));
    _this._modals = [];
    _this._modalButtons = [];
    _this._activeModalButton = {};
    _this._activeModalOverlay = {};
    _this._activeModal = {};
    _this._activeModalId = "";
    _this._activeModalOverlayAttr = "";
    _this._activeModalSelector = "";
    _this._activeModalCloseButtons = [];
    _this._modalContainerAttr = "[".concat(Selectors.DATA_MODAL, "]");
    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this._modals = (0, _utils.nodeListToArray)(this._modalContainerAttr);
      this._modalButtons = (0, _utils.nodeListToArray)("[".concat(Selectors.DATA_MODAL_BUTTON, "]"));
      (0, _utils.getFocusableElements)(this._modalContainerAttr).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      if (this._modals.length) {
        this._modals.forEach(function (instance) {
          _this2._setupModal(instance);
        });
      }

      if (this._modalButtons.length) {
        this._modalButtons.forEach(function (button) {
          button.addEventListener(Events.CLICK, _this2._render);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._modalButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_render",
    value: function _render(event) {
      var _this4 = this;

      event.preventDefault();
      this._activeModalButton = event.target;
      this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_MODAL_BUTTON);

      if (!this._activeModalId) {
        return console.error(Messages.NO_BUTTON_ID_ERROR);
      }

      this._activeModalOverlay = document.querySelector("[".concat(Selectors.DATA_MODAL, "=\"").concat(this._activeModalId, "\"]"));
      this._activeModalSelector = "[".concat(Selectors.DATA_PARENT, "='").concat(this._activeModalId, "']");
      this._activeModal = this._activeModalOverlay.querySelector(this._activeModalSelector);
      this._activeModalCloseButtons = (0, _utils.nodeListToArray)("".concat(this._activeModalSelector, " [").concat(Selectors.DATA_CLOSE, "]"));
      (0, _utils.getFocusableElements)(this._activeModalSelector).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "0");
      });

      this._handleScrollStop();

      this.captureFocus(this._activeModalSelector);

      this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false");

      this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true");

      this._activeModal.setAttribute(Selectors.TABINDEX, "-1");

      this._activeModal.focus();

      this._activeModalOverlay.scrollTop = 0;

      if (_utils.iOSMobile) {
        this._activeModalOverlay.style.cursor = "pointer";
      }

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.addEventListener(Events.CLICK, _this4._handleClose);
      });
    }
  }, {
    key: "_setupModal",
    value: function _setupModal(instance) {
      var modalId = instance.getAttribute(Selectors.DATA_MODAL);

      if (!modalId) {
        return console.error(Messages.NO_MODAL_ID_ERROR);
      }

      var modal = instance.querySelector("[".concat(Selectors.DATA_PARENT, "='").concat(modalId, "']"));

      if (!modal) {
        return console.error(Messages.NO_MODAL_ERROR(modalId));
      }

      var modalWrapper = document.querySelector("[".concat(Selectors.DATA_MODAL, "='").concat(modalId, "']"));
      modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true");
      modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false");
      modal.setAttribute(Selectors.ARIA_MODAL, "true");
      modal.setAttribute(Selectors.ROLE, "dialog");
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      var _this5 = this;

      event.preventDefault();

      this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "false");

      this._handleReturnFocus();

      this._handleScrollRestore();

      this.releaseFocus();

      this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "true");

      this._activeModal.removeAttribute(Selectors.TABINDEX);

      (0, _utils.getFocusableElements)(this._activeModalSelector).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      if (_utils.iOSMobile) {
        this._activeModalOverlay.style.cursor = "auto";
      }

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this5._handleClose);
      });

      this._activeModalId = null;
    }
  }, {
    key: "_handleOverlayClick",
    value: function _handleOverlayClick(event) {
      if (event.target === this._activeModalOverlay) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      if (event.which === KeyCodes.ESCAPE) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this._activeModalButton.setAttribute(Selectors.TABINDEX, "-1");

      this._activeModalButton.focus();

      this._activeModalButton.removeAttribute(Selectors.TABINDEX);
    }
  }, {
    key: "_handleScrollRestore",
    value: function _handleScrollRestore() {
      document.body.classList.remove(Selectors.NO_SCROLL);
      document.documentElement.classList.remove(Selectors.NO_SCROLL);
    }
  }, {
    key: "_handleScrollStop",
    value: function _handleScrollStop() {
      document.body.classList.add(Selectors.NO_SCROLL);
      document.documentElement.classList.add(Selectors.NO_SCROLL);
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;
//# sourceMappingURL=modal.js.map