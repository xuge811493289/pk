import generateColors from './utils/color.js';
import colorMap from './utils/colorMap.js';
import store from '@/tools/store.js';
import themeDefalut from './element.js';
import fixedClassName from './theme.js';

// 修改主题
export default (color) => {

    let storeColor = store.get("themeColor") || "#457CD6";

    if (!color) {
        color = storeColor;
    }
    let colors = { primary: color };
    colors = {
        ...colors, 
        ...generateColors(colors.primary)
    };
    let styleData = themeDefalut + fixedClassName;
    if (styleData) {
        Object.keys(colorMap).forEach(key => {
            const value = colorMap[key];
            styleData = styleData.replace(new RegExp(key, "ig"), value);
        });
        Object.keys(colors).forEach(key => {
            styleData = styleData.replace(new RegExp("(:|\\s+)" + key, "g"), "$1" + colors[key]);
        });
        const nod = document.createElement("style");
        if (nod.styleSheet) {         //ie下  
            nod.styleSheet.cssText = styleData;
        } else {
            nod.innerHTML = styleData;       //或者写成 nod.appendChild(document.createTextNode(str))  
        }
        document.getElementsByTagName("head")[0].appendChild(nod);
        // style.innerText = styleData;
        // document.head.appendChild(style);
    } else {

    }
}