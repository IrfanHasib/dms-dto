var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof commonjsGlobal === "object" ? commonjsGlobal :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect$1 || (Reflect$1 = {}));

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator$1(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray$1(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * This metadata contains validation rules.
 */
var ValidationMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationMetadata(args) {
        /**
         * Validation groups used for this validation.
         */
        this.groups = [];
        /**
         * Specifies if validated value is an array and each of its item must be validated.
         */
        this.each = false;
        /*
         * A transient set of data passed through to the validation result for response mapping
         */
        this.context = undefined;
        this.type = args.type;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.message = args.validationOptions.message;
            this.groups = args.validationOptions.groups;
            this.always = args.validationOptions.always;
            this.each = args.validationOptions.each;
            this.context = args.validationOptions.context;
        }
    }
    return ValidationMetadata;
}());

/**
 * Used to transform validation schemas to validation metadatas.
 */
var ValidationSchemaToMetadataTransformer = /** @class */ (function () {
    function ValidationSchemaToMetadataTransformer() {
    }
    ValidationSchemaToMetadataTransformer.prototype.transform = function (schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function (property) {
            schema.properties[property].forEach(function (validation) {
                var validationOptions = {
                    message: validation.message,
                    groups: validation.groups,
                    always: validation.always,
                    each: validation.each,
                };
                var args = {
                    type: validation.type,
                    target: schema.name,
                    propertyName: property,
                    constraints: validation.constraints,
                    validationTypeOptions: validation.options,
                    validationOptions: validationOptions,
                };
                metadatas.push(new ValidationMetadata(args));
            });
        });
        return metadatas;
    };
    return ValidationSchemaToMetadataTransformer;
}());

/**
 * Convert Map, Set to Array
 */
function convertToArray(val) {
    if (val instanceof Map) {
        return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
}

/**
 * This function returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added to
 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
 */
function getGlobal$1() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'window'.
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'window'.
        return window;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'self'.
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'self'.
        return self;
    }
}

// https://github.com/TylorS/typed-is-promise/blob/abf1514e1b6961adfc75765476b0debb96b2c3ae/src/index.ts
function isPromise$1(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}

/**
 * Storage all metadatas.
 */
var MetadataStorage$1 = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Private properties
        // -------------------------------------------------------------------------
        this.validationMetadatas = [];
        this.constraintMetadatas = [];
    }
    Object.defineProperty(MetadataStorage.prototype, "hasValidationMetaData", {
        get: function () {
            return !!this.validationMetadatas.length;
        },
        enumerable: false,
        configurable: true
    });
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationSchema = function (schema) {
        var _this = this;
        var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
        validationMetadatas.forEach(function (validationMetadata) { return _this.addValidationMetadata(validationMetadata); });
    };
    /**
     * Adds a new validation metadata.
     */
    MetadataStorage.prototype.addValidationMetadata = function (metadata) {
        this.validationMetadatas.push(metadata);
    };
    /**
     * Adds a new constraint metadata.
     */
    MetadataStorage.prototype.addConstraintMetadata = function (metadata) {
        this.constraintMetadatas.push(metadata);
    };
    /**
     * Groups metadata by their property names.
     */
    MetadataStorage.prototype.groupByPropertyName = function (metadata) {
        var grouped = {};
        metadata.forEach(function (metadata) {
            if (!grouped[metadata.propertyName])
                grouped[metadata.propertyName] = [];
            grouped[metadata.propertyName].push(metadata);
        });
        return grouped;
    };
    /**
     * Gets all validation metadatas for the given object with the given groups.
     */
    MetadataStorage.prototype.getTargetValidationMetadatas = function (targetConstructor, targetSchema, always, strictGroups, groups) {
        var includeMetadataBecauseOfAlwaysOption = function (metadata) {
            // `metadata.always` overrides global default.
            if (typeof metadata.always !== 'undefined')
                return metadata.always;
            // `metadata.groups` overrides global default.
            if (metadata.groups && metadata.groups.length)
                return false;
            // Use global default.
            return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function (metadata) {
            if (strictGroups) {
                // Validation is not using groups.
                if (!groups || !groups.length) {
                    // `metadata.groups` has at least one group.
                    if (metadata.groups && metadata.groups.length)
                        return true;
                }
            }
            return false;
        };
        // get directly related to a target metadatas
        var originalMetadatas = this.validationMetadatas.filter(function (metadata) {
            if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // get metadatas for inherited classes
        var inheritedMetadatas = this.validationMetadatas.filter(function (metadata) {
            // if target is a string it's means we validate against a schema, and there is no inheritance support for schemas
            if (typeof metadata.target === 'string')
                return false;
            if (metadata.target === targetConstructor)
                return false;
            if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
                return false;
            if (includeMetadataBecauseOfAlwaysOption(metadata))
                return true;
            if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
                return false;
            if (groups && groups.length > 0)
                return metadata.groups && !!metadata.groups.find(function (group) { return groups.indexOf(group) !== -1; });
            return true;
        });
        // filter out duplicate metadatas, prefer original metadatas instead of inherited metadatas
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function (inheritedMetadata) {
            return !originalMetadatas.find(function (originalMetadata) {
                return (originalMetadata.propertyName === inheritedMetadata.propertyName &&
                    originalMetadata.type === inheritedMetadata.type);
            });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
    };
    /**
     * Gets all validator constraints for the given object.
     */
    MetadataStorage.prototype.getTargetValidatorConstraints = function (target) {
        return this.constraintMetadatas.filter(function (metadata) { return metadata.target === target; });
    };
    return MetadataStorage;
}());
/**
 * Gets metadata storage.
 * Metadata storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataStorage() {
    var global = getGlobal$1();
    if (!global.classValidatorMetadataStorage) {
        global.classValidatorMetadataStorage = new MetadataStorage$1();
    }
    return global.classValidatorMetadataStorage;
}

/**
 * Validation error description.
 */
var ValidationError = /** @class */ (function () {
    function ValidationError() {
    }
    /**
     *
     * @param shouldDecorate decorate the message with ANSI formatter escape codes for better readability
     * @param hasParent true when the error is a child of an another one
     * @param parentPath path as string to the parent of this property
     */
    ValidationError.prototype.toString = function (shouldDecorate, hasParent, parentPath) {
        var _this = this;
        if (shouldDecorate === void 0) { shouldDecorate = false; }
        if (hasParent === void 0) { hasParent = false; }
        if (parentPath === void 0) { parentPath = ""; }
        var boldStart = shouldDecorate ? "\u001B[1m" : "";
        var boldEnd = shouldDecorate ? "\u001B[22m" : "";
        var propConstraintFailed = function (propertyName) {
            return " - property ".concat(boldStart).concat(parentPath).concat(propertyName).concat(boldEnd, " has failed the following constraints: ").concat(boldStart).concat(Object.keys(_this.constraints).join(", ")).concat(boldEnd, " \n");
        };
        if (!hasParent) {
            return ("An instance of ".concat(boldStart).concat(this.target ? this.target.constructor.name : 'an object').concat(boldEnd, " has failed the validation:\n") +
                (this.constraints ? propConstraintFailed(this.property) : "") +
                (this.children
                    ? this.children.map(function (childError) { return childError.toString(shouldDecorate, true, _this.property); }).join("")
                    : ""));
        }
        else {
            // we format numbers as array indexes for better readability.
            var formattedProperty_1 = Number.isInteger(+this.property)
                ? "[".concat(this.property, "]")
                : "".concat(parentPath ? "." : "").concat(this.property);
            if (this.constraints) {
                return propConstraintFailed(formattedProperty_1);
            }
            else {
                return this.children
                    ? this.children
                        .map(function (childError) { return childError.toString(shouldDecorate, true, "".concat(parentPath).concat(formattedProperty_1)); })
                        .join("")
                    : "";
            }
        }
    };
    return ValidationError;
}());

/**
 * Validation types.
 */
var ValidationTypes = /** @class */ (function () {
    function ValidationTypes() {
    }
    /**
     * Checks if validation type is valid.
     */
    ValidationTypes.isValid = function (type) {
        var _this = this;
        return (type !== 'isValid' &&
            type !== 'getMessage' &&
            Object.keys(this)
                .map(function (key) { return _this[key]; })
                .indexOf(type) !== -1);
    };
    /* system */
    ValidationTypes.CUSTOM_VALIDATION = 'customValidation'; // done
    ValidationTypes.NESTED_VALIDATION = 'nestedValidation'; // done
    ValidationTypes.PROMISE_VALIDATION = 'promiseValidation'; // done
    ValidationTypes.CONDITIONAL_VALIDATION = 'conditionalValidation'; // done
    ValidationTypes.WHITELIST = 'whitelistValidation'; // done
    ValidationTypes.IS_DEFINED = 'isDefined'; // done
    return ValidationTypes;
}());

/**
 * Convert the constraint to a string to be shown in an error
 */
function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
        return constraint.join(', ');
    }
    return "".concat(constraint);
}
var ValidationUtils = /** @class */ (function () {
    function ValidationUtils() {
    }
    ValidationUtils.replaceMessageSpecialTokens = function (message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
            messageString = message(validationArguments);
        }
        else if (typeof message === 'string') {
            messageString = message;
        }
        if (messageString && Array.isArray(validationArguments.constraints)) {
            validationArguments.constraints.forEach(function (constraint, index) {
                messageString = messageString.replace(new RegExp("\\$constraint".concat(index + 1), 'g'), constraintToString(constraint));
            });
        }
        if (messageString &&
            validationArguments.value !== undefined &&
            validationArguments.value !== null &&
            typeof validationArguments.value === 'string')
            messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
            messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
            messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
    };
    return ValidationUtils;
}());

/**
 * Executes validation over given object.
 */
var ValidationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationExecutor(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.metadataStorage = getMetadataStorage();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.execute = function (object, targetSchema, validationErrors) {
        var _this = this;
        var _a;
        /**
         * If there is no metadata registered it means possibly the dependencies are not flatterned and
         * more than one instance is used.
         *
         * TODO: This needs proper handling, forcing to use the same container or some other proper solution.
         */
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
            console.warn("No metadata found. There is more than once class-validator version installed probably. You need to flatten your dependencies.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : undefined;
        var strictGroups = (this.validatorOptions && this.validatorOptions.strictGroups) || false;
        var always = (this.validatorOptions && this.validatorOptions.always) || false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (this.validatorOptions && this.validatorOptions.forbidUnknownValues && !targetMetadatas.length) {
            var validationError = new ValidationError();
            if (!this.validatorOptions ||
                !this.validatorOptions.validationError ||
                this.validatorOptions.validationError.target === undefined ||
                this.validatorOptions.validationError.target === true)
                validationError.target = object;
            validationError.value = undefined;
            validationError.property = undefined;
            validationError.children = [];
            validationError.constraints = { unknownValue: 'an unknown value was passed to the validate function' };
            validationErrors.push(validationError);
            return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
            this.whitelist(object, groupedMetadatas, validationErrors);
        // General validation
        Object.keys(groupedMetadatas).forEach(function (propertyName) {
            var value = object[propertyName];
            var definedMetadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type === ValidationTypes.IS_DEFINED; });
            var metadatas = groupedMetadatas[propertyName].filter(function (metadata) { return metadata.type !== ValidationTypes.IS_DEFINED && metadata.type !== ValidationTypes.WHITELIST; });
            if (value instanceof Promise &&
                metadatas.find(function (metadata) { return metadata.type === ValidationTypes.PROMISE_VALIDATION; })) {
                _this.awaitingPromises.push(value.then(function (resolvedValue) {
                    _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
                }));
            }
            else {
                _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
            }
        });
    };
    ValidationExecutor.prototype.whitelist = function (object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function (propertyName) {
            // does this property have no metadata?
            if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
                notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
            if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
                // throw errors
                notAllowedProperties.forEach(function (property) {
                    var _a;
                    var validationError = _this.generateValidationError(object, object[property], property);
                    validationError.constraints = (_a = {}, _a[ValidationTypes.WHITELIST] = "property ".concat(property, " should not exist"), _a);
                    validationError.children = undefined;
                    validationErrors.push(validationError);
                });
            }
            else {
                // strip non allowed properties
                notAllowedProperties.forEach(function (property) { return delete object[property]; });
            }
        }
    };
    ValidationExecutor.prototype.stripEmptyErrors = function (errors) {
        var _this = this;
        return errors.filter(function (error) {
            if (error.children) {
                error.children = _this.stripEmptyErrors(error.children);
            }
            if (Object.keys(error.constraints).length === 0) {
                if (error.children.length === 0) {
                    return false;
                }
                else {
                    delete error.constraints;
                }
            }
            return true;
        });
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    ValidationExecutor.prototype.performValidations = function (object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.CUSTOM_VALIDATION; });
        var nestedValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.NESTED_VALIDATION; });
        var conditionalValidationMetadatas = metadatas.filter(function (metadata) { return metadata.type === ValidationTypes.CONDITIONAL_VALIDATION; });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
            return;
        }
        // handle IS_DEFINED validation type the special way - it should work no matter skipUndefinedProperties/skipMissingProperties is set or not
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === undefined && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
            return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
            return;
        }
        if ((value === null || value === undefined) &&
            this.validatorOptions &&
            this.validatorOptions.skipMissingProperties === true) {
            return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError.children);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
    };
    ValidationExecutor.prototype.generateValidationError = function (object, value, propertyName) {
        var validationError = new ValidationError();
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.target === undefined ||
            this.validatorOptions.validationError.target === true)
            validationError.target = object;
        if (!this.validatorOptions ||
            !this.validatorOptions.validationError ||
            this.validatorOptions.validationError.value === undefined ||
            this.validatorOptions.validationError.value === true)
            validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
    };
    ValidationExecutor.prototype.conditionalValidations = function (object, value, metadatas) {
        return metadatas
            .map(function (metadata) { return metadata.constraints[0](object, value); })
            .reduce(function (resultA, resultB) { return resultA && resultB; }, true);
    };
    ValidationExecutor.prototype.customValidations = function (object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function (metadata) {
            _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function (customConstraintMetadata) {
                if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
                    return;
                if (_this.validatorOptions &&
                    _this.validatorOptions.stopAtFirstError &&
                    Object.keys(error.constraints || {}).length > 0)
                    return;
                var validationArguments = {
                    targetName: object.constructor ? object.constructor.name : undefined,
                    property: metadata.propertyName,
                    object: object,
                    value: value,
                    constraints: metadata.constraints,
                };
                if (!metadata.each || !(Array.isArray(value) || value instanceof Set || value instanceof Map)) {
                    var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
                    if (isPromise$1(validatedValue)) {
                        var promise = validatedValue.then(function (isValid) {
                            if (!isValid) {
                                var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                                error.constraints[type] = message;
                                if (metadata.context) {
                                    if (!error.contexts) {
                                        error.contexts = {};
                                    }
                                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                                }
                            }
                        });
                        _this.awaitingPromises.push(promise);
                    }
                    else {
                        if (!validatedValue) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                        }
                    }
                    return;
                }
                // convert set and map into array
                var arrayValue = convertToArray(value);
                // Validation needs to be applied to each array item
                var validatedSubValues = arrayValue.map(function (subValue) {
                    return customConstraintMetadata.instance.validate(subValue, validationArguments);
                });
                var validationIsAsync = validatedSubValues.some(function (validatedSubValue) {
                    return isPromise$1(validatedSubValue);
                });
                if (validationIsAsync) {
                    // Wrap plain values (if any) in promises, so that all are async
                    var asyncValidatedSubValues = validatedSubValues.map(function (validatedSubValue) {
                        return isPromise$1(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
                    });
                    var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function (flatValidatedValues) {
                        var validationResult = flatValidatedValues.every(function (isValid) { return isValid; });
                        if (!validationResult) {
                            var _a = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _a[0], message = _a[1];
                            error.constraints[type] = message;
                            if (metadata.context) {
                                if (!error.contexts) {
                                    error.contexts = {};
                                }
                                error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                            }
                        }
                    });
                    _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
                    return;
                }
                var validationResult = validatedSubValues.every(function (isValid) { return isValid; });
                if (!validationResult) {
                    var _b = _this.createValidationError(object, value, metadata, customConstraintMetadata), type = _b[0], message = _b[1];
                    error.constraints[type] = message;
                }
            });
        });
    };
    ValidationExecutor.prototype.nestedValidations = function (value, metadatas, errors) {
        var _this = this;
        if (value === void 0) {
            return;
        }
        metadatas.forEach(function (metadata) {
            var _a;
            if (metadata.type !== ValidationTypes.NESTED_VALIDATION && metadata.type !== ValidationTypes.PROMISE_VALIDATION) {
                return;
            }
            if (Array.isArray(value) || value instanceof Set || value instanceof Map) {
                // Treats Set as an array - as index of Set value is value itself and it is common case to have Object as value
                var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
                arrayLikeValue.forEach(function (subValue, index) {
                    _this.performValidations(value, subValue, index.toString(), [], metadatas, errors);
                });
            }
            else if (value instanceof Object) {
                var targetSchema = typeof metadata.target === 'string' ? metadata.target : metadata.target.name;
                _this.execute(value, targetSchema, errors);
            }
            else {
                var error = new ValidationError();
                error.value = value;
                error.property = metadata.propertyName;
                error.target = metadata.target;
                var _b = _this.createValidationError(metadata.target, value, metadata), type = _b[0], message = _b[1];
                error.constraints = (_a = {},
                    _a[type] = message,
                    _a);
                errors.push(error);
            }
        });
    };
    ValidationExecutor.prototype.mapContexts = function (object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function (metadata) {
            if (metadata.context) {
                var customConstraint = void 0;
                if (metadata.type === ValidationTypes.CUSTOM_VALIDATION) {
                    var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
                    customConstraint = customConstraints[0];
                }
                var type = _this.getConstraintType(metadata, customConstraint);
                if (error.constraints[type]) {
                    if (!error.contexts) {
                        error.contexts = {};
                    }
                    error.contexts[type] = Object.assign(error.contexts[type] || {}, metadata.context);
                }
            }
        });
    };
    ValidationExecutor.prototype.createValidationError = function (object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : undefined;
        var type = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
            targetName: targetName,
            property: metadata.propertyName,
            object: object,
            value: value,
            constraints: metadata.constraints,
        };
        var message = metadata.message || '';
        if (!metadata.message &&
            (!this.validatorOptions || (this.validatorOptions && !this.validatorOptions.dismissDefaultMessages))) {
            if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
                message = customValidatorMetadata.instance.defaultMessage(validationArguments);
            }
        }
        var messageString = ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
        return [type, messageString];
    };
    ValidationExecutor.prototype.getConstraintType = function (metadata, customValidatorMetadata) {
        var type = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type;
    };
    return ValidationExecutor;
}());

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Validator performs validation of the given object based on its metadata.
 */
