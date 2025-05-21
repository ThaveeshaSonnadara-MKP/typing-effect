import { Action, State } from "../types/common-types";
import { DEFAULT_WIDGET_DATA } from "./constants";


export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_WIDGET_DATA':
            return { ...state, widgetData: action.payload };
        case 'SET_SEQUENCE':
            return { ...state, sequence: action.payload };
        case 'UPDATE_FIELD':
            return { ...state, [action.key]: action.payload };
        case 'TOGGLE_BOOLEAN':
            return { ...state, [action.key]: !state[action.key] };
        default:
            return state;
    }
}

export const initialState: State = {
    widgetData: DEFAULT_WIDGET_DATA,
    subscription: {},
    makeWidgetTransparent: false,
    widgetBackgroundColor: DEFAULT_WIDGET_DATA.backgroundColor,
    showAnimationCursor: DEFAULT_WIDGET_DATA.animationOptions.cursor,
    animationCursor: DEFAULT_WIDGET_DATA.animationOptions.cursorStyle,
    staticText: DEFAULT_WIDGET_DATA.staticText.text,
    staticTextFontColor: DEFAULT_WIDGET_DATA.staticText.fontColor,
    dynamicTextFontColor: DEFAULT_WIDGET_DATA.dynamicText.fontColor,
    sequence: DEFAULT_WIDGET_DATA.dynamicText.texts,
    isAnimUpdateBtnDisabled: true,
    isDeleteRowBtnDisabled: false,
    isStaticTextStyleCustomizationsVisible: true,
    staticTextFontWeight: DEFAULT_WIDGET_DATA.staticText.fontWeight,
    animTextFontWeight: DEFAULT_WIDGET_DATA.dynamicText.fontWeight,
    selectedTextStyle: DEFAULT_WIDGET_DATA.textElementType,
    display: DEFAULT_WIDGET_DATA.display,
    textAlign: DEFAULT_WIDGET_DATA.textAlignProp,
    alignVertically: DEFAULT_WIDGET_DATA.alignItems,
    alignHorizontally: DEFAULT_WIDGET_DATA.justifyContent,
    textGap: DEFAULT_WIDGET_DATA.textsGap,
    textGapUnit: "px",
    textGapValue: 5,
    staticTextFontSize: DEFAULT_WIDGET_DATA.staticText.fontSize,
    staticTextFontSizeUnit: "rem",
    staticTextFontSizeValue: 1,
    animTextFontSize: DEFAULT_WIDGET_DATA.dynamicText.fontSize,
    animTextFontSizeUnit: "rem",
    animTextFontSizeValue: 1,
    numberOfLoops: DEFAULT_WIDGET_DATA.animationOptions.loop,
    typingSpeed: DEFAULT_WIDGET_DATA.animationOptions.typeSpeed,
    deleteSpeed: DEFAULT_WIDGET_DATA.animationOptions.deleteSpeed,
    animationDelay: DEFAULT_WIDGET_DATA.animationOptions.delaySpeed,
};