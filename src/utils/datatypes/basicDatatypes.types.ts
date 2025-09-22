enum Direction {
    vertical = "vertical",
    horizontal = "horizontal",
}

enum SideH {
    left = "left",
    right = "right",
}

enum SideV {
    top = "top",
    bottom = "bottom",
}
enum Side {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right",
}

enum InOut {
    in = "in",
    out = "out",
}

enum OnOff {
    on = "on",
    off = "off"
}

enum Open {
    open = "open",
    closed = "closed"
}

enum Shown {
    visible = "visible",
    hidden = "hidden",
}

enum AccessLevel {
    public = "public",
    protected = "protected",
    private = "private",
}

enum Range {
    min = "min",
    max = "max",
}

type FlexRect = {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number
};

export {Direction, Side, SideV, SideH, InOut, OnOff, Open, Shown, AccessLevel, Range, FlexRect};