var Validator = /** @class */ (function () {
    function Validator() {
    }
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
    };
    /**
     * Performs validation of the given object based on decorators or validation schema and reject on error.
     */
    Validator.prototype.validateOrReject = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
                    case 1:
                        errors = _a.sent();
                        if (errors.length)
                            return [2 /*return*/, Promise.reject(errors)];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs validation of the given object based on decorators or validation schema.
     */
    Validator.prototype.validateSync = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new ValidationExecutor(this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
    };
    // -------------------------------------------------------------------------
    // Private Properties
    // -------------------------------------------------------------------------
    /**
     * Performs validation of the given object based on decorators or validation schema.
     * Common method for `validateOrReject` and `validate` methods.
     */
    Validator.prototype.coreValidate = function (objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === 'string' ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === 'string' ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === 'string' ? objectOrSchemaName : undefined;
        var executor = new ValidationExecutor(this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function () {
            return executor.stripEmptyErrors(validationErrors);
        });
    };
    return Validator;
}());

/**
 * Container to be used by this library for inversion control. If container was not implicitly set then by default
 * container simply creates a new instance of the given class.
 */
var defaultContainer = new (/** @class */ (function () {
    function class_1() {
        this.instances = [];
    }
    class_1.prototype.get = function (someClass) {
        var instance = this.instances.find(function (instance) { return instance.type === someClass; });
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }
        return instance.object;
    };
    return class_1;
}()))();
/**
 * Gets the IOC container used by this library.
 */
function getFromContainer(someClass) {
    return defaultContainer.get(someClass);
}

/**
 * If object has both allowed and not allowed properties a validation error will be thrown.
 */
function Allow(validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: ValidationTypes.WHITELIST,
            target: object.constructor,
            propertyName: propertyName,
            validationOptions: validationOptions,
        };
        getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
}

/**
 * This metadata interface contains information for custom validators.
 */
var ConstraintMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ConstraintMetadata(target, name, async) {
        if (async === void 0) { async = false; }
        this.target = target;
        this.name = name;
        this.async = async;
    }
    Object.defineProperty(ConstraintMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Instance of the target custom validation class which performs validation.
         */
        get: function () {
            return getFromContainer(this.target);
        },
        enumerable: false,
        configurable: true
    });
    return ConstraintMetadata;
}());

/**
 * Registers a custom validation decorator.
 */
function registerDecorator(options) {
    var constraintCls;
    if (options.validator instanceof Function) {
        constraintCls = options.validator;
        var constraintClasses = getFromContainer(MetadataStorage$1).getTargetValidatorConstraints(options.validator);
        if (constraintClasses.length > 1) {
            throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
        }
    }
    else {
        var validator_1 = options.validator;
        constraintCls = /** @class */ (function () {
            function CustomConstraint() {
            }
            CustomConstraint.prototype.validate = function (value, validationArguments) {
                return validator_1.validate(value, validationArguments);
            };
            CustomConstraint.prototype.defaultMessage = function (validationArguments) {
                if (validator_1.defaultMessage) {
                    return validator_1.defaultMessage(validationArguments);
                }
                return '';
            };
            return CustomConstraint;
        }());
        getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
    }
    var validationMetadataArgs = {
        type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
        target: options.target,
        propertyName: options.propertyName,
        validationOptions: options.options,
        constraintCls: constraintCls,
        constraints: options.constraints,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
}

function buildMessage(impl, validationOptions) {
    return function (validationArguments) {
        var eachPrefix = validationOptions && validationOptions.each ? 'each value in ' : '';
        return impl(eachPrefix, validationArguments);
    };
}
function ValidateBy(options, validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
            name: options.name,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: options.constraints,
            validator: options.validator,
        });
    };
}

/**
 * Checks if value is missing and if so, ignores all validators.
 */
function IsOptional(validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: ValidationTypes.CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [
                function (object, value) {
                    return object[propertyName] !== null && object[propertyName] !== undefined;
                },
            ],
            validationOptions: validationOptions,
        };
        getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
}

/**
 * Ignores the other validators on a property when the provided condition function returns false.
 */
function ValidateIf(condition, validationOptions) {
    return function (object, propertyName) {
        var args = {
            type: ValidationTypes.CONDITIONAL_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [condition],
            validationOptions: validationOptions,
        };
        getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
}

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
function ValidateNested(validationOptions) {
    var opts = __assign$1({}, validationOptions);
    var eachPrefix = opts.each ? 'each value in ' : '';
    opts.message = opts.message || eachPrefix + 'nested property $property must be either object or array';
    return function (object, propertyName) {
        var args = {
            type: ValidationTypes.NESTED_VALIDATION,
            target: object.constructor,
            propertyName: propertyName,
            validationOptions: opts,
        };
        getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
}

var assertString_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType = _typeof(input);

    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}

module.exports = exports.default;
module.exports.default = exports.default;
});

unwrapExports(assertString_1);

var merge_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : undefined;

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }

  return obj;
}

module.exports = exports.default;
module.exports.default = exports.default;
});

unwrapExports(merge_1);

var require$$0 = assertString_1;

var require$$3 = merge_1;

var IS_NOT_EMPTY = 'isNotEmpty';
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function isNotEmpty(value) {
    return value !== '' && value !== null && value !== undefined;
}
/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 */
function IsNotEmpty(validationOptions) {
    return ValidateBy({
        name: IS_NOT_EMPTY,
        validator: {
            validate: function (value, args) { return isNotEmpty(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property should not be empty'; }, validationOptions),
        },
    }, validationOptions);
}

var MIN = 'min';
/**
 * Checks if the first number is greater than or equal to the second.
 */
function min(num, min) {
    return typeof num === 'number' && typeof min === 'number' && num >= min;
}
/**
 * Checks if the first number is greater than or equal to the second.
 */
function Min(minValue, validationOptions) {
    return ValidateBy({
        name: MIN,
        constraints: [minValue],
        validator: {
            validate: function (value, args) { return min(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must not be less than $constraint1'; }, validationOptions),
        },
    }, validationOptions);
}

var isByteLength_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isByteLength;

var _assertString = _interopRequireDefault(require$$0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }

  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports.default = exports.default;
});

unwrapExports(isByteLength_1);

var isFQDN_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = _interopRequireDefault(require$$0);

var _merge = _interopRequireDefault(require$$3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false
};

function isFQDN(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_fqdn_options);
  /* Remove the optional trailing dot before checking validity */

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  /* Remove the optional wildcard before checking validity */


  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
    str = str.substring(2);
  }

  var parts = str.split('.');
  var tld = parts[parts.length - 1];

  if (options.require_tld) {
    // disallow fqdns without tld
    if (parts.length < 2) {
      return false;
    }

    if (!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    } // disallow spaces


    if (/\s/.test(tld)) {
      return false;
    }
  } // reject numeric TLDs


  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }

  return parts.every(function (part) {
    if (part.length > 63) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    } // disallow full-width chars


    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    } // disallow parts starting or ending with hyphen


    if (/^-|-$/.test(part)) {
      return false;
    }

    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }

    return true;
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
});

unwrapExports(isFQDN_1);

var isIP_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = _interopRequireDefault(require$$0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */
var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z-.:]{1,})?$');

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  version = String(version);

  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  }

  if (version === '4') {
    if (!IPv4AddressRegExp.test(str)) {
      return false;
    }

    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  }

  if (version === '6') {
    return !!IPv6AddressRegExp.test(str);
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;
});

unwrapExports(isIP_1);

var require$$2$1 = isByteLength_1;

var require$$1 = isFQDN_1;

var require$$2 = isIP_1;

var isEmail_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = _interopRequireDefault(require$$0);

var _merge = _interopRequireDefault(require$$3);

var _isByteLength = _interopRequireDefault(require$$2$1);

var _isFQDN = _interopRequireDefault(require$$1);

var _isIP = _interopRequireDefault(require$$2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: '',
  ignore_max_length: false,
  host_blacklist: []
};
/* eslint-disable max-len */

/* eslint-disable no-control-regex */

var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
var defaultMaxEmailLength = 254;
/* eslint-enable max-len */

/* eslint-enable no-control-regex */

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} display_name
 */

function validateDisplayName(display_name) {
  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1'); // display name with only spaces is not valid

  if (!display_name_without_quotes.trim()) {
    return false;
  } // check whether display name contains illegal character


  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (display_name_without_quotes === display_name) {
      return false;
    } // the quotes in display name must start with character symbol \


    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
}

function isEmail(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(splitNameAddress);

    if (display_email) {
      var display_name = display_email[1]; // Remove display name and angle brackets to get email address
      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)

      str = str.replace(display_name, '').replace(/(^<|>$)/g, ''); // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space

      if (display_name.endsWith(' ')) {
        display_name = display_name.substr(0, display_name.length - 1);
      }

      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }

  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var lower_domain = domain.toLowerCase();

  if (options.host_blacklist.includes(lower_domain)) {
    return false;
  }

  var user = parts.join('@');

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

    var username = user.split('+')[0]; // Dots are not included in gmail length restriction

    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
      min: 6,
      max: 30
    })) {
      return false;
    }

    var _user_parts = username.split('.');

    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }

  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
    max: 64
  }) || !(0, _isByteLength.default)(domain, {
    max: 254
  }))) {
    return false;
  }

  if (!(0, _isFQDN.default)(domain, {
    require_tld: options.require_tld
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!(0, _isIP.default)(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      var noBracketdomain = domain.substr(1, domain.length - 2);

      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
        return false;
      }
    }
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  var user_parts = user.split('.');

  for (var _i = 0; _i < user_parts.length; _i++) {
    if (!pattern.test(user_parts[_i])) {
      return false;
    }
  }

  if (options.blacklisted_chars) {
    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
  }

  return true;
}

module.exports = exports.default;
module.exports.default = exports.default;
});

var isEmailValidator = unwrapExports(isEmail_1);

