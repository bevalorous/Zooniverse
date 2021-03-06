// Generated by CoffeeScript 1.6.3
(function() {
  var $, EventEmitter, LanguageManager, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  EventEmitter = ((_ref = window.zooniverse) != null ? _ref.EventEmitter : void 0) || require('./event-emitter');

  $ = window.jQuery;

  LanguageManager = (function(_super) {
    __extends(LanguageManager, _super);

    LanguageManager.current = null;

    LanguageManager.prototype.translations = null;

    LanguageManager.prototype.code = 'en';

    function LanguageManager(_arg) {
      var lang, _base, _name, _ref1, _ref2, _ref3, _ref4, _ref5,
        _this = this;
      _ref1 = _arg != null ? _arg : {}, this.translations = _ref1.translations, this.code = _ref1.code;
      if (this.translations == null) {
        this.translations = {};
      }
      if (window.AVAILABLE_TRANSLATIONS != null) {
        _ref2 = window.AVAILABLE_TRANSLATIONS;
        for (code in _ref2) {
          lang = _ref2[code];
          this.translations[code] = lang;
        }
      }
      if (this.code == null) {
        this.code = (_ref3 = location.search.match(/lang=([^&]+)/)) != null ? _ref3[1] : void 0;
      }
      if (this.code == null) {
        this.code = localStorage.getItem('zooniverse-language-code');
      }
      if (this.code == null) {
        this.code = (_ref4 = navigator.language) != null ? _ref4.split('-')[0] : void 0;
      }
      if (this.code == null) {
        this.code = (_ref5 = navigator.userLanguage) != null ? _ref5.split('-')[0] : void 0;
      }
      if (this.code == null) {
        this.code = this.constructor.prototype.code;
      }
      if (__indexOf.call(this.code, '/') >= 0 || __indexOf.call(this.code, '.json') >= 0) {
        if ((_base = this.translations)[_name = this.code] == null) {
          _base[_name] = {
            label: this.code,
            strings: this.code
          };
        }
      }
      this.constructor.current = this;
      setTimeout(function() {
        return _this.setLanguage(_this.code);
      });
    }

    LanguageManager.prototype.setLanguage = function(code, done, fail) {
      var localStrings, pathToStrings, request, _ref1, _ref2,
        _this = this;
      this.code = code;
      if (typeof ((_ref1 = this.translations[this.code]) != null ? _ref1.strings : void 0) === 'string') {
        pathToStrings = (_ref2 = this.translations[this.code]) != null ? _ref2.strings : void 0;
        localStrings = JSON.parse(localStorage.getItem("zooniverse-language-strings-" + this.code));
        if (localStrings != null) {
          this.translations[this.code].strings = localStrings;
          this.setLanguage(this.code, done, fail);
        }
        request = $.getJSON(pathToStrings);
        request.done(function(data) {
          localStorage.setItem("zooniverse-language-strings-" + _this.code, JSON.stringify(data));
          _this.translations[_this.code].strings = data;
          return _this.setLanguage(_this.code, done, fail);
        });
        return request.fail(function() {
          _this.trigger('language-fetch-fail');
          return typeof fail === "function" ? fail.apply(null, arguments) : void 0;
        });
      } else {
        localStorage.setItem('zooniverse-language-code', this.code);
        this.trigger('change-language', [this.code, this.translations[this.code].strings]);
        return typeof done === "function" ? done(this.code, this.translations[this.code].strings) : void 0;
      }
    };

    return LanguageManager;

  })(EventEmitter);

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  window.zooniverse.LanguageManager = LanguageManager;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = LanguageManager;
  }

}).call(this);
