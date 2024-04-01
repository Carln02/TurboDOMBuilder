/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
function css(strings: TemplateStringsArray, ...values: any[]): string {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
}

export {css};