var IS_EMAIL = 'isEmail';
/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
function isEmail(value, options) {
    return typeof value === 'string' && isEmailValidator(value, options);
}
/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
function IsEmail(options, validationOptions) {
    return ValidateBy({
        name: IS_EMAIL,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isEmail(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be an email'; }, validationOptions),
        },
    }, validationOptions);
}

var isMobilePhone_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobilePhone;
exports.locales = void 0;

var _assertString = _interopRequireDefault(require$$0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var phones = {
  'am-AM': /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-KW': /^(\+?965)[569]\d{7}$/,
  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  'ar-OM': /^((\+|00)968)?(9[1-9])\d{6}$/,
  'ar-PS': /^(\+?970|0)5[6|9](\d{7})$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
  'az-AZ': /^(\+994|0)(5[015]|7[07]|99)\d{7}$/,
  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
  'ca-AD': /^(\+376)?[346]\d{5}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^((\+49|0)[1|3])([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
  'de-CH': /^(\+41|0)([1-9])\d{1,9}$/,
  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
  'dv-MV': /^(\+?960)?(7[2-9]|91|9[3-9])\d{7}$/,
  'el-GR': /^(\+?30|0)?(69\d{8})$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-BM': /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}))/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-GG': /^(\+?44|0)1481\d{6}$/,
  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
  'en-GY': /^(\+592|0)6\d{6}$/,
  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
  'en-KI': /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  'en-MU': /^(\+?230|0)?\d{8}$/,
  'en-NA': /^(\+?264|0)(6|8)\d{7}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
  'en-PK': /^((00|\+)?92|0)3[0-6]\d{8}$/,
  'en-PH': /^(09|\+639)\d{9}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[3689]\d{7}$/,
  'en-SL': /^(\+?232|0)\d{8}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'en-ZW': /^(\+263)[0-9]{9}$/,
  'en-BW': /^(\+?267)?(7[1-8]{1})\d{6}$/,
  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
  'es-CO': /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  'es-CR': /^(\+506)?[2-8]\d{7}$/,
  'es-CU': /^(\+53|0053)?5\d{7}/,
  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
  'es-HN': /^(\+?504)?[9|8]\d{7}$/,
  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
  'es-PE': /^(\+?51)?9\d{8}$/,
  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
  'es-PA': /^(\+?507)\d{7,8}$/,
  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
  'es-SV': /^(\+?503)?[67]\d{7}$/,
  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
  'es-VE': /^(\+?58)?(2|4)\d{9}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-BF': /^(\+226|0)[67]\d{7}$/,
  'fr-CM': /^(\+?237)6[0-9]{8}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
  'fr-PF': /^(\+?689)?8[789]\d{6}$/,
  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  'hu-HU': /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  'ka-GE': /^(\+?995)?(5|79)\d{7}$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'lv-LV': /^(\+?371)2\d{7}$/,
  'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  'mz-MZ': /^(\+?258)?8[234567]\d{7}$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
  'nl-BE': /^(\+?32|0)4\d{8}$/,
  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'pt-AO': /^(\+244)\d{9}$/,
  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'si-LK': /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'sq-AL': /^(\+355|0)6[789]\d{6}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  'tg-TJ': /^(\+?992)?[5][5]\d{7}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'tk-TM': /^(\+993|993|8)\d{8}$/,
  'uk-UA': /^(\+?38|8)?0\d{9}$/,
  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  'vi-VN': /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
  'zh-CN': /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
  'dz-BT': /^(\+?975|0)?(17|16|77|02)\d{6}$/
};
/* eslint-enable max-len */
// aliases

phones['en-CA'] = phones['en-US'];
phones['fr-CA'] = phones['en-CA'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];
phones['zh-MO'] = phones['en-MO'];
phones['ga-IE'] = phones['en-IE'];
phones['fr-CH'] = phones['de-CH'];
phones['it-CH'] = phones['fr-CH'];

function isMobilePhone(str, locale, options) {
  (0, _assertString.default)(str);

  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }

  if (Array.isArray(locale)) {
    return locale.some(function (key) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }

      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str); // alias falsey locale as 'any'
  } else if (!locale || locale === 'any') {
    for (var key in phones) {
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(phones);
exports.locales = locales;
});

var isMobilePhoneValidator = unwrapExports(isMobilePhone_1);
isMobilePhone_1.locales;

var IS_MOBILE_PHONE = 'isMobilePhone';
/**
 * Checks if the string is a mobile phone number (locale is either an array of locales (e.g ['sk-SK', 'sr-RS'])
 * OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY',
 * 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK',
 * 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG',
 * 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'es-CL', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE',
 * 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID',
 * 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
 * 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN',
 * 'zh-HK', 'zh-MO', 'zh-TW']
 * If given value is not a string, then it returns false.
 */
function isMobilePhone(value, locale, options) {
    return typeof value === 'string' && isMobilePhoneValidator(value, locale, options);
}
/**
 * Checks if the string is a mobile phone number (locale is either an array of locales (e.g ['sk-SK', 'sr-RS'])
 * OR one of ['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY',
 * 'bg-BG', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-HK',
 * 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 'en-PK', 'en-RW', 'en-SG', 'en-SL', 'en-UG',
 * 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'es-CL', 'es-CR', 'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-UY', 'et-EE',
 * 'fa-IR', 'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-RE', 'he-IL', 'hu-HU', 'id-ID',
 * 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'pl-PL',
 * 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN',
 * 'zh-HK', 'zh-MO', 'zh-TW']
 * If given value is not a string, then it returns false.
 */
function IsMobilePhone(locale, options, validationOptions) {
    return ValidateBy({
        name: IS_MOBILE_PHONE,
        constraints: [locale, options],
        validator: {
            validate: function (value, args) { return isMobilePhone(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a phone number'; }, validationOptions),
        },
    }, validationOptions);
}

var isLength_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLength;

var _assertString = _interopRequireDefault(require$$0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports.default = exports.default;
});

var isLengthValidator = unwrapExports(isLength_1);

var IS_LENGTH = 'isLength';
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function length(value, min, max) {
    return typeof value === 'string' && isLengthValidator(value, { min: min, max: max });
}
/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function Length(min, max, validationOptions) {
    return ValidateBy({
        name: IS_LENGTH,
        constraints: [min, max],
        validator: {
            validate: function (value, args) { return length(value, args.constraints[0], args.constraints[1]); },
            defaultMessage: buildMessage(function (eachPrefix, args) {
                var isMinLength = args.constraints[0] !== null && args.constraints[0] !== undefined;
                var isMaxLength = args.constraints[1] !== null && args.constraints[1] !== undefined;
                if (isMinLength && (!args.value || args.value.length < args.constraints[0])) {
                    return eachPrefix + '$property must be longer than or equal to $constraint1 characters';
                }
                else if (isMaxLength && args.value.length > args.constraints[1]) {
                    return eachPrefix + '$property must be shorter than or equal to $constraint2 characters';
                }
                return (eachPrefix +
                    '$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters');
            }, validationOptions),
        },
    }, validationOptions);
}

var MIN_LENGTH = 'minLength';
/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function minLength(value, min) {
    return typeof value === 'string' && isLengthValidator(value, { min: min });
}
/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
function MinLength(min, validationOptions) {
    return ValidateBy({
        name: MIN_LENGTH,
        constraints: [min],
        validator: {
            validate: function (value, args) { return minLength(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be longer than or equal to $constraint1 characters'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_BOOLEAN = 'isBoolean';
/**
 * Checks if a given value is a boolean.
 */
function isBoolean(value) {
    return value instanceof Boolean || typeof value === 'boolean';
}
/**
 * Checks if a value is a boolean.
 */
function IsBoolean(validationOptions) {
    return ValidateBy({
        name: IS_BOOLEAN,
        validator: {
            validate: function (value, args) { return isBoolean(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a boolean value'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_DATE = 'isDate';
/**
 * Checks if a given value is a date.
 */
function isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
}
/**
 * Checks if a value is a date.
 */
function IsDate(validationOptions) {
    return ValidateBy({
        name: IS_DATE,
        validator: {
            validate: function (value, args) { return isDate(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a Date instance'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_NUMBER = 'isNumber';
/**
 * Checks if a given value is a number.
 */
function isNumber(value, options) {
    if (options === void 0) { options = {}; }
    if (typeof value !== 'number') {
        return false;
    }
    if (value === Infinity || value === -Infinity) {
        return options.allowInfinity;
    }
    if (Number.isNaN(value)) {
        return options.allowNaN;
    }
    if (options.maxDecimalPlaces !== undefined) {
        var decimalPlaces = 0;
        if (value % 1 !== 0) {
            decimalPlaces = value.toString().split('.')[1].length;
        }
        if (decimalPlaces > options.maxDecimalPlaces) {
            return false;
        }
    }
    return Number.isFinite(value);
}
/**
 * Checks if a value is a number.
 */
function IsNumber(options, validationOptions) {
    if (options === void 0) { options = {}; }
    return ValidateBy({
        name: IS_NUMBER,
        constraints: [options],
        validator: {
            validate: function (value, args) { return isNumber(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a number conforming to the specified constraints'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_ENUM = 'isEnum';
/**
 * Checks if a given value is an enum
 */
function isEnum(value, entity) {
    var enumValues = Object.keys(entity).map(function (k) { return entity[k]; });
    return enumValues.indexOf(value) >= 0;
}
/**
 * Checks if a given value is an enum
 */
function IsEnum(entity, validationOptions) {
    return ValidateBy({
        name: IS_ENUM,
        constraints: [entity],
        validator: {
            validate: function (value, args) { return isEnum(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a valid enum value'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_INT = 'isInt';
/**
 * Checks if value is an integer.
 */
function isInt(val) {
    return typeof val === 'number' && Number.isInteger(val);
}
/**
 * Checks if value is an integer.
 */
function IsInt(validationOptions) {
    return ValidateBy({
        name: IS_INT,
        validator: {
            validate: function (value, args) { return isInt(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be an integer number'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_STRING = 'isString';
/**
 * Checks if a given value is a real string.
 */
function isString(value) {
    return value instanceof String || typeof value === 'string';
}
/**
 * Checks if a given value is a real string.
 */
function IsString(validationOptions) {
    return ValidateBy({
        name: IS_STRING,
        validator: {
            validate: function (value, args) { return isString(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be a string'; }, validationOptions),
        },
    }, validationOptions);
}

var IS_ARRAY = 'isArray';
/**
 * Checks if a given value is an array
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * Checks if a given value is an array
 */
function IsArray(validationOptions) {
    return ValidateBy({
        name: IS_ARRAY,
        validator: {
            validate: function (value, args) { return isArray(value); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must be an array'; }, validationOptions),
        },
    }, validationOptions);
}

var ARRAY_MIN_SIZE = 'arrayMinSize';
/**
 * Checks if the array's length is greater than or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function arrayMinSize(array, min) {
    return Array.isArray(array) && array.length >= min;
}
/**
 * Checks if the array's length is greater than or equal to the specified number.
 * If null or undefined is given then this function returns false.
 */
function ArrayMinSize(min, validationOptions) {
    return ValidateBy({
        name: ARRAY_MIN_SIZE,
        constraints: [min],
        validator: {
            validate: function (value, args) { return arrayMinSize(value, args.constraints[0]); },
            defaultMessage: buildMessage(function (eachPrefix) { return eachPrefix + '$property must contain at least $constraint1 elements'; }, validationOptions),
        },
    }, validationOptions);
}

/**
 * Validates given object by object's decorators or given validation schema.
 */
function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === 'string') {
        return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    }
    else {
        return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions);
    }
}

var TransformationType;
(function (TransformationType) {
    TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
})(TransformationType || (TransformationType = {}));

/**
 * Storage all library metadata.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this._typeMetadatas = new Map();
        this._transformMetadatas = new Map();
        this._exposeMetadatas = new Map();
        this._excludeMetadatas = new Map();
        this._ancestorsMap = new Map();
    }
    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.addTypeMetadata = function (metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
            this._typeMetadatas.set(metadata.target, new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage.prototype.addTransformMetadata = function (metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
            this._transformMetadatas.set(metadata.target, new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
            this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
    };
    MetadataStorage.prototype.addExposeMetadata = function (metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
            this._exposeMetadatas.set(metadata.target, new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
            this._excludeMetadatas.set(metadata.target, new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === TransformationType.CLASS_TO_CLASS ||
                    transformationType === TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        });
    };
    MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
        return this.getExposedMetadatas(target).find(function (metadata) {
            return metadata.options && metadata.options.name === name;
        });
    };
    MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.getStrategy = function (target) {
        var excludeMap = this._excludeMetadatas.get(target);
        var exclude = excludeMap && excludeMap.get(undefined);
        var exposeMap = this._exposeMetadatas.get(target);
        var expose = exposeMap && exposeMap.get(undefined);
        if ((exclude && expose) || (!exclude && !expose))
            return 'none';
        return exclude ? 'excludeAll' : 'exposeAll';
    };
    MetadataStorage.prototype.getExposedMetadatas = function (target) {
        return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage.prototype.getExcludedMetadatas = function (target) {
        return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
        return this.getExposedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === TransformationType.CLASS_TO_CLASS ||
                    transformationType === TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
        return this.getExcludedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return (transformationType === TransformationType.CLASS_TO_CLASS ||
                    transformationType === TransformationType.PLAIN_TO_CLASS);
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.clear = function () {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.getMetadata = function (metadatas, target) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
            metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
        }
        var metadataFromAncestors = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
            var ancestor = _a[_i];
            var ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
                metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
            }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
    };
    MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
            var metadataFromTarget = metadataFromTargetMap.get(propertyName);
            if (metadataFromTarget) {
                return metadataFromTarget;
            }
        }
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
            var ancestor = _a[_i];
            var ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                var ancestorResult = ancestorMetadataMap.get(propertyName);
                if (ancestorResult) {
                    return ancestorResult;
                }
            }
        }
        return undefined;
    };
    MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
            metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        var metadataFromAncestorsTarget = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
            var ancestor = _a[_i];
            var ancestorMetadataMap = metadatas.get(ancestor);
            if (ancestorMetadataMap) {
                if (ancestorMetadataMap.has(propertyName)) {
                    metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
                }
            }
        }
        return metadataFromAncestorsTarget
            .slice()
            .reverse()
            .concat((metadataFromTarget || []).slice().reverse());
    };
    MetadataStorage.prototype.getAncestors = function (target) {
        if (!target)
            return [];
        if (!this._ancestorsMap.has(target)) {
            var ancestors = [];
            for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== 'undefined'; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
                ancestors.push(baseClass);
            }
            this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
    };
    return MetadataStorage;
}());

/**
 * Default metadata storage is used as singleton and can be used to storage all metadatas.
 */
var defaultMetadataStorage = new MetadataStorage();

/**
 * This function returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added to
 * Node.js in version 12. We need to include this snippet until Node 12 EOL.
 */
function getGlobal() {
    if (typeof globalThis !== 'undefined') {
        return globalThis;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'window'.
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'window'.
        return window;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Cannot find name 'self'.
    if (typeof self !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Cannot find name 'self'.
        return self;
    }
}

function isPromise(p) {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}

var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function instantiateArrayType(arrayType) {
    var array = new arrayType();
    if (!(array instanceof Set) && !('push' in array)) {
        return [];
    }
    return array;
}
var TransformOperationExecutor = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function TransformOperationExecutor(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        // -------------------------------------------------------------------------
        // Private Properties
        // -------------------------------------------------------------------------
        this.recursionStack = new Set();
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    TransformOperationExecutor.prototype.transform = function (source, value, targetType, arrayType, isMap, level) {
        var _this = this;
        if (level === void 0) { level = 0; }
        if (Array.isArray(value) || value instanceof Set) {
            var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS
                ? instantiateArrayType(arrayType)
                : [];
            value.forEach(function (subValue, index) {
                var subSource = source ? source[index] : undefined;
                if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
                    var realTargetType = void 0;
                    if (typeof targetType !== 'function' &&
                        targetType &&
                        targetType.options &&
                        targetType.options.discriminator &&
                        targetType.options.discriminator.property &&
                        targetType.options.discriminator.subTypes) {
                        if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                            realTargetType = targetType.options.discriminator.subTypes.find(function (subType) {
                                return subType.name === subValue[targetType.options.discriminator.property];
                            });
                            var options = { newObject: newValue_1, object: subValue, property: undefined };
                            var newType = targetType.typeFunction(options);
                            realTargetType === undefined ? (realTargetType = newType) : (realTargetType = realTargetType.value);
                            if (!targetType.options.keepDiscriminatorProperty)
                                delete subValue[targetType.options.discriminator.property];
                        }
                        if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                            realTargetType = subValue.constructor;
                        }
                        if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                            subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                        }
                    }
                    else {
                        realTargetType = targetType;
                    }
                    var value_1 = _this.transform(subSource, subValue, realTargetType, undefined, subValue instanceof Map, level + 1);
                    if (newValue_1 instanceof Set) {
                        newValue_1.add(value_1);
                    }
                    else {
                        newValue_1.push(value_1);
                    }
                }
                else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                    if (newValue_1 instanceof Set) {
                        newValue_1.add(subValue);
                    }
                    else {
                        newValue_1.push(subValue);
                    }
                }
            });
            return newValue_1;
        }
        else if (targetType === String && !isMap) {
            if (value === null || value === undefined)
                return value;
            return String(value);
        }
        else if (targetType === Number && !isMap) {
            if (value === null || value === undefined)
                return value;
            return Number(value);
        }
        else if (targetType === Boolean && !isMap) {
            if (value === null || value === undefined)
                return value;
            return Boolean(value);
        }
        else if ((targetType === Date || value instanceof Date) && !isMap) {
            if (value instanceof Date) {
                return new Date(value.valueOf());
            }
            if (value === null || value === undefined)
                return value;
            return new Date(value);
        }
        else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap) {
            if (value === null || value === undefined)
                return value;
            return Buffer.from(value);
        }
        else if (isPromise(value) && !isMap) {
            return new Promise(function (resolve, reject) {
                value.then(function (data) { return resolve(_this.transform(undefined, data, targetType, undefined, undefined, level + 1)); }, reject);
            });
        }
        else if (!isMap && value !== null && typeof value === 'object' && typeof value.then === 'function') {
            // Note: We should not enter this, as promise has been handled above
            // This option simply returns the Promise preventing a JS error from happening and should be an inaccessible path.
            return value; // skip promise transformation
        }
        else if (typeof value === 'object' && value !== null) {
            // try to guess the type
            if (!targetType && value.constructor !== Object /* && TransformationType === TransformationType.CLASS_TO_PLAIN*/)
                if (!Array.isArray(value) && value.constructor === Array) ;
                else {
                    // We are good we can use the built-in constructor
                    targetType = value.constructor;
                }
            if (!targetType && source)
                targetType = source.constructor;
            if (this.options.enableCircularCheck) {
                // add transformed type to prevent circular references
                this.recursionStack.add(value);
            }
            var keys = this.getKeys(targetType, value, isMap);
            var newValue = source ? source : {};
            if (!source &&
                (this.transformationType === TransformationType.PLAIN_TO_CLASS ||
                    this.transformationType === TransformationType.CLASS_TO_CLASS)) {
                if (isMap) {
                    newValue = new Map();
                }
                else if (targetType) {
                    newValue = new targetType();
                }
                else {
                    newValue = {};
                }
            }
            var _loop_1 = function (key) {
                if (key === '__proto__' || key === 'constructor') {
                    return "continue";
                }
                var valueKey = key;
                var newValueKey = key, propertyName = key;
                if (!this_1.options.ignoreDecorators && targetType) {
                    if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                        var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                        if (exposeMetadata) {
                            propertyName = exposeMetadata.propertyName;
                            newValueKey = exposeMetadata.propertyName;
                        }
                    }
                    else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN ||
                        this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                        var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key);
                        if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                            newValueKey = exposeMetadata.options.name;
                        }
                    }
                }
                // get a subvalue
                var subValue = undefined;
                if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                    /**
                     * This section is added for the following report:
                     * https://github.com/typestack/class-transformer/issues/596
                     *
                     * We should not call functions or constructors when transforming to class.
                     */
                    subValue = value[valueKey];
                }
                else {
                    if (value instanceof Map) {
                        subValue = value.get(valueKey);
                    }
                    else if (value[valueKey] instanceof Function) {
                        subValue = value[valueKey]();
                    }
                    else {
                        subValue = value[valueKey];
                    }
                }
                // determine a type
                var type = undefined, isSubValueMap = subValue instanceof Map;
                if (targetType && isMap) {
                    type = targetType;
                }
                else if (targetType) {
                    var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
                    if (metadata_1) {
                        var options = { newObject: newValue, object: value, property: propertyName };
                        var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
                        if (metadata_1.options &&
                            metadata_1.options.discriminator &&
                            metadata_1.options.discriminator.property &&
                            metadata_1.options.discriminator.subTypes) {
                            if (!(value[valueKey] instanceof Array)) {
                                if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                    type = metadata_1.options.discriminator.subTypes.find(function (subType) {
                                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                                            return subType.name === subValue[metadata_1.options.discriminator.property];
                                        }
                                    });
                                    type === undefined ? (type = newType) : (type = type.value);
                                    if (!metadata_1.options.keepDiscriminatorProperty) {
                                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                                            delete subValue[metadata_1.options.discriminator.property];
                                        }
                                    }
                                }
                                if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                                    type = subValue.constructor;
                                }
                                if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                    if (subValue) {
                                        subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                                    }
                                }
                            }
                            else {
                                type = metadata_1;
                            }
                        }
                        else {
                            type = newType;
                        }
                        isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
                    }
                    else if (this_1.options.targetMaps) {
                        // try to find a type in target maps
                        this_1.options.targetMaps
                            .filter(function (map) { return map.target === targetType && !!map.properties[propertyName]; })
                            .forEach(function (map) { return (type = map.properties[propertyName]); });
                    }
                    else if (this_1.options.enableImplicitConversion &&
                        this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                        // if we have no registererd type via the @Type() decorator then we check if we have any
                        // type declarations in reflect-metadata (type declaration is emited only if some decorator is added to the property.)
                        var reflectedType = Reflect.getMetadata('design:type', targetType.prototype, propertyName);
                        if (reflectedType) {
                            type = reflectedType;
                        }
                    }
                }
                // if value is an array try to get its custom array type
                var arrayType_1 = Array.isArray(value[valueKey])
                    ? this_1.getReflectedType(targetType, propertyName)
                    : undefined;
                // const subValueKey = TransformationType === TransformationType.PLAIN_TO_CLASS && newKeyName ? newKeyName : key;
                var subSource = source ? source[valueKey] : undefined;
                // if its deserialization then type if required
                // if we uncomment this types like string[] will not work
                // if (this.transformationType === TransformationType.PLAIN_TO_CLASS && !type && subValue instanceof Object && !(subValue instanceof Date))
                //     throw new Error(`Cannot determine type for ${(targetType as any).name }.${propertyName}, did you forget to specify a @Type?`);
                // if newValue is a source object that has method that match newKeyName then skip it
                if (newValue.constructor.prototype) {
                    var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
                    if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS ||
                        this_1.transformationType === TransformationType.CLASS_TO_CLASS) &&
                        // eslint-disable-next-line @typescript-eslint/unbound-method
                        ((descriptor && !descriptor.set) || newValue[newValueKey] instanceof Function))
                        return "continue";
                }
                if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
                    var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
                    var finalValue = void 0;
                    if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                        // Get original value
                        finalValue = value[transformKey];
                        // Apply custom transformation
                        finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                        // If nothing change, it means no custom transformation was applied, so use the subValue.
                        finalValue = value[transformKey] === finalValue ? subValue : finalValue;
                        // Apply the default transformation
                        finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
                    }
                    else {
                        if (subValue === undefined && this_1.options.exposeDefaultValues) {
                            // Set default value if nothing provided
                            finalValue = newValue[newValueKey];
                        }
                        else {
                            finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                            finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                        }
                    }
                    if (finalValue !== undefined || this_1.options.exposeUnsetFields) {
                        if (newValue instanceof Map) {
                            newValue.set(newValueKey, finalValue);
                        }
                        else {
                            newValue[newValueKey] = finalValue;
                        }
                    }
                }
                else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                    var finalValue = subValue;
                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, key, value, this_1.transformationType);
                    if (finalValue !== undefined || this_1.options.exposeUnsetFields) {
                        if (newValue instanceof Map) {
                            newValue.set(newValueKey, finalValue);
                        }
                        else {
                            newValue[newValueKey] = finalValue;
                        }
                    }
                }
            };
            var this_1 = this;
            // traverse over keys
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                _loop_1(key);
            }
            if (this.options.enableCircularCheck) {
                this.recursionStack.delete(value);
            }
            return newValue;
        }
        else {
            return value;
        }
    };
    TransformOperationExecutor.prototype.applyCustomTransformations = function (value, target, key, obj, transformationType) {
        var _this = this;
        var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        // apply versioning options
        if (this.options.version !== undefined) {
            metadatas = metadatas.filter(function (metadata) {
                if (!metadata.options)
                    return true;
                return _this.checkVersion(metadata.options.since, metadata.options.until);
            });
        }
        // apply grouping options
        if (this.options.groups && this.options.groups.length) {
            metadatas = metadatas.filter(function (metadata) {
                if (!metadata.options)
                    return true;
                return _this.checkGroups(metadata.options.groups);
            });
        }
        else {
            metadatas = metadatas.filter(function (metadata) {
                return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
            });
        }
        metadatas.forEach(function (metadata) {
            value = metadata.transformFn({ value: value, key: key, obj: obj, type: transformationType, options: _this.options });
        });
        return value;
    };
    // preventing circular references
    TransformOperationExecutor.prototype.isCircular = function (object) {
        return this.recursionStack.has(object);
    };
    TransformOperationExecutor.prototype.getReflectedType = function (target, propertyName) {
        if (!target)
            return undefined;
        var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : undefined;
    };
    TransformOperationExecutor.prototype.getKeys = function (target, object, isMap) {
        var _this = this;
        // determine exclusion strategy
        var strategy = defaultMetadataStorage.getStrategy(target);
        if (strategy === 'none')
            strategy = this.options.strategy || 'exposeAll'; // exposeAll is default strategy
        // get all keys that need to expose
        var keys = [];
        if (strategy === 'exposeAll' || isMap) {
            if (object instanceof Map) {
                keys = Array.from(object.keys());
            }
            else {
                keys = Object.keys(object);
            }
        }
        if (isMap) {
            // expose & exclude do not apply for map keys only to fields
            return keys;
        }
        /**
         * If decorators are ignored but we don't want the extraneous values, then we use the
         * metadata to decide which property is needed, but doesn't apply the decorator effect.
         */
        if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
            var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
            var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
            keys = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
        }
        if (!this.options.ignoreDecorators && target) {
            // add all exposed to list of keys
            var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
            if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                exposedProperties = exposedProperties.map(function (key) {
                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
                    if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                        return exposeMetadata.options.name;
                    }
                    return key;
                });
            }
            if (this.options.excludeExtraneousValues) {
                keys = exposedProperties;
            }
            else {
                keys = keys.concat(exposedProperties);
            }
            // exclude excluded properties
            var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
            if (excludedProperties_1.length > 0) {
                keys = keys.filter(function (key) {
                    return !excludedProperties_1.includes(key);
                });
            }
            // apply versioning options
            if (this.options.version !== undefined) {
                keys = keys.filter(function (key) {
                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
                    if (!exposeMetadata || !exposeMetadata.options)
                        return true;
                    return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
                });
            }
            // apply grouping options
            if (this.options.groups && this.options.groups.length) {
                keys = keys.filter(function (key) {
                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
                    if (!exposeMetadata || !exposeMetadata.options)
                        return true;
                    return _this.checkGroups(exposeMetadata.options.groups);
                });
            }
            else {
                keys = keys.filter(function (key) {
                    var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
                    return (!exposeMetadata ||
                        !exposeMetadata.options ||
                        !exposeMetadata.options.groups ||
                        !exposeMetadata.options.groups.length);
                });
            }
        }
        // exclude prefixed properties
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
            keys = keys.filter(function (key) {
                return _this.options.excludePrefixes.every(function (prefix) {
                    return key.substr(0, prefix.length) !== prefix;
                });
            });
        }
        // make sure we have unique keys
        keys = keys.filter(function (key, index, self) {
            return self.indexOf(key) === index;
        });
        return keys;
    };
    TransformOperationExecutor.prototype.checkVersion = function (since, until) {
        var decision = true;
        if (decision && since)
            decision = this.options.version >= since;
        if (decision && until)
            decision = this.options.version < until;
        return decision;
    };
    TransformOperationExecutor.prototype.checkGroups = function (groups) {
        if (!groups)
            return true;
        return this.options.groups.some(function (optionGroup) { return groups.includes(optionGroup); });
    };
    return TransformOperationExecutor;
}());

/**
 * These are the default options used by any transformation operation.
 */
var defaultOptions = {
    enableCircularCheck: false,
    enableImplicitConversion: false,
    excludeExtraneousValues: false,
    excludePrefixes: undefined,
    exposeDefaultValues: false,
    exposeUnsetFields: true,
    groups: undefined,
    ignoreDecorators: false,
    strategy: undefined,
    targetMaps: undefined,
    version: undefined,
};

var __assign = (undefined && undefined.__assign) || function () {
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
var ClassTransformer = /** @class */ (function () {
    function ClassTransformer() {
    }
    ClassTransformer.prototype.instanceToPlain = function (object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.classToPlainFromExist = function (object, plainObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(plainObject, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.plainToInstance = function (cls, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(undefined, plain, cls, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.plainToClassFromExist = function (clsObject, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(clsObject, plain, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.instanceToInstance = function (object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.classToClassFromExist = function (object, fromObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(fromObject, object, undefined, undefined, undefined, undefined);
    };
    ClassTransformer.prototype.serialize = function (object, options) {
        return JSON.stringify(this.instanceToPlain(object, options));
    };
    /**
     * Deserializes given JSON string to a object of the given class.
     */
    ClassTransformer.prototype.deserialize = function (cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
    };
    /**
     * Deserializes given JSON string to an array of objects of the given class.
     */
    ClassTransformer.prototype.deserializeArray = function (cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
    };
    return ClassTransformer;
}());

/**
 * Marks the given class or property as included. By default the property is included in both
 * constructorToPlain and plainToConstructor transformations. It can be limited to only one direction
 * via using the `toPlainOnly` or `toClassOnly` option.
 *
 * Can be applied to class definitions and properties.
 */
function Expose(options) {
    if (options === void 0) { options = {}; }
    /**
     * NOTE: The `propertyName` property must be marked as optional because
     * this decorator used both as a class and a property decorator and the
     * Typescript compiler will freak out if we make it mandatory as a class
     * decorator only receives one parameter.
     */
    return function (object, propertyName) {
        defaultMetadataStorage.addExposeMetadata({
            target: object instanceof Function ? object : object.constructor,
            propertyName: propertyName,
            options: options,
        });
    };
}

/**
 * Defines a custom logic for value transformation.
 *
 * Can be applied to properties only.
 */
function Transform(transformFn, options) {
    if (options === void 0) { options = {}; }
    return function (target, propertyName) {
        defaultMetadataStorage.addTransformMetadata({
            target: target.constructor,
            propertyName: propertyName,
            transformFn: transformFn,
            options: options,
        });
    };
}

/**
 * Specifies a type of the property.
 * The given TypeFunction can return a constructor. A discriminator can be given in the options.
 *
 * Can be applied to properties only.
 */
function Type(typeFunction, options) {
    if (options === void 0) { options = {}; }
    return function (target, propertyName) {
        var reflectedType = Reflect.getMetadata('design:type', target, propertyName);
        defaultMetadataStorage.addTypeMetadata({
            target: target.constructor,
            propertyName: propertyName,
            reflectedType: reflectedType,
            typeFunction: typeFunction,
            options: options,
        });
    };
}

var classTransformer = new ClassTransformer();
function plainToInstance(cls, plain, options) {
    return classTransformer.plainToInstance(cls, plain, options);
}

/**
 * Utility function that works like `Object.apply`, but copies getters and setters properly as well.  Additionally gives
 * the option to exclude properties by name.
 */
const copyProps = (dest, src, exclude = []) => {
    const props = Object.getOwnPropertyDescriptors(src);
    for (let prop of exclude)
        delete props[prop];
    Object.defineProperties(dest, props);
};
/**
 * Returns the full chain of prototypes up until Object.prototype given a starting object.  The order of prototypes will
 * be closest to farthest in the chain.
 */
const protoChain = (obj, currentChain = [obj]) => {
    const proto = Object.getPrototypeOf(obj);
    if (proto === null)
        return currentChain;
    return protoChain(proto, [...currentChain, proto]);
};
/**
 * Identifies the nearest ancestor common to all the given objects in their prototype chains.  For most unrelated
 * objects, this function should return Object.prototype.
 */
const nearestCommonProto = (...objs) => {
    if (objs.length === 0)
        return undefined;
    let commonProto = undefined;
    const protoChains = objs.map(obj => protoChain(obj));
    while (protoChains.every(protoChain => protoChain.length > 0)) {
        const protos = protoChains.map(protoChain => protoChain.pop());
        const potentialCommonProto = protos[0];
        if (protos.every(proto => proto === potentialCommonProto))
            commonProto = potentialCommonProto;
        else
            break;
    }
    return commonProto;
};
/**
 * Creates a new prototype object that is a mixture of the given prototypes.  The mixing is achieved by first
 * identifying the nearest common ancestor and using it as the prototype for a new object.  Then all properties/methods
 * downstream of this prototype (ONLY downstream) are copied into the new object.
 *
 * The resulting prototype is more performant than softMixProtos(...), as well as ES5 compatible.  However, it's not as
 * flexible as updates to the source prototypes aren't captured by the mixed result.  See softMixProtos for why you may
 * want to use that instead.
 */
const hardMixProtos = (ingredients, constructor, exclude = []) => {
    var _a;
    const base = (_a = nearestCommonProto(...ingredients)) !== null && _a !== void 0 ? _a : Object.prototype;
    const mixedProto = Object.create(base);
    // Keeps track of prototypes we've already visited to avoid copying the same properties multiple times.  We init the
    // list with the proto chain below the nearest common ancestor because we don't want any of those methods mixed in
    // when they will already be accessible via prototype access.
    const visitedProtos = protoChain(base);
    for (let prototype of ingredients) {
        let protos = protoChain(prototype);
        // Apply the prototype chain in reverse order so that old methods don't override newer ones.
        for (let i = protos.length - 1; i >= 0; i--) {
            let newProto = protos[i];
            if (visitedProtos.indexOf(newProto) === -1) {
                copyProps(mixedProto, newProto, ['constructor', ...exclude]);
                visitedProtos.push(newProto);
            }
        }
    }
    mixedProto.constructor = constructor;
    return mixedProto;
};
const unique = (arr) => arr.filter((e, i) => arr.indexOf(e) == i);

// Keeps track of constituent classes for every mixin class created by ts-mixer.
const mixins = new Map();
const getMixinsForClass = (clazz) => mixins.get(clazz);
const registerMixins = (mixedClass, constituents) => mixins.set(mixedClass, constituents);

const mergeObjectsOfDecorators = (o1, o2) => {
    var _a, _b;
    const allKeys = unique([...Object.getOwnPropertyNames(o1), ...Object.getOwnPropertyNames(o2)]);
    const mergedObject = {};
    for (let key of allKeys)
        mergedObject[key] = unique([...((_a = o1 === null || o1 === void 0 ? void 0 : o1[key]) !== null && _a !== void 0 ? _a : []), ...((_b = o2 === null || o2 === void 0 ? void 0 : o2[key]) !== null && _b !== void 0 ? _b : [])]);
    return mergedObject;
};
const mergePropertyAndMethodDecorators = (d1, d2) => {
    var _a, _b, _c, _d;
    return ({
        property: mergeObjectsOfDecorators((_a = d1 === null || d1 === void 0 ? void 0 : d1.property) !== null && _a !== void 0 ? _a : {}, (_b = d2 === null || d2 === void 0 ? void 0 : d2.property) !== null && _b !== void 0 ? _b : {}),
        method: mergeObjectsOfDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.method) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.method) !== null && _d !== void 0 ? _d : {}),
    });
};
const mergeDecorators = (d1, d2) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        class: unique([...(_a = d1 === null || d1 === void 0 ? void 0 : d1.class) !== null && _a !== void 0 ? _a : [], ...(_b = d2 === null || d2 === void 0 ? void 0 : d2.class) !== null && _b !== void 0 ? _b : []]),
        static: mergePropertyAndMethodDecorators((_c = d1 === null || d1 === void 0 ? void 0 : d1.static) !== null && _c !== void 0 ? _c : {}, (_d = d2 === null || d2 === void 0 ? void 0 : d2.static) !== null && _d !== void 0 ? _d : {}),
        instance: mergePropertyAndMethodDecorators((_e = d1 === null || d1 === void 0 ? void 0 : d1.instance) !== null && _e !== void 0 ? _e : {}, (_f = d2 === null || d2 === void 0 ? void 0 : d2.instance) !== null && _f !== void 0 ? _f : {}),
    });
};
const decorators = new Map();
const findAllConstituentClasses = (...classes) => {
    var _a;
    const allClasses = new Set();
    const frontier = new Set([...classes]);
    while (frontier.size > 0) {
        for (let clazz of frontier) {
            const protoChainClasses = protoChain(clazz.prototype).map(proto => proto.constructor);
            const mixinClasses = (_a = getMixinsForClass(clazz)) !== null && _a !== void 0 ? _a : [];
            const potentiallyNewClasses = [...protoChainClasses, ...mixinClasses];
            const newClasses = potentiallyNewClasses.filter(c => !allClasses.has(c));
            for (let newClass of newClasses)
                frontier.add(newClass);
            allClasses.add(clazz);
            frontier.delete(clazz);
        }
    }
    return [...allClasses];
};
const deepDecoratorSearch = (...classes) => {
    const decoratorsForClassChain = findAllConstituentClasses(...classes)
        .map(clazz => decorators.get(clazz))
        .filter(decorators => !!decorators);
    if (decoratorsForClassChain.length == 0)
        return {};
    if (decoratorsForClassChain.length == 1)
        return decoratorsForClassChain[0];
    return decoratorsForClassChain.reduce((d1, d2) => mergeDecorators(d1, d2));
};
const getDecoratorsForClass = (clazz) => {
    let decoratorsForClass = decorators.get(clazz);
    if (!decoratorsForClass) {
        decoratorsForClass = {};
        decorators.set(clazz, decoratorsForClass);
    }
    return decoratorsForClass;
};
const decorateClass = (decorator) => ((clazz) => {
    const decoratorsForClass = getDecoratorsForClass(clazz);
    let classDecorators = decoratorsForClass.class;
    if (!classDecorators) {
        classDecorators = [];
        decoratorsForClass.class = classDecorators;
    }
    classDecorators.push(decorator);
    return decorator(clazz);
});
const decorateMember = (decorator) => ((object, key, ...otherArgs) => {
    const decoratorTargetType = typeof object === 'function' ? 'static' : 'instance';
    const decoratorType = typeof object[key] === 'function' ? 'method' : 'property';
    const clazz = decoratorTargetType === 'static' ? object : object.constructor;
    const decoratorsForClass = getDecoratorsForClass(clazz);
    let decoratorsForTargetType = decoratorsForClass === null || decoratorsForClass === void 0 ? void 0 : decoratorsForClass[decoratorTargetType];
    if (!decoratorsForTargetType) {
        decoratorsForTargetType = {};
        decoratorsForClass[decoratorTargetType] = decoratorsForTargetType;
    }
    let decoratorsForType = decoratorsForTargetType === null || decoratorsForTargetType === void 0 ? void 0 : decoratorsForTargetType[decoratorType];
    if (!decoratorsForType) {
        decoratorsForType = {};
        decoratorsForTargetType[decoratorType] = decoratorsForType;
    }
    let decoratorsForKey = decoratorsForType === null || decoratorsForType === void 0 ? void 0 : decoratorsForType[key];
    if (!decoratorsForKey) {
        decoratorsForKey = [];
        decoratorsForType[key] = decoratorsForKey;
    }
    decoratorsForKey.push(decorator);
    // @ts-ignore
    return decorator(object, key, ...otherArgs);
});
const decorate = (decorator) => ((...args) => {
    if (args.length === 1)
        return decorateClass(decorator)(args[0]);
    return decorateMember(decorator)(...args);
});

function Mixin(...constructors) {
    var _a, _b, _c;
    const prototypes = constructors.map(constructor => constructor.prototype);
    function MixedClass(...args) {
        for (const constructor of constructors)
            // @ts-ignore: potentially abstract class
            copyProps(this, new constructor(...args));
    }
    MixedClass.prototype = hardMixProtos(prototypes, MixedClass)
        ;
    Object.setPrototypeOf(MixedClass, hardMixProtos(constructors, null, ['prototype'])
        );
    let DecoratedMixedClass = MixedClass;
    {
        const classDecorators = deepDecoratorSearch(...constructors)
            ;
        for (let decorator of (_a = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.class) !== null && _a !== void 0 ? _a : [])
            DecoratedMixedClass = decorator(DecoratedMixedClass);
        applyPropAndMethodDecorators((_b = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.static) !== null && _b !== void 0 ? _b : {}, DecoratedMixedClass);
        applyPropAndMethodDecorators((_c = classDecorators === null || classDecorators === void 0 ? void 0 : classDecorators.instance) !== null && _c !== void 0 ? _c : {}, DecoratedMixedClass.prototype);
    }
    registerMixins(DecoratedMixedClass, constructors);
    return DecoratedMixedClass;
}
const applyPropAndMethodDecorators = (propAndMethodDecorators, target) => {
    const propDecorators = propAndMethodDecorators.property;
    const methodDecorators = propAndMethodDecorators.method;
    if (propDecorators)
        for (let key in propDecorators)
            for (let decorator of propDecorators[key])
                decorator(target, key);
    if (methodDecorators)
        for (let key in methodDecorators)
            for (let decorator of methodDecorators[key])
                decorator(target, key, Object.getOwnPropertyDescriptor(target, key));
};

var BXGYType;
(function (BXGYType) {
    BXGYType["ALL"] = "ALL";
    BXGYType["CATEGORIES"] = "CATEGORIES";
    BXGYType["COMPANIES"] = "COMPANIES";
    BXGYType["PRODUCTS"] = "PRODUCTS";
})(BXGYType || (BXGYType = {}));

var DiscountBxgyItemItemDto = /** @class */ (function () {
    function DiscountBxgyItemItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.BXGYType === BXGYType.PRODUCTS; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemItemDto.prototype, "productId");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.BXGYType === BXGYType.COMPANIES; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemItemDto.prototype, "companyId");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.BXGYType === BXGYType.CATEGORIES; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemItemDto.prototype, "categoryId");
    return DiscountBxgyItemItemDto;
}());

var DiscountFilterType;
(function (DiscountFilterType) {
    DiscountFilterType["ALL"] = "ALL";
    DiscountFilterType["PRODUCTS"] = "PRODUCTS";
    DiscountFilterType["COMPANIES"] = "COMPANIES";
    DiscountFilterType["CATEGORIES"] = "CATEGORIES";
})(DiscountFilterType || (DiscountFilterType = {}));

var DiscountFilterItemItemDto = /** @class */ (function () {
    function DiscountFilterItemItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.PRODUCTS; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "productId");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.COMPANIES; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "companyId");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountFilterType === DiscountFilterType.CATEGORIES; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountFilterItemItemDto.prototype, "categoryId");
    return DiscountFilterItemItemDto;
}());

var PaginateResponseMetadataDto = /** @class */ (function () {
    function PaginateResponseMetadataDto() {
    }
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "itemCount");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "totalItems");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "itemsPerPage");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "totalPages");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateResponseMetadataDto.prototype, "currentPage");
    return PaginateResponseMetadataDto;
}());

var BaseDBFieldsDto = /** @class */ (function () {
    function BaseDBFieldsDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(IsInt()),
        __metadata("design:type", Number)
    ], BaseDBFieldsDto.prototype, "id");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], BaseDBFieldsDto.prototype, "isDeleted");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsDate()),
        decorate(Type(function () { return Date; })),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "createdAt");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsDate()),
        decorate(Type(function () { return Date; })),
        __metadata("design:type", Date)
    ], BaseDBFieldsDto.prototype, "updatedAt");
    return BaseDBFieldsDto;
}());

