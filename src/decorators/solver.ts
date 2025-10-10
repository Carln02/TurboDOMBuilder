function solver<Type extends object>(
    value: ((this: Type, ...args: any[]) => any),
    context: ClassMethodDecoratorContext<Type>
): any {
    const {name} = context;
    context.addInitializer(function (this: Type) {this["solverKeys"]?.push(name)});
    return value;
}

export {solver};