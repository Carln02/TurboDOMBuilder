import {auto} from "../../../decorators/auto/auto";
import {trim} from "../../../utils/computations/misc";
import {randomFromRange} from "../../../utils/computations/random";

/**
 * @class Color
 * @group Utilities
 * @category Color
 *
 * @description Unified color class. Parses any CSS color string (hex, rgb/rgba, hsl/hsla), stores the color
 * internally as RGBA, and provides conversions, interpolation, luminance, and contrast utilities.
 * All channels are kept in sync: setting any of r/g/b/a/h/s/l/hex updates the rest automatically.
 */
class Color {
    private syncing: boolean = false;

    @auto({preprocessValue: (value) => trim(value, 255)})
    public set r(value: number) {
        this.syncFromRgb();
    }

    @auto({preprocessValue: (value) => trim(value, 255)})
    public set g(value: number) {
        this.syncFromRgb();
    }

    @auto({preprocessValue: (value) => trim(value, 255)})
    public set b(value: number) {
        this.syncFromRgb();
    }

    @auto({preprocessValue: (value) => trim(value, 1)})
    public set a(value: number) {
        this.syncHex();
    }

    @auto({preprocessValue: (value) => ((value % 360) + 360) % 360})
    public set h(value: number) {
        this.syncFromHsl();
    }

    @auto({preprocessValue: (value) => trim(value, 100)})
    public set s(value: number) {
        this.syncFromHsl();
    }

    @auto({preprocessValue: (value) => trim(value, 100)})
    public set l(value: number) {
        this.syncFromHsl();
    }

    @auto() public set hex(value: string) {
        this.syncFromHex();
    }