var BulkAdjustmentCountType;
(function (BulkAdjustmentCountType) {
    BulkAdjustmentCountType["ALL"] = "ALL";
    BulkAdjustmentCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BulkAdjustmentCountType || (BulkAdjustmentCountType = {}));

var CartAdjustmentDiscountType;
(function (CartAdjustmentDiscountType) {
    CartAdjustmentDiscountType["PERCENT"] = "PERCENT";
    CartAdjustmentDiscountType["FIXED"] = "FIXED";
    CartAdjustmentDiscountType["FIXED_PRICE_PER_PRODUCT"] = "FIXED_PRICE_PER_PRODUCT";
})(CartAdjustmentDiscountType || (CartAdjustmentDiscountType = {}));

var DiscountType;
(function (DiscountType) {
    DiscountType["PRODUCT_ADJUSTMENT"] = "PRODUCT_ADJUSTMENT";
    DiscountType["CART_ADJUSTMENT"] = "CART_ADJUSTMENT";
    DiscountType["BULK_ADJUSTMENT"] = "BULK_ADJUSTMENT";
    DiscountType["BXGX"] = "BXGX";
    DiscountType["BXGY"] = "BXGY";
})(DiscountType || (DiscountType = {}));

var ProductAdjustmentDiscountType;
(function (ProductAdjustmentDiscountType) {
    ProductAdjustmentDiscountType["PERCENT"] = "PERCENT";
    ProductAdjustmentDiscountType["FIXED"] = "FIXED";
    ProductAdjustmentDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(ProductAdjustmentDiscountType || (ProductAdjustmentDiscountType = {}));

var BXGYCountType;
(function (BXGYCountType) {
    BXGYCountType["ALL"] = "ALL";
    BXGYCountType["INDIVIDUAL"] = "INDIVIDUAL";
})(BXGYCountType || (BXGYCountType = {}));

var BXGYGetType;
(function (BXGYGetType) {
    BXGYGetType["RANDOM"] = "RANDOM";
    BXGYGetType["CHEAPEST_PRICE"] = "CHEAPEST_PRICE";
    BXGYGetType["HIGHEST_PRICE"] = "HIGHEST_PRICE";
})(BXGYGetType || (BXGYGetType = {}));

var BulkDiscountType;
(function (BulkDiscountType) {
    BulkDiscountType["PERCENT"] = "PERCENT";
    BulkDiscountType["FIXED"] = "FIXED";
    BulkDiscountType["FIXED_PRICE_PER_ITEM"] = "FIXED_PRICE_PER_ITEM";
})(BulkDiscountType || (BulkDiscountType = {}));

var DiscountBulkItemDto = /** @class */ (function () {
    function DiscountBulkItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "minimumQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "maximumQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(BulkDiscountType)),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "discountType");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountBulkItemDto.prototype, "discountAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], DiscountBulkItemDto.prototype, "label");
    return DiscountBulkItemDto;
}());

var BXGYDiscountType;
(function (BXGYDiscountType) {
    BXGYDiscountType["PERCENT"] = "PERCENT";
    BXGYDiscountType["FIXED"] = "FIXED";
    BXGYDiscountType["FREE"] = "FREE";
})(BXGYDiscountType || (BXGYDiscountType = {}));

var DiscountBxgyItemDto = /** @class */ (function () {
    function DiscountBxgyItemDto() {
        this.isBXGYRecursive = false;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "minimumQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "bonusQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(BXGYDiscountType)),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "discountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType !== BXGYDiscountType.FREE; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "discountAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], DiscountBxgyItemDto.prototype, "isBXGYRecursive");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(BXGYType)),
        __metadata("design:type", String)
    ], DiscountBxgyItemDto.prototype, "BXGYType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return !o.isBXGYRecursive; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgyItemDto.prototype, "maximumQuantity");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.BXGYType !== BXGYType.ALL; })),
        decorate(Transform(function (_a) {
            var value = _a.value, obj = _a.obj;
            return value === null || value === void 0 ? void 0 : value.map(function (valueObj) {
                valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
                return valueObj;
            });
        })),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(ArrayMinSize(1)),
        decorate(Type(function () { return DiscountBxgyItemItemDto; })),
        __metadata("design:type", Array)
    ], DiscountBxgyItemDto.prototype, "discountBXGYItemItems");
    return DiscountBxgyItemDto;
}());

