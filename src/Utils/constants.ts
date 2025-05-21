import { AppConstants, DynamicTextProps, StaticTextProps, WidgetData, AnimationProps } from '../types/common-types';

const APP_NAME = 'typing_effect' as const;
const SUPPORT_LINK_BASE_URL = 'https://feedback.marketpushapps.com/?instance=' as const;
const MKP_APP_MARKET_URL = 'https://www.wix.com/app-market/developer/marketpushapps' as const;
const SUPPORT_ARTICLE_LINK = 'https://help.marketpushapps.com/en/articles/11115132-how-to-use-typing-effect' as const;

export function getAppConstants(): AppConstants {
    return { APP_NAME, SUPPORT_LINK_BASE_URL, MKP_APP_MARKET_URL, SUPPORT_ARTICLE_LINK }
}

export const CSS_PROPERTIES = {
    fontWeight: "font-weight" as const,
    fontSize: "font-size" as const,
}

const DEFAULT_SEQUENCE: string[] = [
    "We produce food for Mice",
    "We produce food for Hamsters",
    "We produce food for Guinea Pigs",
    "We produce food for Chinchillas",
];

const DEFAULT_DYNAMIC_TEXT_PROPS: DynamicTextProps = {
    texts: DEFAULT_SEQUENCE,
    fontSize: "1rem",
    fontColor: "#F7374F",
    fontWeight: "Normal",
};

const DEFAULT_STATIC_TEXT_PROPS: StaticTextProps = {
    text: "Welcome...",
    fontSize: "1rem",
    fontColor: "#EEEEEE",
    fontWeight: "Normal",
};
const DEFAULT_ANIMATION_PROPS: AnimationProps = {
    loop: 0,
    cursor: true,
    cursorStyle: "|",
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
};

export const DEFAULT_WIDGET_DATA: WidgetData = {
    staticText: DEFAULT_STATIC_TEXT_PROPS,
    dynamicText: DEFAULT_DYNAMIC_TEXT_PROPS,
    animationOptions: DEFAULT_ANIMATION_PROPS,
    backgroundColor: "#121212",
    textElementType: "Default",
    textsGap: "5px",
    alignItems: "Center",
    textAlignProp: "Center",
    justifyContent: "Center",
    display: "Flex",
};

export const TEXT_STYLE_OPTIONS = [
    { id: 0, value: "Heading 1" },
    { id: 1, value: "Heading 2" },
    { id: 2, value: "Heading 3" },
    { id: 3, value: "Heading 4" },
    { id: 4, value: "Heading 5" },
    { id: 5, value: "Heading 6" },
    { id: 6, value: "Paragraph" },
    { id: 7, value: "Default" },
];

export const TEXT_ALIGN_OPTIONS = [
    { id: 0, value: "Left" },
    { id: 1, value: "Center" },
    { id: 2, value: "Right" },
    { id: 3, value: "Justify" },
];

export const DISPLAY_OPTIONS = [
    { id: 0, value: "Flex" },
    { id: 1, value: "Block" },
    { id: 2, value: "Inline" }
];

export const ALIGN_ITEMS_OPTIONS = [
    { id: 0, value: "Flex-start" },
    { id: 1, value: "Center" },
    { id: 2, value: "Flex-end" }
];

export const JUSTIFY_CONTENT_OPTIONS = [
    { id: 0, value: "Flex-start" },
    { id: 1, value: "Center" },
    { id: 2, value: "Flex-end" },
    { id: 3, value: "Space-between" },
    { id: 4, value: "Space-around" }
];

export const CSS_TYPOGRAPHY_UNITS = [
    { id: 0, value: "px" },
    { id: 1, value: "rem" },
    { id: 2, value: "em" },
    { id: 3, value: "vw" },
    { id: 4, value: "vh" }
];
