'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enumerable = enumerable;
exports.readOnly = readOnly;
exports.validate = validate;
exports.scope = scope;
exports.hook = hook;
exports.addHook = addHook;
exports.removeHook = removeHook;
exports.hasHook = hasHook;
exports.beforeValidate = beforeValidate;
exports.afterValidate = afterValidate;
exports.beforeCreate = beforeCreate;
exports.afterCreate = afterCreate;
exports.beforeDestroy = beforeDestroy;
exports.afterDestroy = afterDestroy;
exports.beforeUpdate = beforeUpdate;
exports.afterUpdate = afterUpdate;
exports.beforeBulkCreate = beforeBulkCreate;
exports.afterBulkCreate = afterBulkCreate;
exports.beforeBulkDestroy = beforeBulkDestroy;
exports.afterBulkDestroy = afterBulkDestroy;
exports.beforeBulkUpdate = beforeBulkUpdate;
exports.afterBulkUpdate = afterBulkUpdate;
exports.beforeFind = beforeFind;
exports.beforeFindAfterExpandIncludeAll = beforeFindAfterExpandIncludeAll;
exports.beforeFindAfterOptions = beforeFindAfterOptions;
exports.afterFind = afterFind;
exports.beforeDefine = beforeDefine;
exports.afterDefine = afterDefine;
exports.beforeInit = beforeInit;
exports.afterInit = afterInit;
exports.multipleHooks = multipleHooks;
exports.beforePersisted = beforePersisted;
exports.relationship = relationship;
exports.belongsTo = belongsTo;
exports.hasOne = hasOne;
exports.hasMany = hasMany;
exports.belongsToMany = belongsToMany;
exports.extend = extend;
exports.option = option;
exports.schema = schema;
exports.paranoid = paranoid;
exports.bulkify = bulkify;
exports.index = index;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Decorator that changes the enumerable property on a property.
 * @param {Boolean} value - what value to set property
 * @returns {Function} - Function wrapper
 */
function enumerable(value) {
  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var descriptor = params[2];

    descriptor.enumerable = value;
    descriptor.death = true;
    return descriptor;
  };
}

/**
 * Decorator to mark a function or property as readOnly (writable = false)
 * @returns {Function}
 */
function readOnly() {
  return function () {
    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    var descriptor = params[2];

    descriptor.writable = false;
    return descriptor;
  };
}

/**
 * Decorator to mark a function as a validator method, add the field to the _validate object
 * @returns {Function}
 */
function validate() {
  return function (target, key, descriptor) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('Attempted to use a function decorator on a non function');
    }
    target.constructor._validate = target.constructor._validate || {};
    target.constructor._validate[key] = descriptor.value;
    delete target[key];
    delete descriptor.value;
  };
}

/**
 * Decorator to mark a property as being a scope or defaultScope based on the name of the property.
 * @returns {Function}
 */
function scope() {
  return function (target, key, descriptor) {
    target.constructor._scopes = target.constructor._scopes || {};

    if (key === 'defaultScope') {
      target.constructor._defaultScope = descriptor.initializer();
    } else {
      target.constructor._scopes[key] = descriptor.initializer();
    }

    delete target[key];
    delete descriptor.initializer;
  };
}

function addCleanup(target, key) {
  target._cleanup = target._cleanup || [];
  target._cleanup.push(key);
}

/**
 * Mark a function as being a hook and add it to the _hooks config object
 * @param {String} action - the action to hook into
 * @param {Object} options - options object
 * @param {Boolean} options.delete - should we delete the original function
 * @returns {Function}
 */
function hook(action) {
  return function (target, key, descriptor) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('Attempted to use a function decorator on a non function');
    }
    var actionKey = key + '_' + action;
    addCleanup(target, key);
    target._hooks = target._hooks || {};
    target._hooks[actionKey] = { fn: descriptor.value, action: action };
    return descriptor;
  };
}

/**
 * Shortcut to the Hook decorator that defines an addHook hook
 * @returns {Function}
 */
function addHook() {
  return hook('addHook');
}

/**
 * Shortcut to the Hook decorator that defines an removeHook hook
 * @returns {Function}
 */
function removeHook() {
  return hook('removeHook');
}

/**
 * Shortcut to the Hook decorator that defines an hasHook hook
 * @returns {Function}
 */
function hasHook() {
  return hook('hasHook');
}

/**
 * Shortcut to the Hook decorator that defines an beforeValidate hook
 * @returns {Function}
 */
function beforeValidate() {
  return hook('beforeValidate');
}

/**
 * Shortcut to the Hook decorator that defines an afterValidate hook
 * @returns {Function}
 */
function afterValidate() {
  return hook('afterValidate');
}

/**
 * Shortcut to the Hook decorator that defines a beforeCreate hook
 * @returns {Function}
 */
function beforeCreate() {
  return hook('beforeCreate');
}

/**
 * Shortcut to the Hook decorator that defines an afterCreate hook
 * @returns {Function}
 */
function afterCreate() {
  return hook('afterCreate');
}

/**
 * Shortcut to the Hook decorator that defines an beforeDestroy hook
 * @returns {Function}
 */
function beforeDestroy() {
  return hook('beforeDestroy');
}

/**
 * Shortcut to the Hook decorator that defines an afterDestroy hook
 * @returns {Function}
 */
function afterDestroy() {
  return hook('afterDestroy');
}

/**
 * Shortcut to the Hook decorator that defines a beforeUpdate hook
 * @returns {Function}
 */