var BXGXDiscountType;
(function (BXGXDiscountType) {
    BXGXDiscountType["PERCENT"] = "PERCENT";
    BXGXDiscountType["FIXED"] = "FIXED";
    BXGXDiscountType["FREE"] = "FREE";
})(BXGXDiscountType || (BXGXDiscountType = {}));

var DiscountBxgxItemDto = /** @class */ (function () {
    function DiscountBxgxItemDto() {
        this.isBXGXRecursive = false;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "minimumQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "bonusQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(BXGXDiscountType)),
        __metadata("design:type", String)
    ], DiscountBxgxItemDto.prototype, "discountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType !== BXGXDiscountType.FREE; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "discountAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], DiscountBxgxItemDto.prototype, "isBXGXRecursive");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return !o.isBXGXRecursive; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBxgxItemDto.prototype, "maximumQuantity");
    return DiscountBxgxItemDto;
}());

var DiscountFilterItemDto = /** @class */ (function () {
    function DiscountFilterItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(DiscountFilterType)),
        __metadata("design:type", String)
    ], DiscountFilterItemDto.prototype, "discountFilterType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountFilterType !== DiscountFilterType.ALL; })),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountFilterItemDto.prototype, "isInList");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountFilterType !== DiscountFilterType.ALL; })),
        decorate(Transform(function (_a) {
            var value = _a.value, obj = _a.obj;
            return value === null || value === void 0 ? void 0 : value.map(function (valueObj) {
                valueObj.discountFilterType = obj === null || obj === void 0 ? void 0 : obj.discountFilterType;
                return valueObj;
            });
        })),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(ArrayMinSize(1)),
        decorate(Type(function () { return DiscountFilterItemItemDto; })),
        __metadata("design:type", Array)
    ], DiscountFilterItemDto.prototype, "discountFilterItemItems");
    return DiscountFilterItemDto;
}());

