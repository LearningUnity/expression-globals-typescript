// import { Comp, Layer, Property } from ".";

import { Comp, Layer, Property, Transform } from ".";

// const thisComp = new Comp();
// const thisLayer = new Layer();
// const thisProperty = new Property<string>("Property value");

// const transform = thisLayer.transform;

// 声明全局变量 thisComp、thisLayer、thisProperty、transform，这样就可以在任何地方使用这些变量了。
// 但是这样会污染全局变量，不推荐使用。
// 为了避免全局变量污染，可以使用 export {} 来声明一个空的模块，这样就不会污染全局变量了。
// export {};
declare global {
    const thisComp: Comp;
    const thisLayer: Layer;
    const thisProperty: Property<string>;
    const transform: Transform;
}