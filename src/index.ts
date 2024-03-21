export type Points = Vector2D[];
export type Vector2D = [x: number, y: number];
export type Vector3D = [x: number, y: number, z: number];
export type Vector = Vector2D | Vector3D;
export type Color = [r: number, g: number, b: number, a: number];
export type NumericValue = number | number[] | Vector | Color;

type MathReturn<
    A extends NumericValue,
    B extends NumericValue
> = A extends number[]
    ? A
    : B extends number[]
    ? B
    : A extends number
    ? B extends number
    ? number
    : Error
    : Error;

export interface PathValue { }

export type SourceData = any[];

// 全局对象、属性和方法

/**
 * 关键帧对象，可以通过属性方法 `property.key()` 访问
 */
export class Key<ValueType extends Value> {
    /**
     * 关键帧的值
     */
    readonly value: ValueType;
    /**
     * 关键帧在时间轴上的位置
     */
    readonly time: number = 0;
    /**
     * 关键帧的索引，例如属性上的第一个关键帧，从0开始计数
     */
    readonly index: number = 1;

    constructor(keyValue: ValueType) {
        this.value = keyValue;
    }
}

export class Project {
    /**
     * 项目的平台特定的绝对文件路径，包括项目文件名。如果项目尚未保存，则返回空字符串。
     */
    readonly fullPath: string = "path/to/project/file";
    /**
     * 项目的每通道位深度，以每通道位数（bpc）表示，如在项目设置 > 色彩管理中设置的那样
     */
    readonly bitsPerChannel: "8" | "16" | "32" = "8";
    /**
     * 项目设置 > 色彩管理中的 Blend Colors Using 1.0 Gamma 选项的状态
     */
    readonly linearBlending: boolean = true;
}

export interface MarkerParam {
    [id: string]: Value;
}

/**
 * 组合或图层标记对象
 */
export class MarkerKey {
    /**
     * 标记的持续时间，以秒为单位。
     */
    readonly duration: number = 0;
    /**
     * 标记对话框中评论字段的内容。
     */
    readonly comment: string = "Marker comment";
    /**
     * 标记对话框中章节字段的内容。
     */
    readonly chapter: string = "Chapter 1";
    /**
     * 标记对话框中URL字段的内容。
     */
    readonly url: string = "URL";
    /**
     * 标记对话框中帧目标字段的内容。
     */
    readonly frameTarget: string = "Frame Target";
    /**
     * 标记对话框中的提示点类型设置。对于事件为true；对于导航为false。
     */
    readonly eventCuePoint: boolean = false;
    /**
     * 标记对话框中提示点名称字段的内容。
     */
    readonly cuePointName: string = "Cue Point Name";
    /**
     * 标记对话框中参数名称和参数值字段的内容。

     例如，如果您有一个名为“背景颜色”的参数，则可以使用以下表达式在最近的标记处访问其值：thisComp.marker.nearestKey(time).parameters["背景颜色"]
     */
    readonly parameters: MarkerParam = {};
    /**
     * 标记是否表示受保护区域
     */
    readonly protectedRegion: boolean = false;
    /**
     * 标记在时间轴上的位置
     */
    readonly time: number = 0;
    /**
     * 标记的索引
     */
    readonly index: number = 1;
}

export class MarkerProperty {
    /**
     * 组合中的总标记数。
     */
    readonly numKeys: number = 1;
    /**
     * @returns 具有指定名称或索引的 `Marker` 对象
     * @param indexOrName 标记的索引或名称（注释字段的值）
     */
    key(indexOrName: number | string): MarkerKey {
        return new MarkerKey();
    }
    /**
     * @returns 最接近时间 `t` 的标记
     * @param t 要获取最接近的时间值
     */
    nearestKey(t: number): MarkerKey {
        return new MarkerKey();
    }
}

export class Comp {
    /**
     * 组合的名称。
     */
    readonly name: string = "Comp Base";
    /**
     * 组合中的图层数量。
     */
    readonly numLayers: number = 1;
    /**
     * 组合在当前帧渲染时使用的相机对象。这个相机不一定是你在合成面板中查看的相机。
     */
    readonly activeCamera: Camera = new Camera();
    /**
     * 标记属性组对象。
     */
    readonly marker?: MarkerProperty = new MarkerProperty();
    /**
     * 组合的宽度（以像素为单位）。
     */
    readonly width: number = 1920;
    /**
     * 组合的高度（以像素为单位）。
     */
    readonly height: number = 1080;
    /**
     * 组合的持续时间（以秒为单位）。
     */
    readonly duration: number = 10;
    /**
     * 时间码是否采用降帧格式。
     */
    readonly ntscDropFrame: boolean = false;
    /**
     * 组合的开始时间（以秒为单位）。
     */
    readonly displayStartTime: number = 0;
    /**
     * 每帧的持续时间（以秒为单位）。
     */
    readonly frameDuration: number = 0.04;
    /**
     * 组合的快门角度（以度为单位）。
     */
    readonly shutterAngle: number = 180;
    /**
     * 组合的背景颜色。
     */
    readonly bgColor: Color = [1, 1, 1, 1];
    /**
     * 组合的像素宽高比。
     */
    readonly pixelAspect: number = 1;
    /**
     * 获取组合中的图层。
     * @param indexOrOtherLayer 要返回的图层的索引或名称，或者使用相对索引时的图层对象
     * @param relIndex 当提供第一个输入的图层时使用，相对于给定图层的相对索引
     * @returns 请求的图层对象
     */
    layer(index: number): Layer;
    layer(name: string): Layer;
    layer(otherLayer: Layer, relativeIndex: number): Layer;
    layer(indexOrOtherLayer: number | string | Layer, relativeIndex?: number) {
        return new Layer();
    }
}

/**
 * 属性组，例如 "Transform"
 */
export class PropertyGroup {
    /**
     * 属性组的名称，例如 `"Transform"`
     */
    readonly name: string = "property group base";
    /**
     * 属性组中的属性数量
     */
    readonly numProperties: number = 1;
    constructor(groupName: string) {
        this.name = groupName;
    }
}