var ConditionCountType;
(function (ConditionCountType) {
    ConditionCountType["FROM_CART"] = "FROM_CART";
    ConditionCountType["FROM_FILTER"] = "FROM_FILTER";
})(ConditionCountType || (ConditionCountType = {}));

var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["LESS_THAN"] = "LESS_THAN";
    ConditionOperator["LESS_THAN_OR_EQUAL"] = "LESS_THAN_OR_EQUAL";
    ConditionOperator["GREATER_THAN"] = "GREATER_THAN";
    ConditionOperator["GREATER_THAN_OR_EQUAL"] = "GREATER_THAN_OR_EQUAL";
    ConditionOperator["EQUAL_TO"] = "EQUAL_TO";
})(ConditionOperator || (ConditionOperator = {}));

var DiscountConditionType;
(function (DiscountConditionType) {
    DiscountConditionType["SUBTOTAL"] = "SUBTOTAL";
    DiscountConditionType["ITEM_QUANTITY"] = "ITEM_QUANTITY";
    DiscountConditionType["LINE_ITEM_COUNT"] = "LINE_ITEM_COUNT";
})(DiscountConditionType || (DiscountConditionType = {}));

var DiscountConditionItemDto = /** @class */ (function () {
    function DiscountConditionItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountConditionItemDto.prototype, "conditionValue");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(ConditionOperator)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionOperator");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(DiscountConditionType)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionType");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(ConditionCountType)),
        __metadata("design:type", String)
    ], DiscountConditionItemDto.prototype, "conditionCountType");
    return DiscountConditionItemDto;
}());

var DiscountBaseDto = /** @class */ (function () {
    function DiscountBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(DiscountType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "discountType");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isEnabled");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreOther");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isIgnoreThisIfOtherMatched");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return Number; })),
        decorate(IsInt()),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "priority");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (_object, value) { return !!value; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "usageLimit");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.PRODUCT_ADJUSTMENT; })),
        decorate(IsEnum(ProductAdjustmentDiscountType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.PRODUCT_ADJUSTMENT; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "productAdjustmentDiscountAmount");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; })),
        decorate(IsEnum(CartAdjustmentDiscountType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], DiscountBaseDto.prototype, "cartAdjustmentDiscountAmount");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.CART_ADJUSTMENT; })),
        decorate(IsString()),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "cartAdjustmentLabel");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BULK_ADJUSTMENT; })),
        decorate(IsEnum(BulkAdjustmentCountType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "bulkAdjustmentCountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BULK_ADJUSTMENT; })),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(ArrayMinSize(1)),
        decorate(Type(function () { return DiscountBulkItemDto; })),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBulkItems");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGX; })),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGXRecursive");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGX; })),
        decorate(IsArray()),
        decorate(ArrayMinSize(1)),
        decorate(Transform(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.isBXGXRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGXRecursive;
                return valueObj;
            });
        })),
        decorate(Type(function () { return DiscountBxgxItemDto; })),
        decorate(ValidateNested({ each: true })),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGXItems");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; })),
        decorate(IsEnum(BXGYType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; })),
        decorate(IsEnum(BXGYCountType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYCountType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; })),
        decorate(IsEnum(BXGYGetType)),
        __metadata("design:type", String)
    ], DiscountBaseDto.prototype, "BXGYGetType");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; })),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isBXGYRecursive");
    __decorate([
        decorate(Expose()),
        decorate(ValidateIf(function (o) { return o.discountType === DiscountType.BXGY; })),
        decorate(IsArray()),
        decorate(ArrayMinSize(1)),
        decorate(Transform(function (_a) {
            var _b;
            var value = _a.value, obj = _a.obj;
            return (_b = value === null || value === void 0 ? void 0 : value.filter(function (_valueObj, index) { return !(obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive) || index < 1; })) === null || _b === void 0 ? void 0 : _b.map(function (valueObj) {
                valueObj.BXGYType = obj === null || obj === void 0 ? void 0 : obj.BXGYType;
                valueObj.isBXGYRecursive = obj === null || obj === void 0 ? void 0 : obj.isBXGYRecursive;
                return valueObj;
            });
        })),
        decorate(Type(function () { return DiscountBxgyItemDto; })),
        decorate(ValidateNested({ each: true })),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountBXGYItems");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (_object, value) { return !!value; })),
        decorate(IsDate()),
        decorate(Type(function () { return Date; })),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeFromDateTime");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (_object, value) { return !!value; })),
        decorate(IsDate()),
        decorate(Type(function () { return Date; })),
        __metadata("design:type", Date)
    ], DiscountBaseDto.prototype, "activeToDateTime");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], DiscountBaseDto.prototype, "isMatchAllCondition");
    __decorate([
        decorate(Expose()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(ArrayMinSize(1)),
        decorate(Type(function () { return DiscountFilterItemDto; })),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountFilterItems");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return DiscountConditionItemDto; })),
        __metadata("design:type", Array)
    ], DiscountBaseDto.prototype, "discountConditionItems");
    return DiscountBaseDto;
}());

var DiscountItemDto = /** @class */ (function (_super) {
    __extends(DiscountItemDto, _super);
    function DiscountItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DiscountItemDto;
}(Mixin(BaseDBFieldsDto, DiscountBaseDto)));

var DiscountPaginateResponseDto = /** @class */ (function (_super) {
    __extends(DiscountPaginateResponseDto, _super);
    function DiscountPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return DiscountItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], DiscountPaginateResponseDto.prototype, "items");
    return DiscountPaginateResponseDto;
}(PaginateResponseMetadataDto));

var PaginateRequestDto = /** @class */ (function () {
    function PaginateRequestDto() {
        this.page = 1;
        this.limit = 10;
    }
    __decorate([
        Expose(),
        IsNotEmpty(),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateRequestDto.prototype, "page");
    __decorate([
        Expose(),
        IsNotEmpty(),
        Transform(function (_a) {
            var value = _a.value;
            var limit = value;
            limit = limit > 100 ? 100 : limit;
            return limit;
        }),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PaginateRequestDto.prototype, "limit");
    __decorate([
        Expose(),
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], PaginateRequestDto.prototype, "search");
    return PaginateRequestDto;
}());

var DiscountPaginateRequestDto = /** @class */ (function (_super) {
    __extends(DiscountPaginateRequestDto, _super);
    function DiscountPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DiscountPaginateRequestDto;
}(PaginateRequestDto));

var DiscountCreateDto = /** @class */ (function (_super) {
    __extends(DiscountCreateDto, _super);
    function DiscountCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DiscountCreateDto;
}(DiscountBaseDto));

var AutoCompleteOptionItemDto = /** @class */ (function () {
    function AutoCompleteOptionItemDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], AutoCompleteOptionItemDto.prototype, "id");
    __decorate([
        decorate(Expose()),
        decorate(Allow()),
        __metadata("design:type", String)
    ], AutoCompleteOptionItemDto.prototype, "label");
    return AutoCompleteOptionItemDto;
}());

