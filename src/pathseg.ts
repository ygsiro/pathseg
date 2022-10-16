type Point = {
    x: number
    y: number
}

const numToStr = (num: number, digits: number): string => {
    return num.toFixed(digits).replace(/(\.0+|(?<=\.[1-9]+)0+|(?<=-)0(?=\.))/g, "");
}

abstract class PathSeg {
    private is_abs: boolean;

    constructor(is_abs: boolean) {
        this.is_abs = is_abs;
    }

    isAbs(): boolean { return this.is_abs; }
    isRel(): boolean { return !this.is_abs; }

    toggleAbsRel(pos: Point): void {
        this.toggle(pos);
        this.is_abs = !this.is_abs;
    }

    abstract segStr(_digits: number): string;

    abstract command(): string;
    protected abstract toggle(pos: Point): void;
}

class ClosePath extends PathSeg {
    constructor(is_abs: boolean) {
        super(is_abs)
    }

    override command(): string {
        return this.isAbs() ? "Z" : "z";
    }

    protected toggle(_pos: Point): void {
    }

    override segStr(_digits: number): string {
        return this.command()
    }
}

class Move extends PathSeg {
    x: number
    y: number

    constructor(is_abs: boolean, x: number, y: number) {
        super(is_abs)
        this.x = x
        this.y = y
    }

