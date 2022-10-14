export type Point = {
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
        this.togglePos(pos);
        this._is_abs = !this._is_abs;
    }

    abstract command(): string;
    abstract arg(digits: number): string;
    abstract nextPos(pos: Point): Point;
    protected abstract togglePos(_pos: Point): void;
}

class ClosePath extends PathSeg {

    constructor(is_abs: boolean) {
        super(is_abs);
    };

    override command(): string {
        return this.isAbs() ? "Z" : "z";
    }

    protected override togglePos(_pos: Point): void {
    }

    override arg(_digits: number): string {
        return this.command()
    }

    override nextPos(_pos: Point): Point {
        throw SyntaxError("Do not call")
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

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override command(): string {
        return this.isAbs() ? "M" : "m"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override command(): string {
        return this.isAbs() ? "L" : "l"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
    }
}

class LineHorizontal extends PathSeg {
    x: number

    constructor(is_abs: boolean, x: number) {
        super(is_abs)
        this.x = x
    }

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
        }
        else {
            this.x = this.x + pos.x
        }
    }

    override command(): string {
        return this.isAbs() ? "H" : "h"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.x.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: pos.y }
        }
        else {
            return { x: this.x + pos.x, y: pos.y }
        }
    }
}

class LineVertical extends PathSeg {
    y: number

    constructor(is_abs: boolean, y: number) {
        super(is_abs)
        this.y = y
    }

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.y = this.y - pos.y
        }
        else {
            this.y = this.y + pos.y
        }
    }

    override command(): string {
        return this.isAbs() ? "V" : "v"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: pos.x, y: this.y }
        }
        else {
            return { x: pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
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

    override command(): string {
        return this.isAbs() ? "C" : "c"
    }

    override arg(digits: number): string {
        return `${this.command()},${this.x1.toFixed(digits)},${this.y1.toFixed(digits)} ${this.x2.toFixed(digits)},${this.y2.toFixed(digits)} ${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
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

    override command(): string {
        return this.isAbs() ? "S" : "s"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.x2.toFixed(digits)},${this.y2.toFixed(digits)} ${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
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

    override command(): string {
        return this.isAbs() ? "Q" : "q"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.x1.toFixed(digits)},${this.y1.toFixed(digits)} ${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override command(): string {
        return this.isAbs() ? "T" : "t"
    }

    override arg(digits: number): string {
        return `${this.command()} ${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
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

    protected override togglePos(pos: Point): void {
        if (this.isAbs()) {
            this.x = this.x - pos.x
            this.y = this.y - pos.y
        }
        else {
            this.x = this.x + pos.x
            this.y = this.y + pos.y
        }
    }

    override command(): string {
        return this.isAbs() ? "A" : "a"
    }

    override arg(digits: number): string {
        return `${this.command()}${this.r1.toFixed(digits)},${this.r2.toFixed(digits)} ${this.angle} ${this.large ? "1" : "0"} ${this.sweep ? "1" : "0"} ${this.x.toFixed(digits)},${this.y.toFixed(digits)}`
    }

    override nextPos(pos: Point): Point {
        if (this.isAbs()) {
            return { x: this.x, y: this.y }
        }
        else {
            return { x: this.x + pos.x, y: this.y + pos.y }
        }
    }
}

export class PathSegList {
    private data: Array<PathSeg>

    private check() {
        if (this.size() == 0) {
            throw SyntaxError("You must start out with the M or m command")
        }
    }

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
        this.check()
        this.data.push(new Line(true, x, y))
    }

    l(x: number, y: number) {
        this.check()
        this.data.push(new Line(false, x, y))
    }

    H(x: number) {
        this.check()
        this.data.push(new LineHorizontal(true, x))
    }

    h(x: number) {
        this.check()
        this.data.push(new LineHorizontal(false, x))
    }

    V(y: number) {
        this.check()
        this.data.push(new LineVertical(true, y))
    }

    v(y: number) {
        this.check()
        this.data.push(new LineVertical(false, y))
    }

    C(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveCubic(true, x, y, x1, y1, x2, y2))
    }

    c(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveCubic(false, x, y, x1, y1, x2, y2))
    }

    S(x2: number, y2: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveCubicSmooth(true, x, y, x2, y2))
    }

    s(x2: number, y2: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveCubicSmooth(false, x, y, x2, y2))
    }

    Q(x1: number, y1: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveQuadratic(true, x, y, x1, y1))
    }

    q(x1: number, y1: number, x: number, y: number) {
        this.check()
        this.data.push(new CurveQuadratic(false, x, y, x1, y1))
    }

    T(x: number, y: number) {
        this.check()
        this.data.push(new CurveQuadraticSmooth(true, x, y))
    }

    t(x: number, y: number) {
        this.check()
        this.data.push(new CurveQuadraticSmooth(false, x, y))
    }

    A(rx: number, ry: number, angle: number, large: boolean, sweep: boolean, x: number, y: number) {
        this.check()
        this.data.push(new Arc(true, x, y, rx, ry, angle, large, sweep))
    }

    a(rx: number, ry: number, angle: number, large: boolean, sweep: boolean, x: number, y: number) {
        this.check()
        this.data.push(new Arc(false, x, y, rx, ry, angle, large, sweep))
    }

    Z() {
        this.check()
        this.data.push(new ClosePath(true))
    }

    z() {
        this.check()
        this.data.push(new ClosePath(false))
    }

    clear() {
        this.data.splice(0)
    }

    size(): number {
        return this.data.length
    }

    currentLoc(): Point {
        let pos: Point = { x: 0, y: 0 }
        let start: Point = pos
        this.data.forEach(seg => {
            if (seg instanceof ClosePath) {
                pos = start
            }
            else {
                pos = seg.nextPos(pos)
                if (seg instanceof Move) {
                    start = pos
                }
            }
        })
        return pos
    }

    arg(digits: number = 1): string {
        const array = new Array<string>()
        this.data.forEach(seg => {
            array.push(seg.arg(digits))
        })
        return array.join("")
    }

    allAbs() {
        let pos: Point = { x: 0, y: 0 }
        let start: Point = pos
        this.data.forEach(seg => {
            if (seg.isRel()) {
                seg.toggleAbsRel(pos)
            }
            if (seg instanceof ClosePath) {
                pos = start
            }
            else {
                pos = seg.nextPos(pos)
                if (seg instanceof Move) {
                    start = pos
                }
            }
        })
    }

    allRel() {
        let pos: Point = { x: 0, y: 0 }
        let start: Point = pos
        this.data.forEach(seg => {
            if (seg.isAbs()) {
                seg.toggleAbsRel(pos)
            }
            if (seg instanceof ClosePath) {
                pos = start
            }
            else {
                pos = seg.nextPos(pos)
                if (seg instanceof Move) {
                    start = pos
                }
            }
        })
    }
}