export type Value =
    | string
    | number
    | boolean
    | Vector
    | Vector2D
    | Vector3D
    | Color
    | PathValue;

export class Property<PropertyValueType extends Value> {
    /**
     * 当前时间的时间速度值。对于空间属性（例如位置），它返回切线向量值。结果与属性的维度相同。
     */
    readonly velocity: PropertyValueType;

    /**
     * 一个1D的正速度值，等于属性在默认时间点上的变化速度。此元素仅适用于空间属性。
     */
    readonly speed: PropertyValueType;

    constructor(
        readonly value: PropertyValueType,
        readonly name: string = "Property name"
    ) {
        this.velocity = this.value;
        this.speed = this.value;
    }

    /**
     * 属性上的关键帧数
     */
    readonly numKeys: number = 0;
    /**
     * 属性在其属性组中的索引号
     */
    readonly propertyIndex: number = 0;
    /**
     * @returns 指定索引处的关键帧
     * @param index 要返回的关键帧的索引（例如第一个关键帧为`1`）
     */
    key(index: number): Key<PropertyValueType> {
        return new Key(this.value);
    }
    /**
     * @returns 最接近`t`时间的标记
     * @param t 要获取最接近的标记的时间值
     */
    nearestKey(time: number): Key<PropertyValueType> {
        return new Key(this.value);
    }
    /**
     * @returns 相对于写有表达式的属性的属性组（`PropertyGroup`对象）
     * @param countUp 要向上遍历的属性层次结构级别数，例如`countUp = 1`将返回父级`PropertyGroup`。
     */
    propertyGroup(countUp: number): PropertyGroup {
        return new PropertyGroup("Default property propertyGroup");
    }

    // 数值方法和属性
    // TODO: 如果`PropertyValueType`不是数值类型，这些方法和属性应该是未定义的

    /**
     * 循环从图层的第一个关键帧开始，向前播放到图层的Out点的时间段。循环从图层的In点开始播放。
     * @param type `"cycle"`:（默认）重复指定的时间段。
     * `"pingpong"`: 重复指定的时间段，正向和反向交替进行。
     * `"offset"`: 重复指定的时间段，但每个周期都偏移开始和结束时刻的属性值差异，乘以时间段循环的次数。
     * `"continue"`: 不重复指定的时间段，但根据第一个或最后一个关键帧的速度继续动画属性。
     * @param numKeyframes 确定要循环的时间段：循环的时间段是从第一个关键帧到第numKeyframes+1个关键帧的部分。默认值0表示所有关键帧都循环
     */
    loopIn(
        type: loopType = "cycle",
        numKeyframes: number = 0
    ): PropertyValueType {
        return this.value;
    }
    /**
     * 循环从图层的最后一个关键帧开始，向后播放到图层的In点的时间段。循环播放直到图层的Out点。
     * @param type `"cycle"`:（默认）重复指定的时间段。
     * `"pingpong"`: 重复指定的时间段，正向和反向交替进行。
     * `"offset"`: 重复指定的时间段，但每个周期都偏移开始和结束时刻的属性值差异，乘以时间段循环的次数。
     * `"continue"`: 不重复指定的时间段，但根据第一个或最后一个关键帧的速度继续动画属性。
     * @param numKeyframes 确定要循环的时间段：循环的时间段是从最后一个关键帧到`thisProperty.numKeys - numKeyframes`关键帧的部分。默认值0表示所有关键帧都循环
     */
    loopOut(
        type: loopType = "cycle",
        numKeyframes: number = 0
    ): PropertyValueType {
        return this.value;
    }
    /**
     * 循环从图层的第一个关键帧开始，向前播放到图层的Out点的时间段。循环从图层的In点开始播放。
     * @param type `"cycle"`:（默认）重复指定的时间段。
     * `"pingpong"`: 重复指定的时间段，正向和反向交替进行。
     * `"offset"`: 重复指定的时间段，但每个周期都偏移开始和结束时刻的属性值差异，乘以时间段循环的次数。
     * `"continue"`: 不重复指定的时间段，但根据第一个或最后一个关键帧的速度继续动画属性。
     * @param duration 要循环的段的组合秒数；指定的范围是从第一个关键帧开始测量的
     */
    loopInDuration(
        type: loopType = "cycle",
        duration: number = 0
    ): PropertyValueType {
        return this.value;
    }
    /**
     * 循环从图层的最后一个关键帧开始，向后播放到图层的In点的时间段。循环播放直到图层的Out点。
     * @param type `"cycle"`:（默认）重复指定的时间段。
     * `"pingpong"`: 重复指定的时间段，正向和反向交替进行。
     * `"offset"`: 重复指定的时间段，但每个周期都偏移开始和结束时刻的属性值差异，乘以时间段循环的次数。
     * `"continue"`: 不重复指定的时间段，但根据第一个或最后一个关键帧的速度继续动画属性。
     * @param duration 要循环的段的组合秒数；指定的范围是从最后一个关键帧开始向后测量的。
     */
    loopOutDuration(
        type: loopType = "cycle",
        duration: number = 0
    ): PropertyValueType {
        return this.value;
    }

