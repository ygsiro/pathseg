type Point = {
    x: number;
    y: number;
}

abstract class PathSeg {
    private _is_abs: boolean;

    constructor(is_abs: boolean) {
        this._is_abs = is_abs;
    }

    isAbs(): boolean {
        return this._is_abs;
    }

    isRel(): boolean {
        return !this._is_abs;
    }

    toggleAbsRel(pos: Point): void {
        this._is_abs = !this._is_abs;
        this.togglePos(pos);
    }

    abstract command(): string;

    protected abstract togglePos(_pos: Point): void;
}

class ClosePath extends PathSeg {

    constructor(is_abs: boolean) {
        super(is_abs);
    };

    command(): string {
        return this.isAbs() ? "Z" : "z";
    }

    protected togglePos(_pos: Point): void {
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

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    command(): string {
        return this.isAbs() ? "M" : "m"
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

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    command(): string {
        return this.isAbs() ? "L" : "l"
    }
}

class LineHorizontal extends PathSeg {
    x: number

    constructor(is_abs: boolean, x: number) {
        super(is_abs)
        this.x = x
    }

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
        }
        else {
            this.x = this.x + pos.x
        }
    }

    command(): string {
        return this.isAbs() ? "H" : "h"
    }
}

class LineVertical extends PathSeg {
    y: number

    constructor(is_abs: boolean, y: number) {
        super(is_abs)
        this.y = y
    }

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.y = this.y - pos.y
        }
        else {
            this.y = this.y + pos.y
        }
    }

    command(): string {
        return this.isAbs() ? "V" : "v"
    }
}

class CurveCubic extends PathSeg {
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

    protected togglePos(pos: Point): void {
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

    command(): string {
        return this.isAbs() ? "C" : "c"
    }
}

class CurveCubicSmooth extends PathSeg {
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

    protected togglePos(pos: Point): void {
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

    command(): string {
        return this.isAbs() ? "S" : "s"
    }
}


class CurveQuadratic extends PathSeg {
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

    protected togglePos(pos: Point): void {
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

    command(): string {
        return this.isAbs() ? "Q" : "q"
    }
}

class CurveQuadraticSmooth extends PathSeg {
    x: number
    y: number

    constructor(is_abs: boolean, x: number, y: number) {
        super(is_abs)
        this.x = x
        this.y = y
    }

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    command(): string {
        return this.isAbs() ? "T" : "t"
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

    protected togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    command(): string {
        return this.isAbs() ? "A" : "a"
    }
}

class PathSegList {
    private data: Array<PathSeg>

    constructor() {
        this.data = new Array()
    }

    M(x: number, y: number) {
        this.data.push(new Move(true, x, y))
    }

    m(x: number, y: number) {
        this.data.push(new Move(false, x, y))
    }

    L(x: number, y: number) {
        this.data.push(new Line(true, x, y))
    }

    l(x: number, y: number) {
        this.data.push(new Line(false, x, y))
    }

    H(x: number) {
        this.data.push(new LineHorizontal(true, x))
    }

    h(x: number) {
        this.data.push(new LineHorizontal(false, x))
    }

    V(y: number) {
        this.data.push(new LineVertical(true, y))
    }

    v(y: number) {
        this.data.push(new LineVertical(false, y))
    }

    C(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.data.push(new CurveCubic(true, x, y, x1, y1, x2, y2))
    }

    c(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.data.push(new CurveCubic(false, x, y, x1, y1, x2, y2))
    }

    S(x2: number, y2: number, x: number, y: number) {
        this.data.push(new CurveCubicSmooth(true, x, y, x2, y2))
    }

    s(x2: number, y2: number, x: number, y: number) {
        this.data.push(new CurveCubicSmooth(false, x, y, x2, y2))
    }

    Q(x1: number, y1: number, x: number, y: number) {
        this.data.push(new CurveQuadratic(true, x, y, x1, y1))
    }

    q(x1: number, y1: number, x: number, y: number) {
        this.data.push(new CurveQuadratic(false, x, y, x1, y1))
    }

    T(x: number, y: number) {
        this.data.push(new CurveQuadraticSmooth(true, x, y))
    }

    t(x: number, y: number) {
        this.data.push(new CurveQuadraticSmooth(false, x, y))
    }

    Z() {
        this.data.push(new ClosePath(true))
    }

    z() {
        this.data.push(new ClosePath(false))
    }

    clear() {
        this.data.splice(0)
    }
}