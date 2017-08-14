'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12; /**
                                                                                                                                                                                                                                                                                                                            * @file Defines a class Model for extending other Sequelize Models from.
                                                                                                                                                                                                                                                                                                                            * @author Brad Decker <brad.decker@conciergeauctions.com>
                                                                                                                                                                                                                                                                                                                            */

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _decorators = require('./decorators');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

// Array of members in which to clean from the constructor.
var constructorCleanup = ['_validate', '_hooks', '_defaultScope', '_scopes'];
var relatedModels = {};

/**
 * @class Model
 */
var Model = exports.Model = (_dec = (0, _decorators.enumerable)(false), _dec2 = (0, _decorators.enumerable)(false), _dec3 = (0, _decorators.enumerable)(false), _dec4 = (0, _decorators.enumerable)(false), _dec5 = (0, _decorators.enumerable)(false), _dec6 = (0, _decorators.enumerable)(false), _dec7 = (0, _decorators.enumerable)(false), _dec8 = (0, _decorators.enumerable)(false), _dec9 = (0, _decorators.enumerable)(false), _dec10 = (0, _decorators.enumerable)(false), _dec11 = (0, _decorators.enumerable)(false), _dec12 = (0, _decorators.enumerable)(false), _dec13 = (0, _decorators.readOnly)(), _dec14 = (0, _decorators.readOnly)(), _dec15 = (0, _decorators.readOnly)(), _dec16 = (0, _decorators.readOnly)(), (_class = function () {

  /**
   * @constructor
   * builds the model and calls the cleanConstructor method.
   */


  // Object to declare base scope.


  // Boolean to track status of the model.


  // Object for declaring model hooks


  // Object for declaring setters for fields


  // Object for storing class methods
  function Model() {
    (0, _classCallCheck3.default)(this, Model);

    _initDefineProp(this, '_fields', _descriptor, this);

    _initDefineProp(this, '_instanceMethods', _descriptor2, this);

    _initDefineProp(this, '_classMethods', _descriptor3, this);

    _initDefineProp(this, '_getterMethods', _descriptor4, this);

    _initDefineProp(this, '_setterMethods', _descriptor5, this);

    _initDefineProp(this, '_validate', _descriptor6, this);

    _initDefineProp(this, '_hooks', _descriptor7, this);

    _initDefineProp(this, '_indexes', _descriptor8, this);

    _initDefineProp(this, '_generated', _descriptor9, this);

    _initDefineProp(this, '_scopes', _descriptor10, this);

    _initDefineProp(this, '_defaultScope', _descriptor11, this);

    _initDefineProp(this, '_options', _descriptor12, this);

    this.cleanConstructor();
  }

  /**
   * Clean up the constructor object by moving externally defined
   * items back into the instance and removing
   * them from the original constructor object.
   */


  // Object Model Options


  // Object for declaring scopes.


  // Array of indexes to create on the schema


  // Object for declaring validators


  // Object for declaring getters for fields


  // Object for storing instance methods


  (0, _createClass3.default)(Model, [{
    key: 'cleanConstructor',
    value: function cleanConstructor() {
      var _this = this;

      constructorCleanup.forEach(function (item) {
        _this[item] = _this.constructor[item] || {};
        delete _this.constructor[item];
      });
      var cleanup = this.constructor._cleanup || [];
      cleanup.forEach(function (item) {
        delete _this.constructor[item];
      });
      delete this.constructor._cleanup;
      this._indexes = this.constructor._indexes || [];
      delete this.constructor._indexes;
    }

    /**
     * Replace all occurrences of known string dataTypes with real dataTypes
     * @param dataTypes
     */

  }, {
    key: 'declareTypes',
    value: function declareTypes() {
      var _this2 = this;

      var dataTypes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _sequelize2.default;

      // TODO: Collect member variables and replace string data types with true data types.
      if (this._fields.length === 0) {
        this.generateOptions();
      }

      Object.keys(this._fields).forEach(function (key) {
        var definition = _this2._fields[key];
        if ((typeof definition === 'undefined' ? 'undefined' : (0, _typeof3.default)(definition)) === 'object') {
          definition.type = dataTypes[definition.type];
        } else {
          definition = dataTypes[definition];
        }
        _this2._fields[key] = definition;
      });
    }

    /**
     * Loop through the hooks declared in _hooks and add them to
     * the model schema through the addHook method.
     * @param {Object} model - instance of the model
     */

  }, {
    key: 'declareHooks',
    value: function declareHooks(model) {
      var _this3 = this;

      if (!model.addHook) {
        throw new Error('declareHooks called before model generated');
      }

      Object.keys(this._hooks).forEach(function (key) {
        var hook = _this3._hooks[key];
        model.addHook(hook.action, key, hook.fn);
      });
    }

    /**
     * Loop through all of the extensions added into this model and
     * inherit all of the extension methods and fields.
     */

  }, {
    key: 'runExtensions',
    value: function runExtensions() {
      if (!this.constructor._extensions) {
        return;
      }

      var fields = ['_fields', '_validate', '_indexes', '_classMethods', '_instanceMethods', '_hooks', '_getterMethods', '_setterMethods', '_defaultScope', '_scopes'];

      /* eslint-disable */
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          this[field] = _lodash2.default.merge.apply(_lodash2.default, (0, _toConsumableArray3.default)(_lodash2.default.map(this.constructor._extensions, field)).concat([this[field]]));
        }
        /* eslint-enable */
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Sequelize-Six requires all of the configuration level fields to be defined
     * prior to registering a model schema
     * this function generates all of these options, and assigns function definitions
     * to the appropriate configuration
     * object. If it is called more than once it will not regenerate options, to aid in performance.
     */

  }, {
    key: 'generateOptions',
    value: function generateOptions() {
      if (!this._generated) {
        this._fields = (0, _helpers.getProperties)(this);
        (0, _helpers.defineFunctions)(this);
        this.runExtensions();
        this._generated = true;
      }
    }

    /**
     * This is a shortcut to call sequelize.define. It adds in all of the configuration options
     * that are built with
     * the Sequelize-Six library. Returns the model returned from the define call.
     * @returns {Model}
     */

  }, {
    key: 'registerModel',
    value: function registerModel(sequelize) {
      var model = sequelize.define(this.constructor.name, this._fields, (0, _extends3.default)({
        instanceMethods: this._instanceMethods,
        indexes: this._indexes,
        classMethods: this._classMethods,
        getterMethods: this._getterMethods,
        setterMethods: this._setterMethods,
        validate: this._validate
      }, this.constructor._options));

      this.declareHooks(model);
      // this.declareRelations( model, sequelize );
      return model;
    }
  }, {
    key: 'declareRelations',
    value: function declareRelations(model, sequelize) {
      if (!this.constructor._relationships) {
        return;
      }

      /* eslint-disable */
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.constructor._relationships[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var relation = _step2.value;

          if (typeof relatedModels[relation.model] === 'undefined') {
            relatedModels[relation.model] = sequelize.import(relation.file);
          }
          model[relation.type](relatedModels[relation.model], relation.options);
        }
        /* eslint-enable */
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * Sequelize allows you to create a export function in which you define your models.
     * This function allows you to export Sequelize-Six Models without creating an instance
     * or manually building these functions. Simply do export default Model.exportModel();
     *
     * @returns {Function}
     */

  }], [{
    key: 'exportModel',
    value: function exportModel() {
      var _this4 = this;

      return function (sequelize) {
        var model = new _this4();
        model.generateOptions();
        return model.registerModel(sequelize);
      };
    }
  }]);
  return Model;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, '_fields', [_dec], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, '_instanceMethods', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, '_classMethods', [_dec3], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, '_getterMethods', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, '_setterMethods', [_dec5], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, '_validate', [_dec6], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, '_hooks', [_dec7], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, '_indexes', [_dec8], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, '_generated', [_dec9], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, '_scopes', [_dec10], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, '_defaultScope', [_dec11], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, '_options', [_dec12], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class.prototype, 'declareTypes', [_dec13], Object.getOwnPropertyDescriptor(_class.prototype, 'declareTypes'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'declareHooks', [_dec14], Object.getOwnPropertyDescriptor(_class.prototype, 'declareHooks'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'runExtensions', [_dec15], Object.getOwnPropertyDescriptor(_class.prototype, 'runExtensions'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'generateOptions', [_dec16], Object.getOwnPropertyDescriptor(_class.prototype, 'generateOptions'), _class.prototype)), _class));