    /**
     * @returns 指定时间的时间速度值。对于空间属性（例如位置），它返回切线向量值。结果与属性的维度相同。
     * @param time 以秒为单位的组合时间，用于获取速度
     */
    velocityAtTime(time: number): PropertyValueType {
        return this.velocity;
    }
    /**
     * @returns 一个1D的正速度值，等于在指定时间点属性的变化速度。此元素仅适用于空间属性。
     * @param time 以秒为单位的组合时间，用于获取速度
     */
    speedAtTime(time: number): PropertyValueType {
        return this.speed;
    }
    /**
     * 返回指定时间的属性值
     * @param time 以秒为单位的组合时间，用于获取值
     */
    valueAtTime(time: number): PropertyValueType {
        return this.value;
    }
    /**
     * 随机修改属性值随时间变化。
     * @param freq 值每秒变化的频率，以wiggle为单位
     * @param amp 值的变化幅度，以原始属性值为单位（例如，`1`表示原始值的100%）
     * @param octaves wiggle的细节程度，由要相乘的噪声的“octaves”数量驱动。较高的值将具有更多的细节
     * @param amp_mult 每个octave相乘的给定振幅的量，控制上层谐波（“octaves”）的衰减。
     * @param time 用于在wiggle内部采样值的时间
     */
    wiggle(
        freq: number,
        amp: number,
        octaves: number = 1,
        amp_mult: number = 0.5,
        time: number = 0
    ): PropertyValueType {
        const som = freq + amp + octaves + amp_mult + time;
        return this.value;
    }
    /**
     * 在时间上对属性值进行采样，时间会发生波动
     * @param freq 值每秒变化的频率，以wiggle为单位
     * @param amp 值的变化幅度，以原始属性值为单位（例如，`1`表示原始值的100%）
     * @param octaves wiggle的细节程度，由要相乘的噪声的“octaves”数量驱动。较高的值将具有更多的细节
     * @param amp_mult 每个octave相乘的给定振幅的量，控制上层谐波（“octaves”）的衰减。
     * @param time 用于在wiggle内部采样值的时间
     */
    temporalWiggle(
        freq: number,
        amp: number,
        octaves: number = 1,
        amp_mult: number = 0.5,
        time: number = 0
    ): PropertyValueType {
        return this.value;
    }
    /**
     * 平滑属性值随时间的变化，将值的大而短暂的偏差转换为更小、更均匀分布的偏差。通过在指定时间的属性值上应用盒子滤波器来实现这种平滑。
     * @param width 平均滤波器的时间范围（以秒为单位）。
     * @param samples 均匀分布在时间上的离散样本数；对于更大的平滑度（但性能降低），请使用较大的值。通常，您希望samples是一个奇数，以便当前时间的值包含在平均值中。
     */
    smooth(
        width: number = 0.2,
        samples: number = 5,
        time: number = 0
    ): PropertyValueType {
        return this.value;
    }
}

