/**
 * Applies the mixins to a class, but with class validator constraints.
 */
import { getMetadataStorage } from 'class-validator';

function applyMixinsWithValidators(derivedCtor: any, baseCtors: any[]) {
  const metadata = getMetadataStorage(); // from class-validator

  // Base typescript mixin implementation
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });

  baseCtors.forEach(baseCtor => {
    // Get validation constratints from the mixin
    const constraints = metadata.getTargetValidationMetadatas(baseCtor.prototype.constructor, '', true, true);

    for (const constraint of constraints) {
      // For each constraint on the mixin
      // Clone the constraint, replacing the target with the the derived constructor
      let clone = {
        ...constraint,
        target: derivedCtor.prototype.constructor,
      };
      // Set the prototype of the clone to be a validation metadata object
      clone = Object.setPrototypeOf(clone, Object.getPrototypeOf(constraint));
      // Add the cloned constraint to class-validators metadata storage object
      metadata.addValidationMetadata(clone);
    }
  });
}

export { applyMixinsWithValidators };
