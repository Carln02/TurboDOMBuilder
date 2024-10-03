declare function areEqual<Type = any>(...entries: Type[]): boolean;
declare function equalToAny<Type = any>(entry: Type, ...values: Type[]): boolean;
declare function eachEqualToAny<Type = any>(values: Type[], ...entries: Type[]): boolean;
export { areEqual, equalToAny, eachEqualToAny };