export class PathProperty extends Property<PathValue> {
    /**
     * 从一组点和切线创建路径对象。
     * @param points 表示路径点的x，y坐标的数字对数组。数组长度必须至少为1，并且可以是任意长度。
     * @param inTangents 包含表示路径点切线处理的`[x,y]`偏移坐标的数字对数组。除非不传递任何参数（即`createPath()`），否则必填。数组长度必须与points相同，或者可以传递一个空数组（`[]`），它将假定与points相同的长度，并且所有切线都为`[0,0]`。
     * @param outTangents 参见`inTangents`
     * @param isClosed 确定路径是否闭合。如果为true，则最后一个点将连接到第一个点。
     */
    createPath(
        points: Points = [
            [0, 0],
            [100, 0],
            [100, 100],
            [0, 100],
        ],
        inTangents: Points | [] = [],
        outTangents: Points | [] = [],
        is_closed: boolean = true
    ): PathValue {
        return points;
    }
    /**
     * @returns 路径是否闭合（最后一个点连接到第一个点）
     */
    isClosed(): boolean {
        return true;
    }
    /**
     * 获取路径的点数组
     * @param time 要采样路径的时间
     */
    points(time: number = 0): Points {
        return [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
    }
    /**
     * 获取路径的切入切线点数组
     * @param time 要采样路径的时间
     */
    inTangents(time?: number): Points {
        return [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
    }
    /**
     * 获取路径的切出切线点数组
     * @param time 要采样路径的时间
     */
    outTangents(time?: number): Points {
        return [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
    }
    /**
     * 获取路径上任意点的x，y坐标。
     * @param percentage 要获取点的路径百分比，介于0和1之间。
     * @param time 要采样路径的时间
     */
    pointOnPath(percentage: number = 0.5, time: number = 0): Vector2D {
        return [0, 0];
    }
    /**
     * 获取路径上任意点的出切线处理的计算x，y坐标。
     * @param percentage 要获取点的路径百分比，介于0和1之间。
     * @param time 要采样路径的时间
     */
    tangentOnPath(percentage?: number, time?: number): Vector2D {
        return [0, 0];
    }
    /**
     * 获取路径上任意点的法线的计算x，y坐标。
     * @param percentage 要获取点的路径百分比，介于0和1之间。
     * @param time 要采样路径的时间
     */
    normalOnPath(percentage?: number, time?: number): Vector2D {
        return [0, 0];
    }
    constructor(value: PathValue = {}) {
        super(value);
    }
}

export type loopType = "cycle" | "pingpong" | "offset" | "continue";

export class Transform extends PropertyGroup {
    constructor() {
        super("Transform");
    }
    /**
     * The anchor point value of the layer in the coordinate system of the layer (layer space).
     */
    readonly anchorPoint: Property<Vector> = new Property([0, 0], "Anchor Point");
    /**
     * The position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
     */
    readonly position: Property<Vector> = new Property([0, 0], "Position");
    /**
     * The x position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
     */
    readonly xPosition: Property<number> = new Property(0, "X Position");
    /**
     * The y position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
     */
    readonly yPosition: Property<number> = new Property(0, "Y Position");
    /**
     * The z position value of the layer, in world space if the layer has no parent. If the layer has a parent, it returns the position value of the layer in the coordinate system of the parent layer (in the layer space of the parent layer).
     */
    readonly zPosition: Property<number> = new Property(0, "Z Position");
    /**
     * The scale value of the layer, expressed as a percentage.
     */
    readonly scale: Property<Vector> = new Property([0, 0], "Scale");
    /**
     * Returns the rotation value of the layer in degrees. For a 3D layer, it returns the z rotation value in degrees.
     */
    readonly rotation: Property<number> = new Property(0, "Rotation");
    /**
     * Returns the 3D orientation value, in degrees, for a 3D layer.
     */
    readonly orientation?: Property<Vector3D> = new Property(
        [0, 0, 0],
        "Orientation"
    );
    /**
     * Returns the x rotation value, in degrees, for a 3D layer.
     */
    readonly rotationX?: Property<number> = new Property(0, "X Rotation");
    /**
     * Returns the y rotation value, in degrees, for a 3D layer.
     */
    readonly rotationY?: Property<number> = new Property(0, "Y Rotation");
    /**
     * Returns the z rotation value, in degrees, for a 3D layer.
     */
    readonly rotationZ?: Property<number> = new Property(0, "Z Rotation");
}

export class TextStyle {
    /**
     * 样式的字体大小
     */
    fontSize: number = 0;
    /**
     * 设置样式的字体大小
     * @param fontSize 字体大小（以像素为单位）
     */
    setFontSize(fontSize: number): TextStyle {
        this.fontSize = fontSize;
        return this;
    }
    /**
     * 样式的字体
     */
    font: string = "Arial";
    /**
     * 设置样式的字体
     * @param font 要设置的字体
     */
    setFont(font: string): TextStyle {
        this.font = font;
        return this;
    }
    /**
     * 设置sourceText属性的文本内容，用于在返回`style`对象的同时设置`value`
     * @param text 要设置的字符串
     */
    setText(text: string): TextStyle {
        return this;
    }
    /**
     * 样式是否启用伪粗体
     */
    isFauxBold: boolean = false;
    /**
     * 设置样式的伪粗体属性
     */
    setFauxBold(isFauxBold: boolean): TextStyle {
        this.isFauxBold = isFauxBold;
        return this;
    }
    /**
     * 样式是否启用伪斜体
     */
    isFauxItalic: boolean = false;
    /**
     * 设置样式的伪斜体属性
     */
    setFauxItalic(isFauxItalic: boolean): TextStyle {
        this.isFauxItalic = isFauxItalic;
        return this;
    }
    /**
     * 样式是否启用全部大写
     */
    isAllCaps: boolean = false;
    /**
     * 设置样式的全部大写属性
     */
    setAllCaps(isAllCaps: boolean): TextStyle {
        this.isAllCaps = isAllCaps;
        return this;
    }
    /**
     * 样式是否启用小型大写
     */
    isSmallCaps: boolean = false;
    /**
     * 设置样式的小型大写属性
     */
    setSmallCaps(isSmallCaps: boolean): TextStyle {
        this.isSmallCaps = isSmallCaps;
        return this;
    }
    /**
     * 样式的字符间距
     */
    tracking: number = 0;
    /**
     * 设置样式的字符间距
     */
    setTracking(tracking: number): TextStyle {
        this.tracking = tracking;
        return this;
    }
    /**
     * 样式的行间距
     */
    leading: number = 60;
    /**
     * 设置样式的行间距
     */
    setLeading(leading: number): TextStyle {
        this.leading = leading;
        return this;
    }
    /**
     * 样式是否启用自动行间距
     */
    autoLeading: boolean = false;
    /**
     * 设置样式的自动行间距属性
     */
    setAutoLeading(autoLeading: boolean): TextStyle {
        this.autoLeading = autoLeading;
        return this;
    }
    /**
     * 样式的基线偏移量
     */
    baselineShift: number = 0;
    /**
     * 设置样式的基线偏移量
     * @param baselineShift 要设置的基线偏移量
     */
    setBaselineShift(baselineShift: number): TextStyle {
        this.baselineShift = baselineShift;
        return this;
    }
    /**
     * 样式是否应用填充
     */
    applyFill: boolean = true;
    /**
     * 启用或禁用样式的填充
     */
    setApplyFill(applyFill: boolean): TextStyle {
        this.applyFill = applyFill;
        return this;
    }
    /**
     * 样式的填充颜色
     */
    fillColor: [number, number, number] = [1, 1, 1];
    /**
     * 设置样式的填充颜色
     * @param fillColor 要设置的颜色
     */
    setFillColor(fillColor: [number, number, number]): TextStyle {
        this.fillColor = fillColor;
        return this;
    }
    /**
     * 样式是否应用描边
     */
    applyStroke: boolean = false;
    /**
     * 启用或禁用样式的描边
     */
    setApplyStroke(applyStroke: boolean): TextStyle {
        this.applyStroke = applyStroke;
        return this;
    }
    /**
     * 样式的描边颜色
     */
    strokeColor: [number, number, number] = [1, 1, 1];
    /**
     * 设置样式的描边颜色
     * @param strokeColor 要设置的颜色
     */
    setStrokeColor(strokeColor: [number, number, number]): TextStyle {
        this.strokeColor = strokeColor;
        return this;
    }
    /**
     * 样式的描边宽度
     */
    strokeWidth: number = 0;
    /**
     * 设置样式的描边宽度
     * @param strokeWidth 要设置的描边宽度
     */
    setStrokeWidth(strokeWidth: number): TextStyle {
        this.strokeWidth = strokeWidth;
        return this;
    }
}

export class SourceText extends Property<string> {
    constructor(value: string) {
        super(value);
    }
    style = new TextStyle();
    /**
     * 获取指定字符索引处文本属性的样式对象
     * @param characterIndex 要获取样式的字符索引
     * @param sampleTime 要获取样式的时间，默认为当前时间
     */
    getStyleAt(characterIndex: number, sampleTime: number = 0) {
        return this.style;
    }
    /**
     * 创建一个新的样式对象，而不是引用和修改现有的样式对象。
     * @returns 一个空的样式对象
     */
    createStyle() {
        return new TextStyle();
    }
}

export class TextPathOptions extends PropertyGroup {
    constructor() {
        super("Path Options");
    }
    readonly path: string | undefined = "Mask 1";
    readonly reversePath?: boolean = false;
    readonly perpendicularToPath?: Property<boolean> = new Property(
        false,
        "Perpendicular To Path"
    );
    readonly forceAlignment?: Property<boolean> = new Property(
        false,
        "Force Alignment"
    );
    readonly firstMargin?: Property<number> = new Property(0, "First Margin");
    readonly lastMargin?: Property<number> = new Property(0, "Last Margin");
}

export class TextMoreOptions extends PropertyGroup {
    constructor() {
        super("More Options");
    }
    readonly anchorPointGrouping: number = 1;
    readonly groupingAlignment: Property<[number, number]> = new Property(
        [0, 0],
        "Grouping Alignment"
    );
    readonly fillAndStroke: number = 1;
    readonly interCharacterBlending: number = 1;
}

export class Text extends PropertyGroup {
    constructor() {
        super("Text");
    }
    readonly sourceText: SourceText = new SourceText("Source text value");
    readonly pathOption: TextPathOptions = new TextPathOptions();
    readonly moreOption: TextMoreOptions = new TextMoreOptions();
}

export class MaterialOptions extends PropertyGroup {
    constructor() {
        super("Material Options");
    }
    readonly lightTransmission: Property<number> = new Property(
        0,
        "Light Transmission"
    );
    readonly castShadows: Property<boolean> = new Property(false, "Cast Shadows");
    readonly acceptsShadows: Property<boolean> = new Property(
        false,
        "Accept Shadows"
    );
    readonly acceptsLights: Property<boolean> = new Property(
        false,
        "Accepts Lights"
    );
    readonly ambient: Property<number> = new Property(100, "Ambient");
    readonly diffuse: Property<number> = new Property(100, "Diffuse");
    readonly specular: Property<number> = new Property(100, "Specular");
    readonly shininess: Property<number> = new Property(100, "Shininess");
    readonly metal: Property<number> = new Property(100, "Metal");
}

export class Effects extends PropertyGroup { }

export class Masks extends PropertyGroup { }

export class SourceRect {
    readonly top: number = 0;
    readonly left: number = 0;
    readonly width: number = 100;
    readonly height: number = 100;
}

export class Effect {
    /**
     * 返回true，如果效果被打开
     */
    active: boolean = true;
    /**
     * @returns 效果内的属性，例如 `"Slider"`
     * @param nameOrIndex 要获取的属性的名称或索引
     */
    param(nameOrIndex: string | number): Property<string> {
        return new Property<string>("Effect Param");
    }
}

// 作为接口的重复声明，以添加一个调用签名，用于效果。这样可以启用 layer.effect("")("") 语法
export interface Effect {
    /**
     * @returns 效果内的属性，例如 `"Slider"`
     * @param nameOrIndex 要获取的属性的名称或索引
     */
    (nameOrIndex: string | number): Property<string>;
}

export class Mask {
    /**
     * 作为百分比的遮罩不透明度值
     */
    readonly maskOpacity: Property<number> = new Property(100, "Mask Opacity");
    /**
     * 作为像素的遮罩羽化值
     */
    readonly maskFeather: Property<number> = new Property(100, "Mask Feather");
    /**
     * 作为像素的遮罩扩展值
     */
    readonly maskExpansion: Property<number> = new Property(0, "Mask Expansion");
    /**
     * 如果遮罩是反转的，则为true；否则为false
     */
    readonly invert: Property<boolean> = new Property(false, "Invert");
}

export class Light {
    /**
     * 光源在世界空间中的关注点值
     */
    readonly pointOfInterest: Property<Vector3D> = new Property(
        [0, 0, 0],
        "Point of Interest"
    );
    /**
     * 光源的强度值，作为百分比
     */
    readonly intensity: Property<number> = new Property(100, "Intensity");
    /**
     * 光源的颜色值
     */
    readonly color: Property<Color> = new Property([1, 1, 1, 1], "Color");
    /**
     * 光源的阴影深度值，作为百分比
     */
    readonly shadowDarkness: Property<number> = new Property(
        100,
        "Shadow Darkness"
    );
    /**
     * 光源的阴影扩散值，作为像素
     */
    readonly shadowDiffusion: Property<number> = new Property(
        0,
        "Shadow Diffusion"
    );
    readonly coneAngle?: Property<number> = new Property(90, "Cone Angle");
    readonly coneFeather?: Property<number> = new Property(50, "Cone Feather");
}

export class Camera {
    /**
     * 相机在世界空间中的关注点值
     */
    readonly pointOfInterest: Property<Vector3D> = new Property(
        [0, 0, 0],
        "Point of Interest"
    );
    /**
     * 相机的缩放值，以像素为单位
     */
    readonly zoom: Property<number> = new Property(1000, "Zoom");
    /**
     * 如果相机的景深属性打开，则返回1；否则返回0。
     */
    readonly depthOfField: Property<number> = new Property(1, "Depth of Field");
    /**
     * 相机的焦距值，以像素为单位。
     */
    readonly focusDistance: Property<number> = new Property(
        1000,
        "焦距"
    );
    /**
     * 相机的光圈值，以像素为单位。
     */
    readonly aperture: Property<number> = new Property(4, "Aperture");
    /**
     * 相机的模糊级别值，作为百分比。
     */
    readonly blurLevel: Property<number> = new Property(100, "Blur Level");
    /**
     * 如果相机是当前时间下合成的活动相机，则返回true：相机图层的视频开关打开，当前时间在相机图层的入点和出点之间，并且它是时间轴面板中列出的第一个（最上面的）这样的相机图层。否则返回false。
     */
    readonly active: boolean = true;
}

const thisComp = new Comp();

export class Layer {
    /**
     * 表达式计算时的组合时间，以秒为单位。
     */
    readonly time: number = 0;
    /**
     * 项目的颜色深度值。例如，当项目的颜色深度为每通道16位时，colorDepth返回16。
     */
    readonly colorDepth: number = 8;
    /**
     * 图层的名称
     */
    readonly name: string = "Layer name";
    /**
     * 图层的源Comp或源Footage对象。默认时间调整为源中的时间
     */
    readonly source?: Comp | Footage = thisComp;
    /**
     * 图层的宽度（以像素为单位），与`source.width`相同
     */
    readonly width: number = 1920;
    /**
     * 图层的高度（以像素为单位），与`source.height`相同
     */
    readonly height: number = 1080;
    /**
     * 图层在组合中的索引号
     */
    readonly index: number = 0;
    /**
     * 图层的父图层对象，如果有的话
     */
    readonly parent?: Layer | Light | Camera = undefined;
    /**
     * 图层是否有父图层
     */
    readonly hasParent: boolean = true;
    /**
     * 图层的入点，以秒为单位
     */
    readonly inPoint: number = 0;
    /**
     * 图层的出点，以秒为单位
     */
    readonly outPoint: number = 1;
    /**
     * 图层的开始时间，以秒为单位
     */
    readonly startTime: number = 0;
    /**
     * 图层是否有视频数据
     */
    readonly hasVideo: boolean = true;
    /**
     * 图层是否有音频数据
     */
    readonly hasAudio: boolean = true;
    /**
     * 视频开关是否启用，并且当前时间在图层的`inPoint`和`outPoint`之间
     */
    readonly active: boolean = true;
    /**
     * 图层的视频开关是否启用
     */
    readonly enabled: boolean = true;
    /**
     * 音频开关是否启用，并且当前时间在图层的`inPoint`和`outPoint`之间
     */
    readonly audioActive?: boolean = true;
    /**
     * 图层的音频级别属性值，以分贝为单位。该值是一个2D值；第一个值表示左音频通道，第二个值表示右音频通道。该值不是源素材的音频轨道的振幅。相反，它是音频级别属性的值，可能受到关键帧的影响。
     */
    readonly audioLevels?: Property<Vector2D> = new Property(
        [0, 0],
        "音频级别"
    );
    /**
     * 时间重映射属性的值，以秒为单位，如果启用了时间重映射。
     */
    readonly timeRemap?: Property<number> = new Property(0, "Time Remap");
    /**
     * 标记属性组对象
     */
    readonly marker?: MarkerProperty = new MarkerProperty();
    /**
     * 变换属性组对象
     */
    readonly transform: Transform = new Transform();
    /**
     * 文本属性组对象
     */
    readonly text?: Text = new Text();
    /**
     * 材质选项属性组对象
     */
    readonly materialOption?: MaterialOptions = new MaterialOptions();
    /**
     * 将给定向量从图层空间转换为组合空间
     *
     * @param vec 要转换的向量
     * @param time 要采样的时间
     * @returns 组合空间中的向量
     */
    toComp<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    /**
     * 将给定向量从组合空间转换为图层空间
     *
     * @param vec 要转换的向量
     * @param time 要采样的时间
     * @returns 图层空间中的向量
     */
    fromComp<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    /**
     * 将给定向量从图层空间转换为与视图无关的世界空间
     *
     * @param vec 要转换的向量
     * @param time 要采样的时间
     * @returns 世界空间中的向量
     */
    toWorld<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    toCompVec<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    fromCompVec<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    toWorldVec<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    fromWorldVec<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    /**
     * 将位于组合空间中的点投影到图层表面（零 z 值）上的点，该点在从活动摄像机视角观察时出现的位置。
     *
     * @param vec 要转换的向量
     * @param time 要采样的时间
     * @returns 图层表面空间中的向量
     */
    fromCompToSurface<VectorType extends Vector | Vector2D | Vector3D>(
        vec: VectorType,
        time: number = this.time
    ): VectorType {
        return vec;
    }
    /**
     * 获取给定时间的图层源项目
     * @param time 要获取源的时间
     * @returns 源项目
     */
    sourceTime?(time: number = this.time): Footage {
        return new Footage();
    }
    /**
     * 获取给定时间的图层的大小和位置
     * @param time 要获取图层边界的时间
     * @param includeExtents 是否包括边界框之外的区域。适用于形状图层和段落文本。
     * @returns 一个对象，包含给定时间的图层的 `top`、`left`、`width` 和 `height` 值的属性。
     */
    sourceRectAtTime(
        time: number = this.time,
        includeExtents: boolean = false
    ): SourceRect {
        return new SourceRect();
    }
    /**
     * 获取具有给定名称或索引的图层上的效果。
     * @param nameOrIndex 效果的名称或索引
     * @returns 具有给定名称或索引的第一个效果
     */
    effect(nameOrIndex: number | string): Effect {
        return new Effect();
    }
    /**
     * 获取具有给定名称或索引的图层上的蒙版。
     * @param nameOrIndex 蒙版的名称或索引
     * @returns 具有给定名称或索引的第一个蒙版
     */
    mask(nameOrIndex: number | string): Mask {
        return new Mask();
    }
    /**
     * 在给定点处对图层进行采样
     * @param point 采样区域的中心点，以图层空间为单位
     * @param radius 定义采样区域的大小，从中心点开始的水平和垂直距离
     * @param postEffect 是否在应用效果和蒙版后对图层进行采样
     * @param time 要采样的时间
     * @returns 采样区域内图层的平均颜色
     */
    sampleImage(
        point: Vector2D,
        radius: Vector2D = [0.5, 0.5],
        postEffect: boolean = true,
        time: number = this.time
    ): Color {
        return [0, 0, 0, 0];
    }
    /**
     * 将给定角度值转换为弧度
     * @param degrees 要转换的值
     * @returns 弧度值
     */
    degreesToRadians(degrees: number): number {
        return degrees;
    }
    /**
     * 将给定弧度值转换为角度
     * @param radians 要转换的值
     * @returns 角度值
     */
    radiansToDegrees(radians: number): number {
        return radians;
    }
    /**
     * 获取具有提供的名称的素材对象
     * @param name 素材项的文件名
     * @returns 相应的素材项
     */
    footage(name: string): Footage {
        return new Footage();
    }
    /**
     * 按名称检索合成
     * @param name 合成的名称
     * @returns 具有给定名称的合成
     */
    comp(name: string): Comp {
        return thisComp;
    }
    /**
     * 将给定时间值转换为帧数的整数值
     * @param t 要转换的时间（以秒为单位）
     * @param fps 用于计算的每秒帧数，默认为合成的帧速率
     * @param isDuration 是否表示持续时间而不是绝对时间。持续时间会向远离零的方向舍入，而不是向下舍入。
     * @returns 帧数
     */
    timeToFrames(
        t: number = this.time + thisComp.displayStartTime,
        fps: number = 1.0 / thisComp.frameDuration,
        isDuration: boolean = false
    ): number {
        return Math.floor(t * fps);
    }
    /**
     * 将帧数转换为秒数
     * @param frames 要转换的帧数
     * @param fps 用于计算的每秒帧数
     * @returns 给定帧数的时间
     */
    framesToTime(
        frames: number,
        fps: number = 1.0 / thisComp.frameDuration
    ): number {
        return frames * thisComp.frameDuration;
    }
    /**
     * 将给定时间值转换为时间码字符串（例如 `"00:00:00:00"`）
     * @param t 要转换的时间
     * @param timecodeBase 用于计算的每秒帧数
     * @param isDuration 是否表示持续时间而不是绝对时间。持续时间会向远离零的方向舍入，而不是向下舍入。
     * @returns 时间码字符串
     */
    timeToTimecode(
        t: number = this.time + thisComp.displayStartTime,
        timecodeBase: number = 30,
        isDuration: boolean = false
    ): string {
        return "00:00:00:00";
    }
    /**
     * 将给定时间值转换为NTSC时间码字符串
     * @param t 要转换的时间
     * @param ntscDropFrame 是否使用NTSC的跳帧格式
     * @param isDuration 是否表示持续时间而不是绝对时间。持续时间会向远离零的方向舍入，而不是向下舍入。
     */
    timeToNTSCTimecode(
        t: number = this.time + thisComp.displayStartTime,
        ntscDropFrame: boolean = false,
        isDuration: boolean = false
    ) {
        return "00:00:00:00";
    }
    /**
     * 将给定时间值转换为表示电影英尺和帧的字符串
     * @param t 要转换的时间
     * @param fps 用于转换的帧速率
     * @param framesPerFoot 一英尺电影中的帧数
     * @param isDuration 是否表示持续时间而不是绝对时间。持续时间会向远离零的方向舍入，而不是向下舍入。
     */
    timeToFeetAndFrames(
        t: number = this.time + thisComp.displayStartTime,
        fps: number = 1.0 / thisComp.frameDuration,
        framesPerFoot: number = 16,
        isDuration: boolean = false
    ): string {
        return "00:00:00:00";
    }
    /**
     * 将给定时间值转换为当前项目的时间显示格式字符串
     * @param t 要转换的时间
     * @param fps 用于转换的帧速率
     * @param isDuration 是否表示持续时间而不是绝对时间。持续时间会向远离零的方向舍入，而不是向下舍入。
     * @param ntscDropFrame 是否使用NTSC的跳帧格式
     */
    timeToCurrentFormat(
        t: number = this.time + thisComp.displayStartTime,
        fps: number = 1.0 / thisComp.frameDuration,
        isDuration: boolean = false,
        ntscDropFrame: boolean = thisComp.ntscDropFrame
    ): string {
        return "0000";
    }

    /**
 * 添加两个向量
 */
    add<A extends NumericValue, B extends NumericValue>(
        a: A,
        b: B
    ): MathReturn<A, B> {
        return a as any;
    }
    /**
     * 减去两个向量
     */
    sub<A extends NumericValue, B extends NumericValue>(
        a: A,
        b: B
    ): MathReturn<A, B> {
        return a as any;
    }
    /**
     * 用给定的标量数量乘以一个向量
     * @param vec1 要乘的向量
     * @param amount 乘的数量
     */
    mul<VectorType extends number | Vector | Vector2D | Vector3D>(
        vec1: VectorType,
        amount: number
    ): VectorType {
        return vec1;
    }
    /**
     * 用给定的标量数量除以一个向量
     * @param vec1 要除的向量
     * @param amount 除的数量
     */
    div<VectorType extends number | Vector | Vector2D | Vector3D>(
        vec1: VectorType,
        amount: number
    ): VectorType {
        return vec1;
    }
    /**
     * 将给定的数字或数组的每个元素限制在给定的范围内
     * @param value 要限制的数组或数字
     * @param limit1 下限
     * @param limit2 上限
     */
    clamp<T extends number | number[]>(
        value: T,
        limit1: number,
        limit2: number
    ): T {
        return value;
    }
    /**
     * @returns 两个向量的点（内）积
     */
    dot(vec1: Vector, vec2: Vector): Vector {
        return vec1;
    }
    /**
     * @returns 两个向量的叉积
     */
    cross(vec1: Vector, vec2: Vector): Vector {
        return vec1;
    }
    /**
     * @returns 给定向量归一化，使其长度为1
     */
    normalize(vec1: Vector): Vector {
        return [1, 1];
    }
    /**
     * @returns 给定向量的长度，或者如果提供了两个向量，则返回它们之间的距离
     */
    length(point1: Vector, point2?: Vector): number {
        return 1;
    }
    /**
     * 用于将图层定向到3D空间中的给定点
     * @param fromPoint 您要定向的图层在世界空间中的位置
     * @param atPoint 您想要指向图层的世界空间中的点
     * @returns 一个方向值，可以用来定向图层，使z轴指向`atPoint`
     */
    lookAt(fromPoint: Vector, atPoint: Vector): Vector3D {
        return [0, 0, 0];
    }
    /**
     * 用于修改表达式的随机种子
     * @param offset 用于修改随机种子的值
     * @param timeless 随机种子是否应在时间上保持一致
     */
    seedRandom(offset: number, timeless: boolean = false): void { }
    /**
     * @returns 一个随机值，要么在`0`和`1`之间，要么在`0`和第一个参数之间，或者在第一个和第二个参数之间（如果提供了两个参数）。如果参数是数组，则返回等长的随机值数组
     * @param minValOrArray 如果只提供了一个参数，则随机数的最大值，否则为最小值
     * @param maxValOrArray 要返回的最大值
     */
    random(
        minValOrArray?: number | [],
        maxValOrArray?: number | []
    ): number | [] {
        return minValOrArray || 0;
    }
    /**
     * @returns 一个具有高斯分布的随机值，要么在`0`和`1`之间，要么在`0`和第一个参数之间，或者在第一个和第二个参数之间（如果提供了两个参数）。如果参数是数组，则返回等长的随机值数组
     * @param minValOrArray 如果只提供了一个参数，则随机数的最大值，否则为最小值
     * @param maxValOrArray 要返回的最大值
     */
    gaussRandom(
        minValOrArray?: number | [],
        maxValOrArray?: number | []
    ): number | [] {
        return minValOrArray || 0;
    }
    /**
     * 用于通过Perlin噪声获取随机值，其中输入值接近的地方将导致输出值更接近。
     * @param valOrArray 噪声输入值
     * @returns 一个在`-1`和`1`之间的值
     */
    noise(valOrArray: number | []): number {
        return 1;
    }
    /**
     * @returns 给定值，从一个范围映射到另一个范围，限制在输出范围内。如果只给出3个参数，输入范围是`0`到`1`，给定的值用于输出范围。
     * @param t 要重新映射的输入值
     * @param tMin 输入的低楼
     * @param tMax 输入的高天花板
     * @param value1 输出楼
     * @param value2 输出天花板
     */
    linear(
        t: number,
        tMin: number,
        tMax: number,
        value1?: number | [],
        value2?: number | []
    ): number | [] {
        return value1 || tMin;
    }
    /**
     * @returns 给定值，从一个范围映射到另一个范围，限制在输出范围内。映射将以`0`的速度进入和退出，以达到输出范围。如果只给出3个参数，输入范围是`0`到`1`，给定的值用于输出范围。
     * @param t 要重新映射的输入值
     * @param tMin 输入的低楼
     * @param tMax 输入的高天花板
     * @param value1 输出楼
     * @param value2 输出天花板
     */
    ease(
        t: number,
        tMin: number,
        tMax: number,
        value1?: number | [],
        value2?: number | []
    ): number | [] {
        return value1 || tMin;
    }
    /**
     * @returns 给定值，从一个范围映射到另一个范围，限制在输出范围内。映射将以`0`的速度退出，以达到输出范围。如果只给出3个参数，输入范围是`0`到`1`，给定的值用于输出范围。
     * @param t 要重新映射的输入值
     * @param tMin 输入的低楼
     * @param tMax 输入的高天花板
     * @param value1 输出楼
     * @param value2 输出天花板
     */
    easeIn(
        t: number,
        tMin: number,
        tMax: number,
        value1?: number | [],
        value2?: number | []
    ): number | [] {
        return value1 || tMin;
    }
    /**
     * @returns 给定值，从一个范围映射到另一个范围，限制在输出范围内。映射将以`0`的速度进入输出范围。如果只给出3个参数，输入范围是`0`到`1`，给定的值用于输出范围。
     * @param t 要重新映射的输入值
     * @param tMin 输入的低楼
     * @param tMax 输入的高天花板
     * @param value1 输出楼
     * @param value2 输出天花板
     */
    easeOut(
        t: number,
        tMin: number,
        tMax: number,
        value1?: number | [],
        value2?: number | []
    ): number | [] {
        return value1 || tMin;
    }
    /**
     * 将RGBA空间中的颜色转换为HSLA
     * @param rgbaArray 输入RGBA数组，值在0和1之间
     * @returns 一个色调，饱和度，亮度和alpha值的数组，值在0和1之间
     */
    rgbToHsl(rgbaArray: Color): Color {
        return [1, 1, 1, 1];
    }
    /**
     * 将HSLA空间中的颜色转换为RGBA
     * @param rgbaArray 输入HSLA数组，值在0和1之间
     * @returns 一个红色，绿色，蓝色和alpha值的数组，值在0和1之间
     */
    hslToRgb(hslaArray: Color): Color {
        return [1, 1, 1, 1];
    }
    /**
     * 将十六进制三元组空间中的颜色转换为RGB，或者将十六进制四元组空间中的颜色转换为RGBA空间。对于十六进制三元组，alpha默认为1.0
     * @param hex 表示十六进制三元组（6位，无alpha通道）或四元组（8位，包含alpha通道）的字符串，只包含数字或字符A–F。可选的前导字符0x，0X或#被忽略。超过8位的字符被忽略。
     */
    hexToRgb(hex: string): Color {
        return [1, 1, 1, 1];
    }
}

export class Footage {
    /**
     * 项目面板中显示的素材项的名称
     */
    readonly name: string = "Layer Name";
    /**
     * 素材项的宽度，以像素为单位
     */
    readonly width?: number = 500;
    /**
     * 素材项的高度，以像素为单位
     */
    readonly height?: number = 500;
    /**
     * 素材项的持续时间，以秒为单位
     */
    readonly duration?: number = 10;
    /**
     * 素材项中一帧的持续时间，以秒为单位
     */
    readonly frameDuration?: number = 0.04;
    /**
     * 时间码是否为NTSC下降帧格式
     */
    readonly ntscDropFrame?: boolean = false;
    /**
     * 素材的像素宽高比
     */
    readonly pixelAspect?: number = 1;
    /**
     * JSON文件的内容，以字符串形式
     */
    readonly sourceText?: string = "Source Text";
    /**
     * JSON文件的数据，作为`sourceData`对象的数组
     */
    readonly sourceData?: SourceData[] = [["source data"]];
    /**
     * @returns 在.mgJSON文件中指定的静态或动态数据流的值
     * @param dataPath 到所需数据流的层次结构路径
     */
    dataValue?(dataPath: []): number {
        return 0;
    }
    /**
     * @returns 在.mgJSON文件中指定的动态数据流的样本数量
     * @param dataPath 到所需动态数据流的层次结构路径
     */
    dataKeyCount?(dataPath: []): number {
        return 0;
    }
    /**
     * @returns 在.mgJSON文件中指定的动态数据流的样本的秒数
     * @param dataPath 到动态数据流的层次结构路径
     * @param t0 从其中返回样本的跨度的开始时间，以秒为单位。默认为startTime
     * @param t1 从其中返回样本的跨度的结束时间，以秒为单位。默认为endTime
     */
    dataKeyTimes?(dataPath: [], t0?: number, t1?: number): number[] {
        return [0, 0];
    }
    /**
     * @returns 在.mgJSON文件中指定的动态数据流的样本的值
     * @param dataPath 到动态数据流的层次结构路径
     * @param t0 从其中返回样本的跨度的开始时间，以秒为单位。默认为startTime
     * @param t1 从其中返回样本的跨度的结束时间，以秒为单位。默认为endTime
     */
    dataKeyValues?(dataPath: [], t0?: number, t1?: number): number[] {
        return [0, 0];
    }
}
