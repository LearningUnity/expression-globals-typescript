// import { Comp, Layer, Property } from ".";

import { Camera, Comp, Footage, Layer, Light, Property } from ".";

// const thisComp = new Comp();
// const thisLayer = new Layer();
// const thisProperty = new Property<string>("Property value");

// const transform = thisLayer.transform;

// 声明全局变量 thisComp、thisLayer、thisProperty、transform，这样就可以在任何地方使用这些变量了。
// 但是这样会污染全局变量，不推荐使用。
// 为了避免全局变量污染，可以使用 export {} 来声明一个空的模块，这样就不会污染全局变量了。
// export {};
declare global {

    /*************************** 全局对象、属性和方法（表达式引用） ******************* */
    /**
    * 按照名称检索其他合成。
    * @param name 合成名称
    * @returns 合成
    */
    function comp(name: string): Comp;

    /**
     * 按照名称检索素材项目。
     * @param name 素材项目名称
     * @returns 素材
     */
    function footage(name: string): Footage;

    /**
     * 表示包含表达式的合成。
     * @returns 合成
     */
    const thisComp: Comp;

    /**
     * 表示包含表达式的图层。由于 thisLayer 是默认对象，所以其使用是可选的。例如，以 thisLayer.width 或 width 开头的表达式将生成相同的结果。
     * @returns 图层、光照或相机
     */
    const thisLayer: Layer | Light | Camera;

    /**
     * 表示包含表达式的属性。例如，如果对“旋转”属性编写表达式，则可使用以 thisProperty 开头的表达式来引用“旋转”属性。
     * @returns 属性
     */
    const thisProperty: Property<string>;

    /**
     * 表示合成时间（以秒为单位），将以此计算表达式。
     * @returns 数值
     */
    const time: number;

    /**
     * 返回项目颜色深度值。例如，当每个通道的项目颜色深度为 16 位时，colorDepth 将返回 16。
     * @returns 数值
     */
    const colorDepth: number;

    /**
     * framesPerSecond 值成为其余表达式运行的帧速率。此表达式允许将属性的帧速率设置为低于合成的帧速率。例如，以下表达式使用随机值每秒更新一次属性值：posterizeTime(1); random()
     * @param framesPerSecond 帧速率
     * @returns 数值
     */
    function posterizeTime(framesPerSecond: number): number;

    /**
     * 表示包含表达式的属性在当前时间的值。
     * @returns 数值、数组或字符串
     */
    const value: number | Array<any> | string;


    /********************** 时间转换方法（表达式引用）  ****************** */
    /**
     * 将 t 的值（默认为当前合成时间）转换为整数帧数。每秒的帧数在 fps 参数中指定，该参数默认为当前合成的帧速率 (1.0 / thisComp.frameDuration)。isDuration 参数默认为 False，如果 t 值表示两个时间的差值而非绝对时间，则为 True。绝对时间向下取整到负无穷大；持续时间向远离零的方向舍入（正值向上取整）。
     */
    function timeToFrames(t: number, fps: number, isDuration: boolean): number;

    /**
     * timeToFrames 的反向。返回与必需的 frames 参数对应的时间。它不必是一个整数。有关 fps 参数的说明，请参阅 timeToFrames。
     */
    function framesToTime(frames: number, fps: number): number;

    /**
     * 将 t 的值转换为表示时间码的字符串。有关 t 和 isDuration 参数的说明，请参阅 timeToFrames。timecodeBase 值默认为 30，指定一秒内的帧数。
     */
    function timeToTimecode(t: number, timecodeBase: number, isDuration: boolean): string;

    /**
     * 将 t 转换为表示 NTSC 时间码的字符串。有关 t 和 isDuration 参数的说明，请参阅 timeToFrames。如果 ntscDropFrame 为 False（默认值），则结果字符串为 NTSC 未丢帧时间码。如果 ntscDropFrame 为 True，则结果字符串为 NTSC 丢帧时间码。
     */
    function timeToNTSCTimecode(t: number, ntscDropFrame: boolean, isDuration: boolean): string;

    /**
     * 将 t 的值转换为表示胶片和帧的英尺数的字符串。请参阅 timeToFrames 以了解 t、fps 和 isDuration 参数的说明。framesPerFoot 参数指定一英尺胶片中的帧数。默认为 16，是 35 毫米素材的最常见速率。
     */
    function timeToFeetAndFrames(t: number, fps: number, framesPerFoot: number, isDuration: boolean): string;

    /**
     * 将 t 的值转换为表示采用当前项目设置显示格式的时间的字符串。有关所有参数的定义，请参阅 timeToFrames。
     */
    function timeToCurrentFormat(t: number, fps: number, isDuration: boolean, ntscDropFrame?: boolean): string;

    /**********************  矢量数学方法（表达式引用）  ****************** */
    /** 矢量数学函数是对数组进行运算的全局方法，将其视为数学矢量。与内置 JavaScript 方法（例如 Math.sin）不同，
     *  这些方法不与 Math 前缀一起使用。除非另有说明，否则矢量数学方法对维度的要求是宽松的并返回属于最大输入数
     *  组对象的维度的值，用零填充缺失的元素。例如，表达式 add([10, 20], [1, 2, 3]) 返回 [11, 22, 3]。 */
    /**
     * 添加两个矢量。
     * @param vec1 数组
     * @param vec2 数组
     * @returns 数组
     */
    function add(vec1: number[], vec2: number[]): number[];

    /**
     * 减去两个矢量。
     * @param vec1 数组
     * @param vec2 数组
     * @returns 数组
     */
    function sub(vec1: number[], vec2: number[]): number[];

    /**
     * 将矢量的每个元素与数量相乘。
     * @param vec 数组
     * @param amount 数值
     * @returns 数组
     */
    function mul(vec: number[], amount: number): number[];

    /**
     * 将矢量的每个元素除以该值。
     * @param vec 数组
     * @param amount 数值
     * @returns 数组
     */
    function div(vec: number[], amount: number): number[];

    /**
     * value 的每个组件的值都限定为介于 limit1 和 limit2 相应值的值之间。
     * @param value 数值或数组
     * @param limit1 数值或数组
     * @param limit2 数值或数组
     * @returns 数值或数组
     */
    function clamp(value: number | number[], limit1: number | number[], limit2: number | number[]): number | number[];

    /**
     * 返回矢量参数的点（内）积。
     * @param vec1 数组
     * @param vec2 数组
     * @returns 数值
     */
    function dot(vec1: number[], vec2: number[]): number;

    /**
     * 返回 vec1 和 vec2 的矢量叉积。
     * @param vec1 数组 [2 或 3]
     * @param vec2 数组 [2 或 3]
     * @returns 数组 [2 或 3]
     */
    function cross(vec1: number[], vec2: number[]): number[];

    /**
     * 标准化矢量以使其长度为 1.0。
     * @param vec 数组
     * @returns 数组
     */
    function normalize(vec: number[]): number[];

    /**
     * 返回矢量 vec. 的长度, 与 lib.dom.d.ts 冲突, (length as any)()
     * @param vec 数组
     * @returns 数值
     */
    function length1(vec: number[]): number;

    /**
     * 返回两点之间的距离。point2 参数是可选的。 与 lib.dom.d.ts 冲突, (length as any)()
     * @param point1 数组
     * @param point2 数组
     * @returns 数值
     */
    function length1(point1: number[], point2?: number[]): number;

    /**
     * 参数 fromPoint 是您要定向的图层的世界空间中的位置。参数 atPoint 是您要将图层指向的世界空间中的点。
     * @param fromPoint 数组 [3]
     * @param atPoint 数组 [3]
     * @returns 数组 [3]
     */
    function lookAt(fromPoint: number[], atPoint: number[]): number[];

    /**********************  随机数方法（表达式引用）  ****************** */
    /**
     * 控制数字序列的种子值。
     * @param offset 数值
     * @param timeless 布尔值
     */
    function seedRandom(offset: number, timeless: boolean): void;

    /**
     * 返回范围 0–1 内的随机数。
     * @returns 数值
     */
    function random(): number;

    /**
     * 返回 0 到 maxValOrArray 范围内的数值或数组。
     * @param maxValOrArray 数值或数组
     * @returns 数值或数组
     */
    function random(maxValOrArray: number | number[]): number | number[];

    /**
     * 返回 minValOrArray 到 maxValOrArray 范围内的数值或数组。
     * @param minValOrArray 数值或数组
     * @param maxValOrArray 数值或数组
     * @returns 数值或数组
     */
    function random(minValOrArray: number | number[], maxValOrArray: number | number[]): number | number[];

    /**
     * 返回随机数。结果具有高斯（钟形）分布。
     * @returns 数值
     */
    function gaussRandom(): number;

    /**
     * 返回一个随机数值或数组。结果具有高斯（钟形）分布。
     * @param maxValOrArray 数值或数组
     * @returns 数值或数组
     */
    function gaussRandom(maxValOrArray: number | number[]): number | number[];

    /**
     * 返回随机数或数组。结果具有高斯（钟形）分布。
     * @param minValOrArray 数值或数组
     * @param maxValOrArray 数值或数组
     * @returns 数值或数组
     */
    function gaussRandom(minValOrArray: number | number[], maxValOrArray: number | number[]): number | number[];

    /**
     * 返回范围 -1 到 1 中的数值。噪声实际上不是随机的；它基于柏林噪声。，这意味着相邻的两个输入值的返回值往往也是相邻的。此类噪声在您需要看似随机且相差不会很大的数值序列时（在对任何明显随机的自然运动进行动画制作时通常就如此）非常有用。示例：rotation + 360*noise(time)
     * @param valOrArray 数值或数组 [2 或 3]。
     * @returns 范围 -1 到 1 中的数值。
     */
    function noise(valOrArray: number | number[]): number;
    /**********************  插值方法（表达式引用）  ****************** */
    /** 对于所有“插值”方法，参数 t 通常是 time 或 value，但也可以采用其他值。如果 t 是 time，则值之间的插值会在持续时间内发生。如果 t 是 value，则表达式会将一系列值映射到新系列值。 */
    /**
     * 当 t <= tMin 时返回 value1。当 t >= tMax 时返回 value2。当 tMin < t < tMax 时，返回 value1 和 value2 之间的线性插值。
     * @param t 数值
     * @param tMin 数值
     * @param tMax 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function linear(t: number, tMin: number, tMax: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 当 t 介于 0 到 1 时返回从 value1 到 value2 进行线性插值的值。当 t <= 0 时，返回 value1。当 t >= 1 时，返回 value2。
     * @param t 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function linear(t: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 与具有相同参数的 linear 类似，只不过插值渐进和渐出以使开始点和结束点的速度为 0。此方法会产生一个非常流畅的动画。
     * @param t 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function ease(t: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 与具有相同参数的 linear 类似，只不过插值渐进和渐出以使开始点和结束点的速度为 0。此方法会产生一个非常流畅的动画。
     * @param t 数值
     * @param tMin 数值
     * @param tMax 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function ease(t: number, tMin: number, tMax: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 类似于 ease，只不过切线仅在 value1 一侧为 0，且插值在 value2 一侧是线性的。
     * @param t 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function easeIn(t: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 类似于 ease，只不过切线仅在 tMin 一侧为 0，且插值在 tMax 一侧是线性的。
     * @param t 数值
     * @param tMin 数值
     * @param tMax 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function easeIn(t: number, tMin: number, tMax: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 类似于 ease，只不过切线仅在 value2 一侧为 0，且插值在 value1 一侧是线性的。
     * @param t 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function easeOut(t: number, value1: number | number[], value2: number | number[]): number | number[];

    /**
     * 类似于 ease，只不过切线仅在 tMax 一侧为 0，且插值在 tMin 一侧是线性的。
     * @param t 数值
     * @param tMin 数值
     * @param tMax 数值
     * @param value1 数值或数组
     * @param value2 数值或数组
     * @returns 数值或数组
     */
    function easeOut(t: number, tMin: number, tMax: number, value1: number | number[], value2: number | number[]): number | number[];

    /**********************  颜色转换方法（表达式引用）  ****************** */
    /**
        * 将 RGBA 空间中的颜色转换为 HSLA 空间。
        * @param rgbaArray 数组 [4]
        * @returns 数组 [4]
        */
    function rgbToHsl(rgbaArray: number[]): number[];

    /**
     * 将 HSLA 空间中的颜色转换为 RGBA 空间。
     * @param hslaArray 数组 [4]
     * @returns 数组 [4]
     */
    function hslToRgb(hslaArray: number[]): number[];

    /**********************  其他数学方法（表达式引用）  ****************** */
    /**
     * 将度转换为弧度。
     * @param degrees 数值
     * @returns 数值
     */
    function degreesToRadians(degrees: number): number;

    /**
     * 将弧度转换为度。
     * @param radians 数值
     * @returns 数值
     */
    function radiansToDegrees(radians: number): number;
    /**********************    ****************** */
}