var DiscountUpdateDto = /** @class */ (function (_super) {
    __extends(DiscountUpdateDto, _super);
    function DiscountUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DiscountUpdateDto;
}(DiscountBaseDto));

var OrderItemType;
(function (OrderItemType) {
    OrderItemType["RETURN"] = "RETURN";
    OrderItemType["DAMAGE_RETURN"] = "DAMAGE_RETURN";
    OrderItemType["SALE"] = "SALE";
})(OrderItemType || (OrderItemType = {}));

var LoginDTO = /** @class */ (function () {
    function LoginDTO() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Length(11, 11)),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "mobile");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Length(6)),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "password");
    return LoginDTO;
}());

var AuthResponseDTO = /** @class */ (function () {
    function AuthResponseDTO() {
    }
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "accessToken");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "expiresIn");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "tokenType");
    __decorate([
        Expose(),
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], AuthResponseDTO.prototype, "message");
    return AuthResponseDTO;
}());

var CompanyBaseDto = /** @class */ (function () {
    function CompanyBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CompanyBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CompanyBaseDto.prototype, "logo");
    return CompanyBaseDto;
}());

var CompanyItemDto = /** @class */ (function (_super) {
    __extends(CompanyItemDto, _super);
    function CompanyItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CompanyItemDto;
}(Mixin(BaseDBFieldsDto, CompanyBaseDto)));

var CompanyPaginateResponseDto = /** @class */ (function (_super) {
    __extends(CompanyPaginateResponseDto, _super);
    function CompanyPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return CompanyItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], CompanyPaginateResponseDto.prototype, "items");
    return CompanyPaginateResponseDto;
}(PaginateResponseMetadataDto));

var CompanyCreateDto = /** @class */ (function (_super) {
    __extends(CompanyCreateDto, _super);
    function CompanyCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CompanyCreateDto;
}(CompanyBaseDto));

var CompanyUpdateDto = /** @class */ (function (_super) {
    __extends(CompanyUpdateDto, _super);
    function CompanyUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CompanyUpdateDto;
}(CompanyBaseDto));

var DeleteResponseDto = /** @class */ (function () {
    function DeleteResponseDto() {
    }
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], DeleteResponseDto.prototype, "message");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], DeleteResponseDto.prototype, "deletedId");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], DeleteResponseDto.prototype, "isDeleted");
    return DeleteResponseDto;
}());

var CategoryBaseDto = /** @class */ (function () {
    function CategoryBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CategoryBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CategoryBaseDto.prototype, "icon");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], CategoryBaseDto.prototype, "categoryId");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        decorate(IsInt()),
        __metadata("design:type", Number)
    ], CategoryBaseDto.prototype, "order");
    return CategoryBaseDto;
}());

var CategoryUpdateDto = /** @class */ (function (_super) {
    __extends(CategoryUpdateDto, _super);
    function CategoryUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CategoryUpdateDto;
}(CategoryBaseDto));

var CategoryCreateDto = /** @class */ (function (_super) {
    __extends(CategoryCreateDto, _super);
    function CategoryCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], CategoryCreateDto.prototype, "companyId");
    return CategoryCreateDto;
}(CategoryBaseDto));

var CategoryItemDto = /** @class */ (function (_super) {
    __extends(CategoryItemDto, _super);
    function CategoryItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CategoryItemDto;
}(Mixin(BaseDBFieldsDto, CategoryCreateDto)));

var CategoryPaginateResponseDto = /** @class */ (function (_super) {
    __extends(CategoryPaginateResponseDto, _super);
    function CategoryPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return CategoryItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], CategoryPaginateResponseDto.prototype, "items");
    return CategoryPaginateResponseDto;
}(PaginateResponseMetadataDto));

var CategoryPaginateRequestDto = /** @class */ (function (_super) {
    __extends(CategoryPaginateRequestDto, _super);
    function CategoryPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], CategoryPaginateRequestDto.prototype, "companyId");
    return CategoryPaginateRequestDto;
}(PaginateRequestDto));

var ProductBaseDto = /** @class */ (function () {
    function ProductBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], ProductBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], ProductBaseDto.prototype, "barcode");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "cost");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "price");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "mrp");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], ProductBaseDto.prototype, "description");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "order");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "categoryId");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], ProductBaseDto.prototype, "companyId");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], ProductBaseDto.prototype, "image");
    return ProductBaseDto;
}());

var ProductCreateDto = /** @class */ (function (_super) {
    __extends(ProductCreateDto, _super);
    function ProductCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProductCreateDto;
}(ProductBaseDto));

var ProductItemDto = /** @class */ (function (_super) {
    __extends(ProductItemDto, _super);
    function ProductItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProductItemDto;
}(Mixin(BaseDBFieldsDto, ProductBaseDto)));

var ProductPaginateRequestDto = /** @class */ (function (_super) {
    __extends(ProductPaginateRequestDto, _super);
    function ProductPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsInt(),
        __metadata("design:type", Number)
    ], ProductPaginateRequestDto.prototype, "companyId");
    __decorate([
        Expose(),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsInt(),
        __metadata("design:type", Number)
    ], ProductPaginateRequestDto.prototype, "categoryId");
    return ProductPaginateRequestDto;
}(PaginateRequestDto));

var ProductPaginateResponseDto = /** @class */ (function (_super) {
    __extends(ProductPaginateResponseDto, _super);
    function ProductPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return ProductItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], ProductPaginateResponseDto.prototype, "items");
    return ProductPaginateResponseDto;
}(PaginateResponseMetadataDto));

var ProductUpdateDto = /** @class */ (function (_super) {
    __extends(ProductUpdateDto, _super);
    function ProductUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProductUpdateDto;
}(ProductBaseDto));

var PurchaseItemBaseDto = /** @class */ (function () {
    function PurchaseItemBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], PurchaseItemBaseDto.prototype, "productId");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], PurchaseItemBaseDto.prototype, "cost");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        decorate(Min(1)),
        __metadata("design:type", Number)
    ], PurchaseItemBaseDto.prototype, "quantity");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], PurchaseItemBaseDto.prototype, "totalAmount");
    return PurchaseItemBaseDto;
}());

var PurchaseBaseDto = /** @class */ (function () {
    function PurchaseBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], PurchaseBaseDto.prototype, "title");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], PurchaseBaseDto.prototype, "invoiceNumber");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], PurchaseBaseDto.prototype, "invoiceImage");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], PurchaseBaseDto.prototype, "comment");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(Transform(function (_a) {
            var value = _a.value;
            return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
        })),
        __metadata("design:type", Boolean)
    ], PurchaseBaseDto.prototype, "isDraft");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], PurchaseBaseDto.prototype, "companyId");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ArrayMinSize(1)),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return PurchaseItemBaseDto; })),
        __metadata("design:type", Array)
    ], PurchaseBaseDto.prototype, "purchaseItems");
    return PurchaseBaseDto;
}());

var PurchaseCreateDto = /** @class */ (function (_super) {
    __extends(PurchaseCreateDto, _super);
    function PurchaseCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PurchaseCreateDto;
}(PurchaseBaseDto));

var PurchaseItemDto = /** @class */ (function (_super) {
    __extends(PurchaseItemDto, _super);
    function PurchaseItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], PurchaseItemDto.prototype, "userId");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], PurchaseItemDto.prototype, "totalAmount");
    return PurchaseItemDto;
}(Mixin(BaseDBFieldsDto, PurchaseBaseDto)));

var PurchasePaginateRequestDto = /** @class */ (function (_super) {
    __extends(PurchasePaginateRequestDto, _super);
    function PurchasePaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        Type(function () { return Number; }),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], PurchasePaginateRequestDto.prototype, "companyId");
    return PurchasePaginateRequestDto;
}(PaginateRequestDto));

var PurchasePaginateResponseDto = /** @class */ (function (_super) {
    __extends(PurchasePaginateResponseDto, _super);
    function PurchasePaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return PurchaseItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], PurchasePaginateResponseDto.prototype, "items");
    return PurchasePaginateResponseDto;
}(PaginateResponseMetadataDto));

var PurchaseUpdateDto = /** @class */ (function (_super) {
    __extends(PurchaseUpdateDto, _super);
    function PurchaseUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PurchaseUpdateDto;
}(PurchaseBaseDto));

var CustomerBaseDto = /** @class */ (function () {
    function CustomerBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CustomerBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CustomerBaseDto.prototype, "address");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CustomerBaseDto.prototype, "contactPerson");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], CustomerBaseDto.prototype, "photo");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(Length(11, 11)),
        decorate(IsMobilePhone('bn-BD')),
        __metadata("design:type", String)
    ], CustomerBaseDto.prototype, "mobile");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], CustomerBaseDto.prototype, "latitude");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(Type(function () { return Number; })),
        decorate(IsNumber()),
        __metadata("design:type", Number)
    ], CustomerBaseDto.prototype, "longitude");
    return CustomerBaseDto;
}());

var CustomerCreateDto = /** @class */ (function (_super) {
    __extends(CustomerCreateDto, _super);
    function CustomerCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerCreateDto;
}(CustomerBaseDto));

var CustomerItemDto = /** @class */ (function (_super) {
    __extends(CustomerItemDto, _super);
    function CustomerItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerItemDto;
}(Mixin(BaseDBFieldsDto, CustomerBaseDto)));

var CustomerUpdateDto = /** @class */ (function (_super) {
    __extends(CustomerUpdateDto, _super);
    function CustomerUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerUpdateDto;
}(CustomerBaseDto));

var CustomerPaginateRequestDto = /** @class */ (function (_super) {
    __extends(CustomerPaginateRequestDto, _super);
    function CustomerPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerPaginateRequestDto;
}(PaginateRequestDto));

var CustomerPaginateResponseDto = /** @class */ (function (_super) {
    __extends(CustomerPaginateResponseDto, _super);
    function CustomerPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return CustomerItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], CustomerPaginateResponseDto.prototype, "items");
    return CustomerPaginateResponseDto;
}(PaginateResponseMetadataDto));

function TransformBoolean() {
    return Transform(function (_a) {
        var value = _a.value;
        if (typeof value === 'undefined' || value === null) {
            return false;
        }
        // Normalize the value to a lower-case string for case-insensitive comparison
        var stringValue = String(value).toLowerCase();
        return ['true', 'enabled', '1', 'yes'].includes(stringValue) || value === true;
    });
}

var OrderBaseDto = /** @class */ (function () {
    function OrderBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], OrderBaseDto.prototype, "comment");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderBaseDto.prototype, "customerId");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(TransformBoolean()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], OrderBaseDto.prototype, "isCanceled");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(TransformBoolean()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], OrderBaseDto.prototype, "isDelivered");
    return OrderBaseDto;
}());

var OrderProductBaseDto = /** @class */ (function () {
    function OrderProductBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], OrderProductBaseDto.prototype, "sale_price");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], OrderProductBaseDto.prototype, "quantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductBaseDto.prototype, "productId");
    return OrderProductBaseDto;
}());

var OrderProductCreateDto = /** @class */ (function (_super) {
    __extends(OrderProductCreateDto, _super);
    function OrderProductCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(OrderItemType)),
        __metadata("design:type", String)
    ], OrderProductCreateDto.prototype, "itemType");
    return OrderProductCreateDto;
}(OrderProductBaseDto));

var OrderPaymentBaseDto = /** @class */ (function () {
    function OrderPaymentBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderPaymentBaseDto.prototype, "amount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderPaymentBaseDto.prototype, "collectedByUserId");
    return OrderPaymentBaseDto;
}());

var OrderPaymentCreateDto = /** @class */ (function (_super) {
    __extends(OrderPaymentCreateDto, _super);
    function OrderPaymentCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OrderPaymentCreateDto;
}(OrderPaymentBaseDto));

var OrderCreateDto = /** @class */ (function (_super) {
    __extends(OrderCreateDto, _super);
    function OrderCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderProductCreateDto; })),
        __metadata("design:type", Array)
    ], OrderCreateDto.prototype, "orderProducts");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderPaymentCreateDto; })),
        __metadata("design:type", Array)
    ], OrderCreateDto.prototype, "orderPayments");
    return OrderCreateDto;
}(OrderBaseDto));

var OrderProductUpdateDto = /** @class */ (function (_super) {
    __extends(OrderProductUpdateDto, _super);
    function OrderProductUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsNumber()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductUpdateDto.prototype, "id");
    return OrderProductUpdateDto;
}(OrderProductCreateDto));

var OrderPaymentUpdateDto = /** @class */ (function (_super) {
    __extends(OrderPaymentUpdateDto, _super);
    function OrderPaymentUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(ValidateIf(function (object, value) { return !!value; })),
        decorate(IsNumber()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderPaymentUpdateDto.prototype, "id");
    return OrderPaymentUpdateDto;
}(OrderPaymentBaseDto));

var OrderUpdateDto = /** @class */ (function (_super) {
    __extends(OrderUpdateDto, _super);
    function OrderUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderProductUpdateDto; })),
        __metadata("design:type", Array)
    ], OrderUpdateDto.prototype, "orderProducts");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderPaymentUpdateDto; })),
        __metadata("design:type", Array)
    ], OrderUpdateDto.prototype, "orderPayments");
    return OrderUpdateDto;
}(OrderBaseDto));

var OrderProductItemDto = /** @class */ (function (_super) {
    __extends(OrderProductItemDto, _super);
    function OrderProductItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        Type(function () { return ProductItemDto; }),
        __metadata("design:type", ProductItemDto)
    ], OrderProductItemDto.prototype, "product");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsEnum(OrderItemType)),
        __metadata("design:type", String)
    ], OrderProductItemDto.prototype, "itemType");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "cost");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "regular_price");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "sale_price");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "mrp");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "quantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "totalRegularAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "totalSaleAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "totalDiscount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "oldQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "oldTotalRegularAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "oldTotalSaleAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderProductItemDto.prototype, "oldTotalDiscount");
    return OrderProductItemDto;
}(Mixin(BaseDBFieldsDto, OrderProductBaseDto)));

