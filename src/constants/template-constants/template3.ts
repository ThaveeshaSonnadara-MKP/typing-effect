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
    fontColor: "#FFFFFF", // White
    fontWeight: "Normal",
    fontSizeValue: 24,
    fontSizeUnit: "px"
};

const DEFAULT_DYNAMIC_TEXT_PROPS: DynamicTextProps = {
    texts: DEFAULT_SEQUENCE,
    fontColor: "#FFFFFF", // White
    fontWeight: "Bold",
    fontSizeValue: 36,
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

export const DEFAULT_WIDGET_DATA_3: WidgetData = {
    staticText: DEFAULT_STATIC_TEXT_PROPS,
    dynamicText: DEFAULT_DYNAMIC_TEXT_PROPS,
    animationOptions: DEFAULT_ANIMATION_PROPS,
    backgroundColor: "#1B45CA",
    alignItems: "Flex-start",
    textAlignProp: "Left",
    justifyContent: "Flex-start",
    display: "Block",
    flexDirection: "Row",
    textsGapValue: 5,
    textsGapUnit: "px",
    templateId: "Template 1",
    doCustomize: "false",
};