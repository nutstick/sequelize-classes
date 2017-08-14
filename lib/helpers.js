'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getProperties = getProperties;
exports.defineFunctions = defineFunctions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [findFunctions, parseFunction].map(_regenerator2.default.mark);

// Array of method names to ignore/prevent from being added into our models
var ignore = ['constructor', 'Model', 'length', 'name', 'arguments', 'caller', 'prototype'];

/* helpers */

/**
 * Adds getter and/or setter methods to a field definition.
 * @param {String|Object} field - the field declaration
 * @param {Object} method - function descriptor
 * @returns {Object} - Field declaration
 */
function addToDefinition(field, method) {
  var fieldTarget = field;
  if ((typeof field === 'undefined' ? 'undefined' : (0, _typeof3.default)(field)) !== 'object') {
    fieldTarget = { type: field };
  }

  if (method.get) fieldTarget.get = method.get;
  if (method.set) fieldTarget.set = method.set;

  return fieldTarget;
}

/**
 * Gets a array of functions that belong to object.
 * @param {object} object
 * @param {Boolean} isStatic - when true, object is the constructor of the model
 * @returns {Array}
 */
function getFunctions(object) {
  var isStatic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return Object.getOwnPropertyNames(object).map(function (name) {
    return (0, _extends3.default)({}, Object.getOwnPropertyDescriptor(object, name), {
      name: name,
      isStatic: isStatic
    });
  });
}

/**
 * Iterator function that lets us loop through a model's functions
 * @param {object} model - Model instance
 */
function findFunctions(model) {
  var staticFunctions, memberFunctions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, method, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _method, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _result;

  return _regenerator2.default.wrap(function findFunctions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          staticFunctions = getFunctions(model.constructor, true);
          memberFunctions = getFunctions(Object.getPrototypeOf(model));
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 5;
          _iterator = staticFunctions.filter(filterFunction)[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 38;
            break;
          }

          method = _step.value;
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 12;
          _iterator3 = parseFunction(method, model)[Symbol.iterator]();

        case 14:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context.next = 21;
            break;
          }

          result = _step3.value;
          _context.next = 18;
          return result;

        case 18:
          _iteratorNormalCompletion3 = true;
          _context.next = 14;
          break;

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context['catch'](12);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t0;

        case 27:
          _context.prev = 27;
          _context.prev = 28;

          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }

        case 30:
          _context.prev = 30;

          if (!_didIteratorError3) {
            _context.next = 33;
            break;
          }

          throw _iteratorError3;

        case 33:
          return _context.finish(30);

        case 34:
          return _context.finish(27);

        case 35:
          _iteratorNormalCompletion = true;
          _context.next = 7;
          break;

        case 38:
          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t1 = _context['catch'](5);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 44:
          _context.prev = 44;
          _context.prev = 45;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 47:
          _context.prev = 47;

          if (!_didIteratorError) {
            _context.next = 50;
            break;
          }

          throw _iteratorError;

        case 50:
          return _context.finish(47);

        case 51:
          return _context.finish(44);

        case 52:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 55;
          _iterator2 = memberFunctions.filter(filterFunction)[Symbol.iterator]();

        case 57:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 88;
            break;
          }

          _method = _step2.value;
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context.prev = 62;
          _iterator4 = parseFunction(_method, model)[Symbol.iterator]();

        case 64:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context.next = 71;
            break;
          }

          _result = _step4.value;
          _context.next = 68;
          return _result;

        case 68:
          _iteratorNormalCompletion4 = true;
          _context.next = 64;
          break;

        case 71:
          _context.next = 77;
          break;

        case 73:
          _context.prev = 73;
          _context.t2 = _context['catch'](62);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t2;

        case 77:
          _context.prev = 77;
          _context.prev = 78;

          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }

        case 80:
          _context.prev = 80;

          if (!_didIteratorError4) {
            _context.next = 83;
            break;
          }

          throw _iteratorError4;

        case 83:
          return _context.finish(80);

        case 84:
          return _context.finish(77);

        case 85:
          _iteratorNormalCompletion2 = true;
          _context.next = 57;
          break;

        case 88:
          _context.next = 94;
          break;

        case 90:
          _context.prev = 90;
          _context.t3 = _context['catch'](55);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t3;

        case 94:
          _context.prev = 94;
          _context.prev = 95;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 97:
          _context.prev = 97;

          if (!_didIteratorError2) {
            _context.next = 100;
            break;
          }

          throw _iteratorError2;

        case 100:
          return _context.finish(97);

        case 101:
          return _context.finish(94);

        case 102:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[5, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51], [55, 90, 94, 102], [62, 73, 77, 85], [78,, 80, 84], [95,, 97, 101]]);
}

/**
 * Helper function to get field name from a getter or setter name.
 * @param {String} name
 * @returns {String}
 */
function fieldName(name) {
  return name.replace(/^_/, '');
}

/**
 * Helper function to test if a string matches a field in object
 * @param {String} name
 * @param {object} object - object to test
 * @returns {boolean}
 */
function isField(name, object) {
  return name.startsWith('_') && object._fields[fieldName(name)];
}

/**
 * Determines which configuration object to add the function to based on
 * it's descriptor's properties
 * @param {object} method - function descriptor
 * @param {object} model - model instance
 */
function parseFunction(method, model) {
  var field, target;
  return _regenerator2.default.wrap(function parseFunction$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(method.get || method.set)) {
            _context2.next = 12;
            break;
          }

          if (isField(method.name, model)) {
            _context2.next = 10;
            break;
          }

          if (!method.get) {
            _context2.next = 5;
            break;
          }

          _context2.next = 5;
          return ['_getterMethods', method.name, method.get];

        case 5:
          if (!method.set) {
            _context2.next = 8;
            break;
          }

          _context2.next = 8;
          return ['_setterMethods', method.name, method.set];

        case 8:
          _context2.next = 12;
          break;

        case 10:
          field = fieldName(method.name);

          model._fields[field] = addToDefinition(model._fields[field], method);

        case 12:
          target = '_instanceMethods';

          if (method.isStatic === true) {
            target = '_classMethods';
          }
          _context2.next = 16;
          return [target, method.name, method.value];

        case 16:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

/**
 * filter function to filter out functions we aren't interested in.
 * @param {object} method - function descriptor
 * @returns {Boolean}
 */
function filterFunction(method) {
  if (ignore.indexOf(method.name) >= 0) {
    return false;
  }

  if (method.writable && typeof method.value === 'function') {
    return true;
  }

  return method.get && typeof method.get === 'function' || method.set && typeof method.set === 'function';
}

/**
 * Get the properties on the model, loops over Object.keys and thus skips over
 * non-enumerable properties
 * @param {object} model - Model instance
 * @returns {Object}
 */
function getProperties(model) {
  var properties = {};
  Object.keys(model).forEach(function (name) {
    properties[name] = model[name];
  });
  return properties;
}

/**
 * Responsible for looping through all functions on the model and assigning them to
 * the appropriate configuration
 * object
 * @param {object} model - instance of our model
 */
function defineFunctions(model) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = findFunctions(model)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _step5$value = (0, _slicedToArray3.default)(_step5.value, 3),
          target = _step5$value[0],
          name = _step5$value[1],
          method = _step5$value[2];

      // noinspection JSUnusedAssignment
      model[target][name] = method;
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
}