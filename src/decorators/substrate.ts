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
            this["checkersMetadata"]?.push(properties)
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
            this["mutatorsMetadata"]?.push(properties)
        });
        return value;
    }
}

export {solver, checker, mutator};