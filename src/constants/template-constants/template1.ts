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
    fontSizeValue: 48,
    fontSizeUnit: "px",
    fontColor: "#000000", // Black
    fontWeight: "Bold",
};

const DEFAULT_DYNAMIC_TEXT_PROPS: DynamicTextProps = {
    texts: DEFAULT_SEQUENCE,
    fontColor: "#0000FF", // Light Blue
    fontWeight: "Bolder",
    fontSizeValue: 60,
    fontSizeUnit: "px"
};

const DEFAULT_ANIMATION_PROPS: AnimationProps = {
    loop: 0,
    cursor: true,
    cursorStyle: "|",
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
};

export const DEFAULT_WIDGET_DATA_1: WidgetData = {
    staticText: DEFAULT_STATIC_TEXT_PROPS,
    dynamicText: DEFAULT_DYNAMIC_TEXT_PROPS,
    animationOptions: DEFAULT_ANIMATION_PROPS,
    backgroundColor: "#FFFFFF", // White
    alignItems: "Flex-start",
    textAlignProp: "Left",
    justifyContent: "Flex-start",
    display: "Flex",
    flexDirection: "Column",
    textsGapUnit: "px",
    textsGapValue: 5,
    templateId: "Template 1",
    doCustomize: "false",
};