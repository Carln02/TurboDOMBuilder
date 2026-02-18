import {
    SubstrateAddCallbackProperties,
    SubstrateChecker, SubstrateMutator,
    SubstrateSolver
} from "../turboFunctions/substrate/substrate.types";

/**
 * @decorator
 * @function solver
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 decorator that turns methods into substrate solvers.
 * @example
 * ```ts
 * @solver private constrainPosition(properties: SubstrateSolverProperties) {...}
 * ```
 * Is equivalent to:
 * ```ts
 * private constrainPosition(properties: SubstrateSolverProperties) {...}
 *
 * public initialize() {
 *   ...
 *   $(this).addSolver(this.constrainPosition);
 * }
 * ```
 */
function solver(properties?: SubstrateAddCallbackProperties<SubstrateSolver>) {
    return function <Type extends object>(
        value: ((this: Type, ...args: any[]) => any),
        context: ClassMethodDecoratorContext<Type>
    ): any {
        if (!properties || typeof properties !== "object") properties = {};
        if (!properties.name) properties.name = context?.name as string;
        context.addInitializer(function (this: Type) {
            if (!this["solversMetadata"]) return;
            for (let i = this["solversMetadata"].length - 1; i >= 0; i--) {
                if (this["solversMetadata"][i]?.name === properties.name) this["solversMetadata"].splice(i, 1);
            }
            this["solversMetadata"]?.push(properties)
        });
        return value;
    }
}

/**
 * @decorator
 * @function checker
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 decorator that turns methods into substrate checkers.
 * @example
 * ```ts
 * @checker private constrainPosition(properties: SubstrateSolverProperties) {...}
 * ```
 * Is equivalent to:
 * ```ts
 * private constrainPosition(properties: SubstrateSolverProperties) {...}
 *
 * public initialize() {
 *   ...
 *   $(this).addChecker(this.constrainPosition);
 * }
 * ```
 */
function checker(properties?: SubstrateAddCallbackProperties<SubstrateChecker>) {
    return function <Type extends object>(
        value: ((this: Type, ...args: any[]) => any),
        context: ClassMethodDecoratorContext<Type>
    ): any {
        if (!properties || typeof properties !== "object") properties = {};
        if (!properties.name) properties.name = context?.name as string;
        context.addInitializer(function (this: Type) {
            if (!this["checkersMetadata"]) return;
            for (let i = this["checkersMetadata"].length - 1; i >= 0; i--) {
                if (this["checkersMetadata"][i]?.name === properties.name) this["checkersMetadata"].splice(i, 1);
            }
            this["checkersMetadata"]?.push(properties);
        });
        return value;
    }
}

/**
 * @decorator
 * @function mutator
 * @group Decorators
 * @category MVC
 *
 * @description Stage-3 decorator that turns methods into substrate mutators.
 * @example
 * ```ts
 * @mutator private constrainPosition(properties: SubstrateSolverProperties) {...}
 * ```
 * Is equivalent to:
 * ```ts
 * private constrainPosition(properties: SubstrateSolverProperties) {...}
 *
 * public initialize() {
 *   ...
 *   $(this).addMutator(this.constrainPosition);
 * }
 * ```
 */
function mutator(properties?: SubstrateAddCallbackProperties<SubstrateMutator>) {
    return function <Type extends object>(
        value: ((this: Type, ...args: any[]) => any),
        context: ClassMethodDecoratorContext<Type>
    ): any {
        if (!properties || typeof properties !== "object") properties = {};
        if (!properties.name) properties.name = context?.name as string;
        context.addInitializer(function (this: Type) {
            if (!this["mutatorsMetadata"]) return;
            for (let i = this["mutatorsMetadata"].length - 1; i >= 0; i--) {
                if (this["mutatorsMetadata"][i]?.name === properties.name) this["mutatorsMetadata"].splice(i, 1);
            }
            this["mutatorsMetadata"]?.push(properties);
        });
        return value;
    }
}

export {solver, checker, mutator};