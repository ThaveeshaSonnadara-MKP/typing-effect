import {
    AnimationProps, DynamicTextProps, StaticTextProps, WidgetData
} from '../../types/common-types';

const DEFAULT_SEQUENCE: string[] = [
    "Software",
    "Photography",
    "Design",
    "Architecture",
];

const DEFAULT_STATIC_TEXT_PROPS: StaticTextProps = {
    text: "We can help you with",
    fontColor: "#000000", // Black
    fontWeight: "Normal",
    fontSizeValue: 24,
    fontSizeUnit: "px"
};

const DEFAULT_DYNAMIC_TEXT_PROPS: DynamicTextProps = {
    texts: DEFAULT_SEQUENCE,
    fontColor: "#FF0000", // Red
    fontWeight: "Normal",
    fontSizeValue: 24,
    fontSizeUnit: "px"
};

const DEFAULT_ANIMATION_PROPS: AnimationProps = {
    loop: 0,
    cursor: false,
    cursorStyle: "|",
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
};

export const DEFAULT_WIDGET_DATA_2: WidgetData = {
    staticText: DEFAULT_STATIC_TEXT_PROPS,
    dynamicText: DEFAULT_DYNAMIC_TEXT_PROPS,
    animationOptions: DEFAULT_ANIMATION_PROPS,
    backgroundColor: "#FFFFFF", // White
    alignItems: "Flex-start",
    textAlignProp: "Left",
    justifyContent: "Flex-start",
    display: "Block",
    flexDirection: "Row",
    textsGapUnit: "px",
    textsGapValue: 5,
    templateId: "Template 1",
    doCustomize: "false",
};