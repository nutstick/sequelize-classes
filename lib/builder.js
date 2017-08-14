'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _decorators = require('./decorators');

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _decorators[key];
    }
  });
});

var _model = require('./model');

Object.keys(_model).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _model[key];
    }
  });
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = { database: '', databaseUrl: '', username: '', pass: '', config: {} };

var Builder = function () {
  function Builder() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
    var models = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _classCallCheck3.default)(this, Builder);
    this.sequelize = null;
    this.models = [];
    this.loadedModels = {};

    var sequelizeArguments = [];
    if (options.databaseUrl) sequelizeArguments.push(options.databaseUrl);
    if (!options.databaseUrl && options.database) {
      sequelizeArguments = [options.database, options.username, options.pass];
    }
    sequelizeArguments.push(options.config);
    this.sequelize = new (Function.prototype.bind.apply(_sequelize2.default, [null].concat((0, _toConsumableArray3.default)(sequelizeArguments))))();
    this.models = models.map(function (Model) {
      return new Model();
    });

    this.models.forEach(function (model) {
      model.generateOptions();
      var loadedModel = model.registerModel(_this.sequelize);
      _this.loadedModels[loadedModel.name] = loadedModel;
      Object.defineProperty(_this, loadedModel.name, {
        get: function get() {
          return loadedModel;
        }
      });
    });

    this.models.forEach(function (model) {
      _this.registerRelationship(model, _this.loadedModels[model.constructor.name]);
      _this.registerScopes(model, _this.loadedModels[model.constructor.name]);
    });
  }

  (0, _createClass3.default)(Builder, [{
    key: 'registerRelationship',
    value: function registerRelationship(sequelizeClass, model) {
      var _this2 = this;

      if (!sequelizeClass.constructor._relationships) {
        return;
      }
      sequelizeClass.constructor._relationships.forEach(function (relation) {
        model[relation.type](_this2.loadedModels[relation.model], relation.options);
      });
    }
  }, {
    key: 'replaceIncludeModels',
    value: function replaceIncludeModels(scope) {
      var _this3 = this;

      return scope.include.map(function (include) {
        if (typeof include.model === 'string') {
          include.model = _this3.loadedModels[include.model];
        }
        return include;
      });
    }
  }, {
    key: 'registerScopes',
    value: function registerScopes(sequelizeClass, model) {
      var _this4 = this;

      if (sequelizeClass._defaultScope) {
        if (sequelizeClass._defaultScope.include) {
          sequelizeClass._defaultScope.include = this.replaceIncludeModels(sequelizeClass._defaultScope);
        }
        model.addScope('defaultScope', sequelizeClass._defaultScope, { override: true });
      }

      if (sequelizeClass._scopes) {
        Object.keys(sequelizeClass._scopes).forEach(function (scopeName) {
          var scope = sequelizeClass._scopes[scopeName];
          if (scope.include) {
            scope = _this4.replaceIncludeModels(scope);
          }
          model.addScope(scopeName, scope);
        });
      }
    }
  }, {
    key: 'syncDatabase',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sequelize.sync(_lodash2.default.assign(options, { force: force }));

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function syncDatabase() {
        return _ref.apply(this, arguments);
      }

      return syncDatabase;
    }()
  }, {
    key: 'query',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_query) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.sequelize.query(_query, options);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function query(_x5) {
        return _ref2.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: 'base',
    get: function get() {
      return this.sequelize;
    },
    set: function set(sequelize) {
      this.sequelize = sequelize;
    }
  }]);
  return Builder;
}();

exports.Builder = Builder;