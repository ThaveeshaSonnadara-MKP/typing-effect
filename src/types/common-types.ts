export type StaticTextProps = {
    text: string;
    fontSize: string;
    fontColor: string;
    fontWeight: string;
};

export type DynamicTextProps = {
    texts: string[];
    fontSize: string;
    fontColor: string;
    fontWeight: string;
};

export type AnimationProps = {
    loop: number;
    cursor: boolean;
    cursorStyle: string;
    typeSpeed: number;
    deleteSpeed: number;
    delaySpeed: number;
};

export type WidgetData = {
    staticText: StaticTextProps;
    dynamicText: DynamicTextProps;
    animationOptions: AnimationProps;
    backgroundColor: string;
    textElementType: string;
    textsGap: string;
    alignItems: string;
    textAlignProp: string;
    justifyContent: string;
    display: string;
};

export type AppConstants = {
    APP_NAME: string;
    SUPPORT_LINK_BASE_URL: string;
    MKP_APP_MARKET_URL: string;
    SUPPORT_ARTICLE_LINK: string;
}

export type State = {
    widgetData: WidgetData;
    subscription: Record<string, any>;
    makeWidgetTransparent: boolean;
    widgetBackgroundColor: string;
    showAnimationCursor: boolean;
    animationCursor: string;
    staticText: string;
    staticTextFontColor: string;
    dynamicTextFontColor: string;
    sequence: string[];
    isAnimUpdateBtnDisabled: boolean;
    isDeleteRowBtnDisabled: boolean;
    isStaticTextStyleCustomizationsVisible: boolean;
    staticTextFontWeight: string;
    animTextFontWeight: string;
    selectedTextStyle: string | undefined;
    display: string | undefined;
    textAlign: string | undefined;
    alignVertically: string | undefined;
    alignHorizontally: string | undefined;
    textGap: string;
    textGapUnit: string | undefined;
    textGapValue: number;
    staticTextFontSize: string;
    staticTextFontSizeUnit: string | undefined;
    staticTextFontSizeValue: number;
    animTextFontSize: string;
    animTextFontSizeUnit: string | undefined;
    animTextFontSizeValue: number;
    numberOfLoops: number;
    typingSpeed: number;
    deleteSpeed: number;
    animationDelay: number;
};

export type Action =
    | { type: 'SET_WIDGET_DATA'; payload: WidgetData }
    | { type: 'SET_SEQUENCE'; payload: string[] }
    | { type: 'UPDATE_FIELD'; key: keyof State; payload: any }
    | { type: 'TOGGLE_BOOLEAN'; key: keyof State };