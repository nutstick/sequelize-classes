import { describe, it } from 'mocha';
import { expect } from './utils/chai';
import Simple from './resources/simple';

let instance;

describe('Model instances', () => {
  it('should allow an instance to be created', () => {
    instance = new Simple();
    expect(instance.constructor.name).to.equal('Simple');
  });

  it('should have generate options property', () => {
    expect(instance).to.have.property('generateOptions').that.is.a('function');
    instance.generateOptions();
  });

  it('should collect field declarations into the _fields object', () => {
    expect(instance._fields).to.have.property('name').that.is.a('object');
    expect(instance._fields).to.have.property('type').that.is.a('string');
    expect(instance._fields).to.have.property('why').that.is.a('string');
    expect(instance).to.not.have.property('uniqueEmail');
  });

  it('should collect static functions into the _classMethods object', () => {
    expect(instance._classMethods).to.have.property('staticTest').that.is.a('function');
    expect(instance._classMethods).to.not.have.property('nameToLower');
  });

  it('should collect member methods into the _instanceMethods object', () => {
    expect(instance._instanceMethods).to.have.property('test').that.is.a('function');
    expect(instance._instanceMethods).to.not.have.property('nameCantBeType');
  });

  it('should collect getter methods into the _getterMethods object', () => {
    expect(instance._getterMethods).to.have.property('cool').that.is.a('function');
  });

  it('should collect setter methods into the _setterMethods object', () => {
    expect(instance._setterMethods).to.have.property('cool').that.is.a('function');
  });

  it('should modify the declaration of fields with getters', () => {
    expect(instance._fields.name).to.have.property('get').that.is.a('function');
  });

  it('should modify the declaration of fields with setters', () => {
    expect(instance._fields.name).to.have.property('set').that.is.a('function');
  });

  it('should have a scope and a default scope', () => {
    expect(instance._scopes).to.have.property('withoutTest').that.is.a('object');
    expect(instance._defaultScope).to.have.property('type').that.equals('test');
  });

  it('should have a _indexes property', () => {
    expect(instance).to.have.property('_indexes');
    expect(instance._indexes).to.have.length(1);
  });

  it('should have a _validate property', () => {
    expect(instance).to.have.property('_validate').that.is.a('object');
    expect(instance._validate).to.have.property('nameCantBeType').that.is.a('function');
  });

  it('should have a _hooks property', () => {
    expect(instance).to.have.property('_hooks').that.is.a('object');
    expect(instance._hooks).to.have.property('nameToLower_beforeCreate').that.is.a('object');
    expect(instance._hooks).to.have.property('nameToLower_beforeUpdate').that.is.a('object');
    expect(instance._hooks).to.have.property('typeToUpper_beforeCreate').that.is.a('object');
    expect(instance._hooks).to.have.property('typeToUpper_beforeUpdate').that.is.a('object');
    expect(instance._hooks.nameToLower_beforeCreate).to.have.property('fn').that.is.a('function');
    expect(instance._hooks.nameToLower_beforeCreate).to.have.property('action').that.is.a('string');
  });

  describe('@bulkify decorator', () => {
    it('should call function normally when called with scalar argument', () => {
      const scalarResult = Simple.bulkifiedMethod(1);
      expect(scalarResult).to.equal(2);
    });

    const arrayArgument = [1, 2];
    let arrayResult;

    it('should return an array when called with array argument', () => {
      arrayResult = Simple.bulkifiedMethod(arrayArgument);
      expect(arrayResult).to.be.a('array');
      expect(arrayResult).to.have.length(arrayArgument.length);
    });

    it('should apply function to each array item when called with array argument', () => {
      arrayResult.forEach((item, index) => {
        expect(item).to.equal(Simple.bulkifiedMethod(arrayArgument[index]));
      });
    });
  });
});