    override command(): string {
        return this.isAbs() ? "M" : "m";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class Line extends PathSeg {
    x: number
    y: number

    constructor(is_abs: boolean, x: number, y: number) {
        super(is_abs)
        this.x = x
        this.y = y
    }

    override command(): string {
        return this.isAbs() ? "L" : "l";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class Horizontal extends PathSeg {
    x: number

    constructor(is_abs: boolean, x: number) {
        super(is_abs)
        this.x = x
    }

    override command(): string {
        return this.isAbs() ? "H" : "v";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
        }
        else {
            this.x = this.x + pos.x
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x, digits)}`
    }
}

class Vertical extends PathSeg {
    y: number

    constructor(is_abs: boolean, y: number) {
        super(is_abs)
        this.y = y
    }

    override command(): string {
        return this.isAbs() ? "H" : "v";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.y = this.y - pos.y
        }
        else {
            this.y = this.y + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.y, digits)}`
    }
}

class Cubic extends PathSeg {
    x: number
    y: number
    x1: number
    y1: number
    x2: number
    y2: number

    constructor(is_abs: boolean, x: number, y: number, x1: number, y1: number, x2: number, y2: number) {
        super(is_abs)
        this.x = x
        this.y = y
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    override command(): string {
        return this.isAbs() ? "C" : "c";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
            this.x1 = this.x1 - pos.x
            this.y1 = this.y1 - pos.y
            this.x2 = this.x2 - pos.x
            this.y2 = this.y2 - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
            this.x1 = this.x1 + pos.x
            this.y1 = this.y1 + pos.y
            this.x2 = this.x2 + pos.x
            this.y2 = this.y2 + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x1, digits)} ${numToStr(this.y1, digits)} ${numToStr(this.x2, digits)} ${numToStr(this.y2, digits)} ${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class CubicSmooth extends PathSeg {
    x: number
    y: number
    x2: number
    y2: number

    constructor(is_abs: boolean, x: number, y: number, x2: number, y2: number) {
        super(is_abs)
        this.x = x
        this.y = y
        this.x2 = x2
        this.y2 = y2
    }

    override command(): string {
        return this.isAbs() ? "S" : "s";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
            this.x2 = this.x2 - pos.x
            this.y2 = this.y2 - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
            this.x2 = this.x2 + pos.x
            this.y2 = this.y2 + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x2, digits)} ${numToStr(this.y2, digits)} ${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class Quadratic extends PathSeg {
    x: number
    y: number
    x1: number
    y1: number

    constructor(is_abs: boolean, x: number, y: number, x1: number, y1: number) {
        super(is_abs)
        this.x = x
        this.y = y
        this.x1 = x1
        this.y1 = y1
    }

    override command(): string {
        return this.isAbs() ? "Q" : "q";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
            this.x1 = this.x1 - pos.x
            this.y1 = this.y1 - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
            this.x1 = this.x1 + pos.x
            this.y1 = this.y1 + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x1, digits)} ${numToStr(this.y1, digits)} ${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class QuadraticSmooth extends PathSeg {
    x: number
    y: number

    constructor(is_abs: boolean, x: number, y: number) {
        super(is_abs)
        this.x = x
        this.y = y
    }

    override command(): string {
        return this.isAbs() ? "T" : "t";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class Arc extends PathSeg {
    x: number
    y: number
    r1: number
    r2: number
    angle: number
    large: boolean
    sweep: boolean

    constructor(is_abs: boolean, x: number, y: number, r1: number, r2: number, angle: number, large: boolean, sweep: boolean) {
        super(is_abs)
        this.x = x
        this.y = y
        this.r1 = r1
        this.r2 = r2
        this.angle = angle
        this.large = large
        this.sweep = sweep
    }

    override command(): string {
        return this.isAbs() ? "A" : "a";
    }

    override toggle(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override segStr(digits: number): string {
        return `${this.command()}${numToStr(this.r1, digits)} ${numToStr(this.r2, digits)} ${numToStr(this.angle, digits)} ${this.large ? "1":"0"} ${this.sweep ? "1":"0"} ${numToStr(this.x, digits)} ${numToStr(this.y, digits)}`
    }
}

class PathSegList {
    private data: Array<PathSeg>
    constructor() {
        this.data = new Array();
    }

    private check() {
        if (this.data.length == 0) {
            throw SyntaxError("The first command must begin with `M` or `m`");
        }
    }

    Z() {
        this.check();
        this.data.push(new ClosePath(true));
    }

    z() {
        this.check();
        this.data.push(new ClosePath(false));
    }

    M(x: number, y: number) {
        this.data.push(new Move(true, x, y));
    }

    m(x: number, y: number) {
        this.data.push(new Move(false, x, y));
    }

    L(x: number, y: number) {
        this.check();
        this.data.push(new Line(true, x, y));
    }

    l(x: number, y: number) {
        this.check();
        this.data.push(new Line(false, x, y));
    }

    H(x: number) {
        this.check();
        this.data.push(new Horizontal(true, x));
    }

    h(x: number) {
        this.check();
        this.data.push(new Horizontal(false, x));
    }

    V(y: number) {
        this.check();
        this.data.push(new Vertical(true, y));
    }

    v(y: number) {
        this.check();
        this.data.push(new Vertical(false, y));
    }

    C(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.check();
        this.data.push(new Cubic(true, x, y, x1, y1, x2, y2));
    }

    c(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.check();
        this.data.push(new Cubic(false, x, y, x1, y1, x2, y2));
    }

    S(x2: number, y2: number, x: number, y: number) {
        this.check();
        this.data.push(new CubicSmooth(true, x, y, x2, y2));
    }

    s(x2: number, y2: number, x: number, y: number) {
        this.check();
        this.data.push(new CubicSmooth(false, x, y, x2, y2));
    }

    Q(x1: number, y1: number, x: number, y: number) {
        this.check();
        this.data.push(new Quadratic(true, x, y, x1, y1));
    }

    q(x1: number, y1: number, x: number, y: number) {
        this.check();
        this.data.push(new Quadratic(false, x, y, x1, y1));
    }

    T(x: number, y: number) {
        this.check();
        this.data.push(new QuadraticSmooth(true, x, y));
    }

    t(x: number, y: number) {
        this.check();
        this.data.push(new QuadraticSmooth(false, x, y));
    }

    A(rx: number, ry: number, angle: number, large: boolean, sweep: boolean, x: number, y: number) {
        this.check();
        this.data.push(new Arc(true, x, y, rx, ry, angle, large, sweep));
    }

    a(rx: number, ry: number, angle: number, large: boolean, sweep: boolean, x: number, y: number) {
        this.check();
        this.data.push(new Arc(false, x, y, rx, ry, angle, large, sweep));
    }

    clear() {
        this.data.splice(0)
    }

    size(): number {
        return this.data.length
    }
}