'use strict';

define(['chai',
    '../../src/properties',
    '../../src/qlik-show-hide-container'],
    function (chai, properties, container) {
        const expect = chai.expect;

        describe('properties', function () {
            it('should have items', function () {
                expect(properties).to.have.a.property('items');
            });
        });
        describe('container', function () {
            it('should have a controller', function () {
                expect(container).to.have.a.property('controller');
            });
        });
        describe('ShowHideLogic', function () {
            it('should return first visualization where condition is not 0', function () {
                var result = container.getActiveVisID([
                    { condition: '0', conditionalMasterObject: 'one|one' },
                    { condition: '-1', conditionalMasterObject: 'two|two' }]);
                expect(result).to.equal('two');
            });
            it('should return nothing when no condition is not 0', function () {
                var result = container.getActiveVisID([
                    { condition: '0', conditionalMasterObject: 'one|one' },
                    { condition: '0', conditionalMasterObject: 'two|two' }]);
                expect(result).to.be.undefined;
            });
            it('should treat the string "true" as 0 and all others as false', function () {
                var result = container.getActiveVisID([
                    { condition: 'false', conditionalMasterObject: 'one|one' },
                    { condition: 'true', conditionalMasterObject: 'two|two' }]);
                expect(result).to.equal('two');
            });
            it('should ignore visualizations after the first where condition is not 0', function () {
                var result = container.getActiveVisID([
                    { condition: '0', conditionalMasterObject: 'one|one' },
                    { condition: '-1', conditionalMasterObject: 'two|two' },
                    { condition: '-1', conditionalMasterObject: 'three|three' }]);
                expect(result).to.equal('two');
            });
            
        });
    });