var OrderPaginateRequestDto = /** @class */ (function (_super) {
    __extends(OrderPaginateRequestDto, _super);
    function OrderPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OrderPaginateRequestDto;
}(PaginateRequestDto));

var UserType;
(function (UserType) {
    UserType["ORGANIZATION_USER"] = "ORGANIZATION_USER";
    UserType["DMS_USER"] = "DMS_USER";
})(UserType || (UserType = {}));

var DMSRole;
(function (DMSRole) {
    DMSRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    DMSRole["ADMIN"] = "ADMIN";
    DMSRole["MANAGER"] = "MANAGER";
})(DMSRole || (DMSRole = {}));

var OrganizationRole;
(function (OrganizationRole) {
    OrganizationRole["ADMIN"] = "ADMIN";
    OrganizationRole["MANAGER"] = "MANAGER";
    OrganizationRole["WAREHOUSE_KEEPER"] = "WAREHOUSE_KEEPER";
    OrganizationRole["DELIVERY_MAN"] = "DELIVERY_MAN";
    OrganizationRole["SALES_REPRESENTATIVE"] = "SALES_REPRESENTATIVE";
    OrganizationRole["SALES_MANAGER"] = "SALES_MANAGER";
})(OrganizationRole || (OrganizationRole = {}));

var UserBaseDto = /** @class */ (function () {
    function UserBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        IsNotEmpty(),
        IsString(),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "name");
    __decorate([
        decorate(Expose()),
        IsNotEmpty(),
        Length(11, 11),
        IsMobilePhone('bn-BD'),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "mobile");
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsEmail(),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "email");
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsString(),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "address");
    __decorate([
        decorate(Expose()),
        IsNotEmpty(),
        IsEnum(UserType),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "userType");
    __decorate([
        decorate(Expose()),
        ValidateIf(function (o) { return o.userType === UserType.DMS_USER; }),
        IsNotEmpty(),
        IsEnum(DMSRole),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "dmsRole");
    __decorate([
        decorate(Expose()),
        ValidateIf(function (o) { return o.userType === UserType.ORGANIZATION_USER; }),
        IsNotEmpty(),
        IsEnum(OrganizationRole),
        __metadata("design:type", String)
    ], UserBaseDto.prototype, "organizationRole");
    return UserBaseDto;
}());

var UserItemDto = /** @class */ (function (_super) {
    __extends(UserItemDto, _super);
    function UserItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], UserItemDto.prototype, "organizationId");
    return UserItemDto;
}(Mixin(BaseDBFieldsDto, UserBaseDto)));

var OrderPaymentItemDto = /** @class */ (function (_super) {
    __extends(OrderPaymentItemDto, _super);
    function OrderPaymentItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderPaymentItemDto.prototype, "id");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        Type(function () { return UserItemDto; }),
        __metadata("design:type", UserItemDto)
    ], OrderPaymentItemDto.prototype, "collectedByUser");
    return OrderPaymentItemDto;
}(Mixin(BaseDBFieldsDto, OrderPaymentBaseDto)));

var OrderItemDto = /** @class */ (function (_super) {
    __extends(OrderItemDto, _super);
    function OrderItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderProductItemDto; })),
        __metadata("design:type", Array)
    ], OrderItemDto.prototype, "orderProducts");
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return OrderPaymentItemDto; })),
        __metadata("design:type", Array)
    ], OrderItemDto.prototype, "orderPayments");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return CustomerItemDto; })),
        __metadata("design:type", CustomerItemDto)
    ], OrderItemDto.prototype, "customer");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return UserItemDto; })),
        __metadata("design:type", UserItemDto)
    ], OrderItemDto.prototype, "orderUser");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "oldTotalDiscount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "oldTotalSaleAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "oldTotalRegularAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "totalDiscount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "totalSaleAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "totalRegularAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "totalPaymentAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsNumber()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], OrderItemDto.prototype, "totalDueAmount");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(TransformBoolean()),
        decorate(IsBoolean()),
        __metadata("design:type", Boolean)
    ], OrderItemDto.prototype, "isPaid");
    return OrderItemDto;
}(Mixin(BaseDBFieldsDto, OrderBaseDto)));

var OrderPaginateResponseDto = /** @class */ (function (_super) {
    __extends(OrderPaginateResponseDto, _super);
    function OrderPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return OrderItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], OrderPaginateResponseDto.prototype, "items");
    return OrderPaginateResponseDto;
}(PaginateResponseMetadataDto));

var CreatedResponseDto = /** @class */ (function () {
    function CreatedResponseDto() {
    }
    __decorate([
        Expose(),
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreatedResponseDto.prototype, "message");
    __decorate([
        Expose(),
        IsNotEmpty(),
        IsNumber(),
        IsInt(),
        __metadata("design:type", Number)
    ], CreatedResponseDto.prototype, "id");
    return CreatedResponseDto;
}());

var UserCreateDto = /** @class */ (function (_super) {
    __extends(UserCreateDto, _super);
    function UserCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsInt(),
        Type(function () { return Number; }),
        __metadata("design:type", Number)
    ], UserCreateDto.prototype, "organizationId");
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsString(),
        MinLength(6),
        __metadata("design:type", String)
    ], UserCreateDto.prototype, "password");
    return UserCreateDto;
}(UserBaseDto));

var UserUpdateDto = /** @class */ (function (_super) {
    __extends(UserUpdateDto, _super);
    function UserUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        IsOptional(),
        ValidateIf(function (object, value) { return !!value; }),
        IsString(),
        MinLength(6),
        __metadata("design:type", String)
    ], UserUpdateDto.prototype, "password");
    return UserUpdateDto;
}(UserBaseDto));

var DeliverySummaryBaseDto = /** @class */ (function () {
    function DeliverySummaryBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsString()),
        __metadata("design:type", String)
    ], DeliverySummaryBaseDto.prototype, "comment");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryBaseDto.prototype, "deliveryByUserId");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryBaseDto.prototype, "routeId");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(Type(function () { return Date; })),
        decorate(IsDate()),
        __metadata("design:type", Object)
    ], DeliverySummaryBaseDto.prototype, "deliveryDate");
    return DeliverySummaryBaseDto;
}());

var DeliverySummaryProductBaseDto = /** @class */ (function () {
    function DeliverySummaryProductBaseDto() {
    }
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], DeliverySummaryProductBaseDto.prototype, "dispatchedQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        decorate(Min(0)),
        __metadata("design:type", Number)
    ], DeliverySummaryProductBaseDto.prototype, "returnedQuantity");
    __decorate([
        decorate(Expose()),
        decorate(IsNotEmpty()),
        decorate(IsInt()),
        decorate(Type(function () { return Number; })),
        __metadata("design:type", Number)
    ], DeliverySummaryProductBaseDto.prototype, "productId");
    return DeliverySummaryProductBaseDto;
}());

var DeliverySummaryProductCreateDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryProductCreateDto, _super);
    function DeliverySummaryProductCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeliverySummaryProductCreateDto;
}(DeliverySummaryProductBaseDto));

var DeliverySummaryCreateDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryCreateDto, _super);
    function DeliverySummaryCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return DeliverySummaryProductCreateDto; })),
        __metadata("design:type", Array)
    ], DeliverySummaryCreateDto.prototype, "deliverySummaryProducts");
    return DeliverySummaryCreateDto;
}(DeliverySummaryBaseDto));

var DeliverySummaryProductItemDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryProductItemDto, _super);
    function DeliverySummaryProductItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeliverySummaryProductItemDto;
}(Mixin(BaseDBFieldsDto, DeliverySummaryProductBaseDto)));

var DeliverySummaryItemDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryItemDto, _super);
    function DeliverySummaryItemDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return DeliverySummaryProductItemDto; })),
        __metadata("design:type", Array)
    ], DeliverySummaryItemDto.prototype, "deliverySummaryProducts");
    return DeliverySummaryItemDto;
}(Mixin(BaseDBFieldsDto, DeliverySummaryBaseDto)));

var DeliverySummaryPaginateRequestDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryPaginateRequestDto, _super);
    function DeliverySummaryPaginateRequestDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeliverySummaryPaginateRequestDto;
}(PaginateRequestDto));

var DeliverySummaryPaginateResponseDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryPaginateResponseDto, _super);
    function DeliverySummaryPaginateResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Expose(),
        IsArray(),
        Type(function () { return DeliverySummaryItemDto; }),
        ValidateNested({ each: true }),
        __metadata("design:type", Array)
    ], DeliverySummaryPaginateResponseDto.prototype, "items");
    return DeliverySummaryPaginateResponseDto;
}(PaginateResponseMetadataDto));

var DeliverySummaryProductUpdateDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryProductUpdateDto, _super);
    function DeliverySummaryProductUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DeliverySummaryProductUpdateDto;
}(DeliverySummaryProductBaseDto));

var DeliverySummaryUpdateDto = /** @class */ (function (_super) {
    __extends(DeliverySummaryUpdateDto, _super);
    function DeliverySummaryUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        decorate(Expose()),
        decorate(IsOptional()),
        decorate(IsArray()),
        decorate(ValidateNested({ each: true })),
        decorate(Type(function () { return DeliverySummaryProductUpdateDto; })),
        __metadata("design:type", Array)
    ], DeliverySummaryUpdateDto.prototype, "deliverySummaryProducts");
    return DeliverySummaryUpdateDto;
}(DeliverySummaryBaseDto));

/**
Obj should not be empty, if there are no field then pass {}
 */
var dtoValidator = function (dto, obj) { return __awaiter$1(void 0, void 0, void 0, function () {
    var returnError, objInstance, errors;
    return __generator$1(this, function (_a) {
        switch (_a.label) {
            case 0:
                returnError = [];
                if (typeof obj !== 'object') {
                    returnError.push('Received empty object');
                }
                objInstance = plainToInstance(dto, obj, {
                    excludeExtraneousValues: true,
                    exposeDefaultValues: true,
                    enableImplicitConversion: true
                });
                return [4 /*yield*/, validate(objInstance, {
                        enableDebugMessages: true,
                        whitelist: false,
                        forbidNonWhitelisted: true,
                        skipMissingProperties: false,
                        transform: true
                    })];
            case 1:
                errors = _a.sent();
                if (errors.length > 0) {
                    (function deepDive(e) {
                        e === null || e === void 0 ? void 0 : e.map(function (_a) {
                            var _b, _c;
                            var constraints = _a.constraints, children = _a.children;
                            if (constraints && ((_b = Object.keys(constraints)) === null || _b === void 0 ? void 0 : _b.length)) {
                                (_c = Object.values(constraints)) === null || _c === void 0 ? void 0 : _c.map(function (i) {
                                    returnError.push(i);
                                });
                            }
                            if (children === null || children === void 0 ? void 0 : children.length) {
                                deepDive(children);
                            }
                        });
                    })(errors);
                }
                return [2 /*return*/, returnError];
        }
    });
}); };

var validateAndPaintToInstance = function (dto, obj) { return __awaiter$1(void 0, void 0, void 0, function () {
    var returnError;
    return __generator$1(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dtoValidator(dto, obj)];
            case 1:
                returnError = _a.sent();
                if (returnError.length > 0) {
                    returnError = __spreadArray$1(['Object is not valid'], returnError, true);
                    throw new Error(returnError === null || returnError === void 0 ? void 0 : returnError.join('. \n'));
                }
                return [2 /*return*/, plainToInstance(dto, obj, {
                        excludeExtraneousValues: true,
                        exposeDefaultValues: true,
                        enableImplicitConversion: true
                    })];
        }
    });
}); };

export { AuthResponseDTO, AutoCompleteOptionItemDto, BXGXDiscountType, BXGYCountType, BXGYDiscountType, BXGYGetType, BXGYType, BaseDBFieldsDto, BulkAdjustmentCountType, BulkDiscountType, CartAdjustmentDiscountType, CategoryBaseDto, CategoryCreateDto, CategoryItemDto, CategoryPaginateRequestDto, CategoryPaginateResponseDto, CategoryUpdateDto, CompanyBaseDto, CompanyCreateDto, CompanyItemDto, CompanyPaginateResponseDto, CompanyUpdateDto, ConditionCountType, ConditionOperator, CreatedResponseDto, CustomerBaseDto, CustomerCreateDto, CustomerItemDto, CustomerPaginateRequestDto, CustomerPaginateResponseDto, CustomerUpdateDto, DMSRole, DeleteResponseDto, DeliverySummaryBaseDto, DeliverySummaryCreateDto, DeliverySummaryItemDto, DeliverySummaryPaginateRequestDto, DeliverySummaryPaginateResponseDto, DeliverySummaryProductBaseDto, DeliverySummaryProductCreateDto, DeliverySummaryProductItemDto, DeliverySummaryProductUpdateDto, DeliverySummaryUpdateDto, DiscountBaseDto, DiscountBulkItemDto, DiscountBxgxItemDto, DiscountBxgyItemDto, DiscountBxgyItemItemDto, DiscountConditionItemDto, DiscountConditionType, DiscountCreateDto, DiscountFilterItemDto, DiscountFilterItemItemDto, DiscountFilterType, DiscountItemDto, DiscountPaginateRequestDto, DiscountPaginateResponseDto, DiscountType, DiscountUpdateDto, LoginDTO, OrderBaseDto, OrderCreateDto, OrderItemDto, OrderItemType, OrderPaginateRequestDto, OrderPaginateResponseDto, OrderPaymentBaseDto, OrderPaymentCreateDto, OrderPaymentItemDto, OrderPaymentUpdateDto, OrderProductBaseDto, OrderProductCreateDto, OrderProductItemDto, OrderProductUpdateDto, OrderUpdateDto, OrganizationRole, PaginateRequestDto, PaginateResponseMetadataDto, ProductAdjustmentDiscountType, ProductBaseDto, ProductCreateDto, ProductItemDto, ProductPaginateRequestDto, ProductPaginateResponseDto, ProductUpdateDto, PurchaseBaseDto, PurchaseCreateDto, PurchaseItemBaseDto, PurchaseItemDto, PurchasePaginateRequestDto, PurchasePaginateResponseDto, PurchaseUpdateDto, TransformBoolean, UserBaseDto, UserCreateDto, UserItemDto, UserType, UserUpdateDto, dtoValidator, validateAndPaintToInstance };
//# sourceMappingURL=index.js.map
