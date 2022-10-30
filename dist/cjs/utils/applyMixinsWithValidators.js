"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMixinsWithValidators = void 0;
/**
 * Applies the mixins to a class, but with class validator constraints.
 */
var class_validator_1 = require("class-validator");
function applyMixinsWithValidators(derivedCtor, baseCtors) {
    var metadata = (0, class_validator_1.getMetadataStorage)(); // from class-validator
    // Base typescript mixin implementation
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
    baseCtors.forEach(function (baseCtor) {
        // Get validation constratints from the mixin
        var constraints = metadata.getTargetValidationMetadatas(baseCtor.prototype.constructor, '', true, true);
        for (var _i = 0, constraints_1 = constraints; _i < constraints_1.length; _i++) {
            var constraint = constraints_1[_i];
            // For each constraint on the mixin
            // Clone the constraint, replacing the target with the the derived constructor
            var clone = __assign(__assign({}, constraint), { target: derivedCtor.prototype.constructor });
            // Set the prototype of the clone to be a validation metadata object
            clone = Object.setPrototypeOf(clone, Object.getPrototypeOf(constraint));
            // Add the cloned constraint to class-validators metadata storage object
            metadata.addValidationMetadata(clone);
        }
    });
}
exports.applyMixinsWithValidators = applyMixinsWithValidators;
//# sourceMappingURL=applyMixinsWithValidators.js.map