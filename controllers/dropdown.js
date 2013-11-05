// Generated by CoffeeScript 1.6.3
(function() {
  var Dropdown, offset, toggleClass, _base, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  toggleClass = ((_ref = zooniverse.util) != null ? _ref.toggleClass : void 0) || require('../util/toggle-class');

  offset = ((_ref1 = zooniverse.util) != null ? _ref1.offset : void 0) || require('../util/offset');

  Dropdown = (function() {
    var _this = this;

    Dropdown.buttonClass = 'zooniverse-dropdown-button';

    Dropdown.menuClass = 'zooniverse-dropdown-menu';

    Dropdown.instances = [];

    Dropdown.elements = [];

    Dropdown.closeAll = function(_arg) {
      var except, instance, _i, _len, _ref2, _results;
      except = (_arg != null ? _arg : {}).except;
      _ref2 = this.instances;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        instance = _ref2[_i];
        if (instance !== except) {
          _results.push(instance.close());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    addEventListener('click', function(e) {
      var node, shouldClose;
      shouldClose = true;
      node = e.target.correspondingUseElement || e.target;
      while (node != null) {
        if (__indexOf.call(Dropdown.elements, node) >= 0) {
          shouldClose = false;
          break;
        }
        node = node.parentNode;
      }
      if (shouldClose) {
        return Dropdown.closeAll();
      }
    });

    Dropdown.prototype.button = null;

    Dropdown.prototype.buttonClass = '';

    Dropdown.prototype.buttonTag = 'button';

    Dropdown.prototype.menu = null;

    Dropdown.prototype.menuClass = '';

    Dropdown.prototype.menuTag = 'div';

    Dropdown.prototype.buttonPinning = [0.5, 1];

    Dropdown.prototype.menuPinning = [0.5, 0];

    Dropdown.prototype._open = null;

    Dropdown.prototype.openClass = 'open';

    Dropdown.prototype.animationDelay = 250;

    function Dropdown(params) {
      var property, value;
      if (params == null) {
        params = {};
      }
      this.onResize = __bind(this.onResize, this);
      this.onButtonClick = __bind(this.onButtonClick, this);
      window.dropdown = this;
      for (property in params) {
        value = params[property];
        this[property] = value;
      }
      if (this.button == null) {
        this.button = document.createElement(this.buttonTag);
      }
      toggleClass(this.button, this.constructor.buttonClass, true);
      if (this.className) {
        toggleClass(this.button, this.className, true);
      }
      this.button.addEventListener('click', this.onButtonClick, false);
      if (this.menu == null) {
        this.menu = document.createElement(this.menuTag);
      }
      toggleClass(this.menu, this.constructor.menuClass, true);
      if (this.menuClass) {
        toggleClass(this.menu, this.menuClass, true);
      }
      this.menu.style.position = 'absolute';
      this.menu.style.display = 'none';
      document.body.appendChild(this.menu);
      this.close();
      this.constructor.instances.push(this);
      this.constructor.elements.push(this.button);
      this.constructor.elements.push(this.menu);
    }

    Dropdown.prototype.onButtonClick = function(e) {
      return this.toggle();
    };

    Dropdown.prototype.toggle = function() {
      if (this._open) {
        return this.close();
      } else {
        return this.open();
      }
    };

    Dropdown.prototype.open = function() {
      var _this = this;
      this.constructor.closeAll({
        except: this
      });
      toggleClass(this.button, this.openClass, true);
      this.menu.style.display = '';
      this.positionMenu();
      setTimeout(function() {
        toggleClass(_this.menu, _this.openClass, true);
        return _this._open = true;
      });
      return addEventListener('resize', this.onResize, false);
    };

    Dropdown.prototype.positionMenu = function() {
      var buttonOffset;
      buttonOffset = offset(this.button);
      this.menu.style.left = (buttonOffset.left + (this.button.clientWidth * this.buttonPinning[0])) - (this.menu.clientWidth * this.menuPinning[0]) + 'px';
      return this.menu.style.top = (buttonOffset.top + (this.button.clientHeight * this.buttonPinning[1])) - (this.menu.clientHeight * this.menuPinning[1]) + 'px';
    };

    Dropdown.prototype.onResize = function() {
      return this.positionMenu();
    };

    Dropdown.prototype.close = function() {
      var _this = this;
      toggleClass(this.button, this.openClass, false);
      toggleClass(this.menu, this.openClass, false);
      setTimeout((function() {
        _this.menu.style.display = 'none';
        return _this._open = false;
      }), this.animationDelay);
      return removeEventListener('resize', this.onResize, false);
    };

    Dropdown.prototype.destroy = function() {
      var _ref2, _ref3;
      this.constructor.instances.splice(this.constructor.instances.indexOf(this), 1);
      this.constructor.elements.splice(this.constructor.instances.indexOf(this.button), 1);
      this.constructor.elements.splice(this.constructor.instances.indexOf(this.menu), 1);
      this.button.removeEventListener('click', this.onButtonClick, false);
      if ((_ref2 = this.button.parentNode) != null) {
        _ref2.removeChild(this.button);
      }
      return (_ref3 = this.menu.parentNode) != null ? _ref3.removeChild(this.menu) : void 0;
    };

    return Dropdown;

  }).call(this);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  window.zooniverse.controllers.Dropdown = Dropdown;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropdown;
  }

}).call(this);