    /**
     * @constructor
     * @param {number} r - Red channel (0–255).
     * @param {number} g - Green channel (0–255).
     * @param {number} b - Blue channel (0–255).
     * @param {number} [a=1] - Alpha channel (0–1).
     */
    public constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
        this.syncing = true;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.syncing = false;
        this.syncFromRgb();
    }

    /**
     * @description Returns the color as a CSS `rgb()` string (alpha ignored).
     * @returns {string} - e.g. `"rgb(255 136 0)"`.
     */
    public get rgb(): string {
        return `rgb(${this.r} ${this.g} ${this.b})`;
    }

    /**
     * @description Returns the color as a CSS `rgb()` string with alpha.
     * @returns {string} - e.g. `"rgb(255 136 0 / 0.5)"`.
     */
    public get rgba(): string {
        return `rgb(${this.r} ${this.g} ${this.b} / ${+this.a.toFixed(4)})`;
    }

    /**
     * @description Returns the color as a CSS `hsl()` string (alpha ignored).
     * @returns {string} - e.g. `"hsl(32 100% 50%)"`.
     */
    public get hsl(): string {
        return `hsl(${this.h} ${this.s}% ${this.l}%)`;
    }

    /**
     * @description Returns the color as a CSS `hsl()` string with alpha.
     * @returns {string} - e.g. `"hsl(32 100% 50% / 0.5)"`.
     */
    public get hsla(): string {
        return `hsl(${this.h} ${this.s}% ${this.l}% / ${+this.a.toFixed(4)})`;
    }

    /**
     * @description Returns `rgb()` for opaque colors and `rgb()` with alpha for semi-transparent ones.
     */
    public toString(): string {
        return this.a < 1 ? this.rgba : this.rgb;
    }

    public fromString(value: string): Color {
        return Color.from(value);
    }

    private syncFromRgb(): void {
        if (this.syncing) return;
        this.syncing = true;
        const {h, s, l} = Color.rgbToHsl(this.r, this.g, this.b);
        this.h = h;
        this.s = s;
        this.l = l;
        this.hex = Color.toHexStr(this.r, this.g, this.b, this.a);
        this.syncing = false;
    }

    private syncFromHsl(): void {
        if (this.syncing) return;
        this.syncing = true;
        const {r, g, b} = Color.hslToRgb(this.h, this.s, this.l);
        this.r = r;
        this.g = g;
        this.b = b;
        this.hex = Color.toHexStr(this.r, this.g, this.b, this.a);
        this.syncing = false;
    }

    private syncFromHex(): void {
        if (this.syncing) return;
        const parsed = Color.fromHexString(this.hex);
        if (!parsed) return;
        this.syncing = true;
        this.r = parsed.r;
        this.g = parsed.g;
        this.b = parsed.b;
        this.a = parsed.a;
        const {h, s, l} = Color.rgbToHsl(this.r, this.g, this.b);
        this.h = h;
        this.s = s;
        this.l = l;
        this.syncing = false;
    }

    private syncHex(): void {
        this.syncing = true;
        this.hex = Color.toHexStr(this.r, this.g, this.b, this.a);
        this.syncing = false;
    }

    /**
     * @description Creates a Color from a CSS color string or an existing Color instance.
     * Supports hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), `rgb()`/`rgba()`, and `hsl()`/`hsla()`.
     * Returns `Color(0, 0, 0)` if the string cannot be parsed.
     * @param {string | Color} color - The CSS color string or Color instance to parse.
     * @returns {Color}
     */
    public static from(color: string | Color): Color {
        if (!color) return new Color();
        if (color instanceof Color) return color;

        color = color.trim();
        if (color.startsWith("#")) return Color.fromHexString(color) ?? new Color();
        if (/^hsla?\s*\(/i.test(color)) return Color.fromHslString(color) ?? new Color();
        if (/^rgba?\s*\(/i.test(color)) return Color.fromRgbString(color) ?? new Color();
        return new Color(0, 0, 0);
    }

    /**
     * @description Creates a Color from a hex string (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`).
     * @param {string} hex - The hex color string.
     * @returns {Color | null} - Null if the string is not a valid hex color.
     */
    public static fromHexString(hex: string): Color {
        if (!hex) return new Color();
        const raw = hex.replace(/^#/, "");
        const color = new Color();

        if (raw.length === 3 || raw.length === 4) {
            color.r = parseInt(raw[0] + raw[0], 16);
            color.g = parseInt(raw[1] + raw[1], 16);
            color.b = parseInt(raw[2] + raw[2], 16);
            if (raw.length === 4) color.a = parseInt(raw[3] + raw[3], 16) / 255;
        } else if (raw.length === 6 || raw.length === 8) {
            color.r = parseInt(raw.slice(0, 2), 16);
            color.g = parseInt(raw.slice(2, 4), 16);
            color.b = parseInt(raw.slice(4, 6), 16);
            if (raw.length === 8) color.a = parseInt(raw.slice(6, 8), 16) / 255;
        } else return new Color();

        if (isNaN(color.r) || isNaN(color.g) || isNaN(color.b)) return new Color();
        return color;
    }

    /**
     * @description Creates a Color from HSL components.
     * @param {number} h - Hue, 0–360.
     * @param {number} s - Saturation, 0–100.
     * @param {number} l - Lightness, 0–100.
     * @param {number} [a=1] - Alpha, 0–1.
     * @returns {Color}
     */
    public static fromHsl(h: number, s: number, l: number, a: number = 1): Color {
        const {r, g, b} = Color.hslToRgb(h, s, l);
        return new Color(r, g, b, a);
    }

    /**
     * @description Creates a Color from a CSS `hsl()`/`hsla()` string.
     * Handles both comma-separated (CSS Level 3) and space-separated (CSS Level 4) syntax,
     * with or without `%` signs and `deg` units, and optional alpha via `/` or as a fourth argument.
     * @param {string} color - The HSL color string.
     * @returns {Color | null} - Null if parsing fails.
     */
    public static fromHslString(color: string): Color {
        const inner = color.match(/hsla?\s*\(([^)]+)\)/i)?.[1];
        if (!inner) return new Color();
        const parts = Color.extractNumbers(inner);
        if (parts.length < 3) return new Color();
        return Color.fromHsl(parts[0], parts[1], parts[2], parts[3] ?? 1);
    }

    /**
     * @description Creates a Color from a CSS `rgb()`/`rgba()` string.
     * Handles both comma-separated (CSS Level 3) and space-separated (CSS Level 4) syntax,
     * and optional alpha via `/` or as a fourth argument.
     * @param {string} color - The RGB color string.
     * @returns {Color | null} - Null if parsing fails.
     */
    public static fromRgbString(color: string): Color {
        const inner = color.match(/rgba?\s*\(([^)]+)\)/i)?.[1];
        if (!inner) return new Color();
        const parts = Color.extractNumbers(inner);
        if (parts.length < 3) return new Color();
        return new Color(parts[0], parts[1], parts[2], parts[3] ?? 1);
    }

    /**
     * @description The WCAG 2.1 relative luminance of the color (0 = black, 1 = white).
     * @returns {number}
     */
    public get luminance(): number {
        const lin = (c: number) => {
            c /= 255;
            return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * lin(this.r) + 0.7152 * lin(this.g) + 0.0722 * lin(this.b);
    }

    /**
     * @description Computes the WCAG 2.1 contrast ratio between this color and another.
     * @param {Color | string} other - The color to compare against.
     * @returns {number} - Contrast ratio, 1–21.
     */
    public contrast(other: Color | string): number {
        const l1 = this.luminance, l2 = Color.from(other).luminance;
        return (Math.max(l1, l2) + 0.1) / (Math.min(l1, l2) + 0.1);
    }

    /**
     * @description Returns whichever of the two candidate colors has better contrast against this color.
     * Defaults to black and white if candidates are not provided.
     * @param {Color | string} [dark="#000000"] - The dark candidate.
     * @param {Color | string} [light="#ffffff"] - The light candidate.
     * @returns {Color}
     */
    public bestOverlay(dark: Color | string = "#000000", light: Color | string = "#ffffff"): Color {
        const d = Color.from(dark), l = Color.from(light);
        return this.contrast(l) >= this.contrast(d) ? l : d;
    }

    /**
     * @description Linearly interpolates between this color and another in RGB space.
     * Works regardless of the original format of the input color.
     * @param {Color | string} other - The target color.
     * @param {number} t - Interpolation factor (0 = this, 1 = other).
     * @returns {Color}
     */
    public interpolate(other: Color | string, t: number): Color {
        const c = Color.from(other);
        return new Color(
            this.r + (c.r - this.r) * t,
            this.g + (c.g - this.g) * t,
            this.b + (c.b - this.b) * t,
            this.a + (c.a - this.a) * t,
        );
    }

    /**
     * @description Checks whether this color is equal to another color or CSS color string,
     * comparing all four channels within an optional tolerance.
     * @param {Color | string} other - The color to compare against.
     * @param {number} [tolerance=0] - Maximum allowed difference per channel.
     * @returns {boolean}
     */
    public equals(other: Color | string, tolerance: number = 0): boolean {
        const c = Color.from(other);
        return Math.abs(this.r - c.r) <= tolerance
            && Math.abs(this.g - c.g) <= tolerance
            && Math.abs(this.b - c.b) <= tolerance
            && Math.abs(this.a - c.a) <= tolerance;
    }

    /**
     * @description Linearly interpolates between two colors in RGB space.
     * Accepts any mix of `Color` instances and CSS color strings of any supported format.
     * @param {Color | string} color1 - The start color.
     * @param {Color | string} color2 - The end color.
     * @param {number} t - Interpolation factor (0 = color1, 1 = color2).
     * @returns {Color}
     */
    public static interpolate(color1: Color | string, color2: Color | string, t: number): Color {
        return Color.from(color1).interpolate(color2, t);
    }

    /**
     * @description Interpolates along a multi-stop gradient.
     * `t = 0` returns the first color, `t = 1` returns the last color.
     * @param {(Color | string)[]} colors - Two or more color stops.
     * @param {number} t - Gradient position (0–1).
     * @returns {Color}
     */
    public static gradient(colors: (Color | string)[], t: number): Color {
        if (colors.length === 0) return new Color(0, 0, 0);
        if (colors.length === 1) return Color.from(colors[0]);
        t = Math.max(0, Math.min(1, t));
        const segments = colors.length - 1;
        const index = Math.min(Math.floor(t * segments), segments - 1);
        const localT = t * segments - index;
        return Color.from(colors[index]).interpolate(colors[index + 1], localT);
    }

    /**
     * @description Computes the WCAG 2.1 contrast ratio between two colors.
     * @param {Color | string} color1
     * @param {Color | string} color2
     * @returns {number}
     */
    public static contrast(color1: Color | string, color2: Color | string): number {
        return Color.from(color1).contrast(color2);
    }

    /**
     * @description Computes the WCAG 2.1 relative luminance of a color.
     * @param {Color | string} color
     * @returns {number}
     */
    public static luminance(color: Color | string): number {
        return Color.from(color).luminance;
    }

    /**
     * @description Returns whichever of the two candidates has better contrast against the base color.
     * @param {Color | string} base
     * @param {Color | string} [dark="#000000"]
     * @param {Color | string} [light="#ffffff"]
     * @returns {Color}
     */
    public static bestOverlay(base: Color | string, dark: Color | string = "#000000",
                                   light: Color | string = "#ffffff"): Color {
        return Color.from(base).bestOverlay(dark, light);
    }

    /**
     * @group Utilities
     * @category Random
     */
    public static random(saturation: number | [number, number] = [50, 70], lightness: number | [number, number] = [70, 85]): Color {
        if (typeof saturation != "number" && saturation.length >= 2) saturation = randomFromRange(saturation[0], saturation[1]);
        if (typeof lightness != "number" && lightness.length >= 2) lightness = randomFromRange(lightness[0], lightness[1]);
        return Color.fromHsl(Math.random() * 360, saturation as number, lightness as number);
    }

    private static rgbToHsl(r: number, g: number, b: number): {h: number, s: number, l: number} {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const d = max - min;
        const l = (max + min) / 2;

        if (d === 0) return {h: 0, s: 0, l: Math.round(l * 100)};

        const s = d / (1 - Math.abs(2 * l - 1));
        let h = 0;
        if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else                h = ((r - g) / d + 4) / 6;

        return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
    }

    private static hslToRgb(h: number, s: number, l: number): {r: number, g: number, b: number} {
        s /= 100;
        l /= 100;
        h = ((h % 360) + 360) % 360;

        const C = (1 - Math.abs(2 * l - 1)) * s;
        const X = C * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - C / 2;

        let r1 = 0, g1 = 0, b1 = 0;
        if (h < 60)       { r1 = C; g1 = X; b1 = 0; }
        else if (h < 120) { r1 = X; g1 = C; b1 = 0; }
        else if (h < 180) { r1 = 0; g1 = C; b1 = X; }
        else if (h < 240) { r1 = 0; g1 = X; b1 = C; }
        else if (h < 300) { r1 = X; g1 = 0; b1 = C; }
        else              { r1 = C; g1 = 0; b1 = X; }

        return {
            r: Math.round((r1 + m) * 255),
            g: Math.round((g1 + m) * 255),
            b: Math.round((b1 + m) * 255),
        };
    }

    private static toHexStr(r: number, g: number, b: number, a: number): string {
        const h = (n: number) => Math.round(n).toString(16).padStart(2, "0");
        const base = `#${h(r)}${h(g)}${h(b)}`;
        return a < 1 ? base + h(a * 255) : base;
    }

    private static extractNumbers(str: string): number[] {
        return (str.match(/-?[\d.]+(?:e[+-]?\d+)?/gi) ?? []).map(Number);
    }
}

export {Color};