function beforeUpdate() {
  return hook('beforeUpdate');
}

/**
 * Shortcut to the Hook decorator that defines a afterUpdate hook
 * @returns {Function}
 */
function afterUpdate() {
  return hook('afterUpdate');
}

/**
 * Shortcut to the Hook decorator that defines a beforeBulkCreate hook
 * @returns {Function}
 */
function beforeBulkCreate() {
  return hook('beforeBulkCreate');
}

/**
 * Shortcut to the Hook decorator that defines a afterBulkCreate hook
 * @returns {Function}
 */
function afterBulkCreate() {
  return hook('afterBulkCreate');
}

/**
 * Shortcut to the Hook decorator that defines a beforeBulkDestroy hook
 * @returns {Function}
 */
function beforeBulkDestroy() {
  return hook('beforeBulkDestroy');
}

/**
 * Shortcut to the Hook decorator that defines a afterBulkDestroy hook
 * @returns {Function}
 */
function afterBulkDestroy() {
  return hook('afterBulkDestroy');
}

/**
 * Shortcut to the Hook decorator that defines a beforeBulkUpdate hook
 * @returns {Function}
 */
function beforeBulkUpdate() {
  return hook('beforeBulkUpdate');
}

/**
 * Shortcut to the Hook decorator that defines a afterBulkUpdate hook
 * @returns {Function}
 */
function afterBulkUpdate() {
  return hook('afterBulkUpdate');
}

/**
 * Shortcut to the Hook decorator that defines a beforeFind hook
 * @returns {Function}
 */
function beforeFind() {
  return hook('beforeFind');
}

/**
 * Shortcut to the Hook decorator that defines a beforeFindAfterExpandIncludeAll hook
 * @returns {Function}
 */
function beforeFindAfterExpandIncludeAll() {
  return hook('beforeFindAfterExpandIncludeAll');
}

/**
 * Shortcut to the Hook decorator that defines a beforeFindAfterOptions hook
 * @returns {Function}
 */
function beforeFindAfterOptions() {
  return hook('beforeFindAfterOptions');
}

/**
 * Shortcut to the Hook decorator that defines a afterFind hook
 * @returns {Function}
 */
function afterFind() {
  return hook('afterFind');
}

/**
 * Shortcut to the Hook decorator that defines a beforeDefine hook
 * @returns {Function}
 */
function beforeDefine() {
  return hook('beforeDefine');
}

/**
 * Shortcut to the Hook decorator that defines a afterDefine hook
 * @returns {Function}
 */
function afterDefine() {
  return hook('afterDefine');
}

/**
 * Shortcut to the Hook decorator that defines a beforeInit hook
 * @returns {Function}
 */
function beforeInit() {
  return hook('beforeInit');
}

/**
 * Shortcut to the Hook decorator that defines a afterInit hook
 * @returns {Function}
 */
function afterInit() {
  return hook('afterInit');
}

function multipleHooks() {
  var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var compositeFunction = void 0;
  return function (target, key, descriptor) {
    actions.forEach(function (action) {
      if (!_lodash2.default.isString(action)) {
        throw new Error('All items passed to multipleHooks must be strings representing hook actions');
      }
      compositeFunction = hook(action)(target, key, descriptor);
    });
    return compositeFunction;
  };
}

function beforePersisted() {
  return multipleHooks(['beforeUpdate', 'beforeCreate', 'beforeBulkCreate', 'beforeBulkUpdate']);
}

function relationship(type, model) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function (target) {
    if (['belongsTo', 'hasOne', 'hasMany', 'belongsToMany'].indexOf(type) === -1) {
      throw new Error('That relation is not supported');
    }
    target._relationships = target._relationships || [];
    target._relationships.push({ type: type, model: model, options: options });
  };
}

function belongsTo(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return relationship('belongsTo', model, options);
}

function hasOne(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return relationship('hasOne', model, options);
}

function hasMany(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return relationship('hasMany', model, options);
}

function belongsToMany(model) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return relationship('belongsToMany', model, options);
}

/**
 * Add an extension onto the model, which will inherit all of the extensions' methods and fields
 * @param {Model} Extension - The Class extended from Model that will be integrated into this Model
 * @returns {Function}
 */
function extend(Extension) {
  return function (target) {
    target._extensions = target._extensions || [];
    var extension = new Extension();
    extension.generateOptions();
    target._extensions.push(extension);
  };
}

/**
 * Decorator to mark a function or property as readOnly (writable = false)
 * @returns {Function}
 */
function option(opt, value) {
  return function (target) {
    target._options = target._options || {};
    target._options[opt] = value;
  };
}

function schema(value) {
  return option('schema', value);
}

function paranoid() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return option('paranoid', value);
}

function bulkify() {
  return function (target, key, descriptor) {
    var bulkedFunction = descriptor.value;
    descriptor.value = function (items) {
      if (!_lodash2.default.isArray(items)) {
        return bulkedFunction(items);
      }
      return items.map(function (item) {
        return bulkedFunction(item);
      });
    };
  };
}

/**
 * Marks a property as being an index and addes it to the _indexes array.
 * @param {object} options - configuration object
 * @returns {Function}
 */
function index() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { noName: false };

  return function (target, key, descriptor) {
    target.constructor._indexes = target.constructor._indexes || [];

    var item = descriptor.initializer();

    // Use the name of the property for the index, unless the noName option is passed.
    if (!options.noName) {
      item.name = key;
    }

    target.constructor._indexes.push(item);

    delete target[key];
    delete descriptor.initializer;
  };
}