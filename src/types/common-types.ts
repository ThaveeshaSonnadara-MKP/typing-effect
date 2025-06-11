import { appInstances } from '@wix/app-management';

import { VALID_TEXT_ALIGN_VALUES } from '../constants/common-constants';
import { DEFAULT_DATA } from '../constants/templates-constants';

export type Subscription = {
    instance: appInstances.AppInstance | undefined;
    appId: string;
    instanceId: string | undefined;
    plans: appInstances.AvailablePlan[] | undefined;
    isPremium: boolean;
    upgradeUrl: string | null;
    reviewUrl: string;
}

export type StaticTextProps = {
    text: string;
    fontSizeValue: number;
    fontSizeUnit: string;
    fontColor: string;
    fontWeight: string;
};

export type DynamicTextProps = {
    texts: string[];
    fontSizeValue: number;
    fontSizeUnit: string;
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
    textsGapUnit: string;
    textsGapValue: number;
    alignItems: string;
    textAlignProp: string;
    justifyContent: string;
    display: string;
    flexDirection: string;
    templateId: string;
    doCustomize: string;
};

export type AppConstants = {
    APP_NAME: string;
    SUPPORT_LINK_BASE_URL: string;
    MKP_APP_MARKET_URL: string;
    SUPPORT_ARTICLE_LINK: string;
}

export type State = {
    subscription: Subscription;
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
    display: string;
    textAlign: string;
    alignVertically: string;
    alignHorizontally: string;
    textGapUnit: string;
    textGapValue: number;
    staticTextFontSizeUnit: string;
    staticTextFontSizeValue: number;
    animTextFontSizeUnit: string;
    animTextFontSizeValue: number;
    numberOfLoops: number;
    typingSpeed: number;
    deleteSpeed: number;
    animationDelay: number;
    flexDirection: string;
};

export type TextAlign = (typeof VALID_TEXT_ALIGN_VALUES)[number];

export type TemplateKey = keyof typeof DEFAULT_DATA;

export type Action =
    | { type: 'SET_FIELD'; field: keyof State; value: any }
    | { type: 'SET_SEQUENCE'; sequence: string[] }
    | { type: 'TOGGLE_FIELD'; field: keyof State }
    | { type: 'RESET_STATE'; newState: State };