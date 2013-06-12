// Generated by CoffeeScript 1.4.0
(function() {
  var Api, BaseController, TopBar, User, loginDialog, signupDialog, template, _base, _base1, _ref, _ref1, _ref2,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if ((_ref = window.zooniverse) == null) {
    window.zooniverse = {};
  }

  if ((_ref1 = (_base = window.zooniverse).controllers) == null) {
    _base.controllers = {};
  }

  if ((_ref2 = (_base1 = window.zooniverse).views) == null) {
    _base1.views = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  loginDialog = zooniverse.controllers.loginDialog || require('./login-dialog');

  signupDialog = zooniverse.controllers.signupDialog || require('./signup-dialog');

  template = zooniverse.views.topBar || require('../views/top-bar');

  Api = zooniverse.Api || require('../lib/api');

  User = zooniverse.models.User || require('../models/user');

  TopBar = (function(_super) {

    __extends(TopBar, _super);

    TopBar.prototype.className = 'zooniverse-top-bar';

    TopBar.prototype.template = template;

    TopBar.prototype.messageCheckTimeout = 2 * 60 * 1000;

    TopBar.prototype.events = {
      'click button[name="sign-in"]': 'onClickSignIn',
      'click button[name="sign-up"]': 'onClickSignUp',
      'click button[name="sign-out"]': 'onClickSignOut'
    };

    TopBar.prototype.elements = {
      '.current-user-name': 'currentUserName',
      '.message-count': 'messageCount',
      '.avatar img': 'avatarImage',
      '.group': 'currentGroup'
    };

    function TopBar(title) {
      this.title = title != null ? title : 'A Zooniverse project';
      this.processGroup = __bind(this.processGroup, this);

      this.getMessages = __bind(this.getMessages, this);

      this.onUserChange = __bind(this.onUserChange, this);

      TopBar.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
    }

    TopBar.prototype.onClickSignIn = function() {
      return loginDialog.show();
    };

    TopBar.prototype.onClickSignUp = function() {
      return signupDialog.show();
    };

    TopBar.prototype.onClickSignOut = function() {
      return User.logout();
    };

    TopBar.prototype.onUserChange = function(e, user) {
      this.el.toggleClass('signed-in', user != null);
      this.getMessages();
      this.processGroup();
      this.currentUserName.html((user != null ? user.name : void 0) || '');
      return this.avatarImage.attr({
        src: user != null ? user.avatar : void 0
      });
    };

    TopBar.prototype.getMessages = function() {
      var _this = this;
      if (User.current != null) {
        return Api.current.get('/talk/messages/count', function(messages) {
          _this.el.toggleClass('has-messages', messages !== 0);
          _this.messageCount.html(messages);
          return setTimeout(_this.getMessages, _this.messageCheckTimeout);
        });
      } else {
        this.el.removeClass('has-messages');
        return this.messageCount.html('0');
      }
    };

    TopBar.prototype.processGroup = function() {
      var currentGroup, group, _i, _len, _ref3, _results;
      if ((User.current != null) && User.current.hasOwnProperty('user_group_id')) {
        this.el.addClass('has-group');
        _ref3 = User.current.user_groups;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          group = _ref3[_i];
          currentGroup = group;
          if (group.id === !User.current.user_group_id) {
            continue;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        return this.el.removeClass('has-group');
      }
    };

    return TopBar;

  })(BaseController);

  window.zooniverse.controllers.TopBar = TopBar;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TopBar;
  }

}).call(this);
