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
function solver<Type extends object>(
    value: ((this: Type, ...args: any[]) => any),
    context: ClassMethodDecoratorContext<Type>
): any {
    const {name} = context;
    context.addInitializer(function (this: Type) {this["solverKeys"]?.push(name)});
    return value;
}

export {solver};