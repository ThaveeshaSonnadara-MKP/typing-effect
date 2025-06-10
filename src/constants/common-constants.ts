import { AppConstants } from '../types/common-types';

const APP_NAME = 'typing_effect' as const;
const SUPPORT_LINK_BASE_URL = 'https://feedback.marketpushapps.com/?instance=' as const;
const MKP_APP_MARKET_URL = 'https://www.wix.com/app-market/developer/marketpushapps' as const;
const SUPPORT_ARTICLE_LINK = 'https://help.marketpushapps.com/en/articles/11115132-how-to-use-typing-effect' as const;

export function getAppConstants(): AppConstants {
    return { APP_NAME, SUPPORT_LINK_BASE_URL, MKP_APP_MARKET_URL, SUPPORT_ARTICLE_LINK }
}

export const TEMPLATE_OPTIONS = [
    { id: "Template 1", value: "Template 1" },
    { id: "Template 2", value: "Template 2" },
    { id: "Template 3", value: "Template 3" },
    { id: "Template 4", value: "Template 4" },
];

export const DISPLAY_OPTIONS = [
    { id: "Flex", value: "Flex" },
    { id: "Block", value: "Block" },
    { id: "Inline", value: "Inline" }
];

export const ALIGN_ITEMS_OPTIONS = [
    { id: "Flex-start", value: "Flex-start" },
    { id: "Center", value: "Center" },
    { id: "Flex-end", value: "Flex-end" }
];

export const JUSTIFY_CONTENT_OPTIONS = [
    { id: "Flex-start", value: "Flex-start" },
    { id: "Center", value: "Center" },
    { id: "Flex-end", value: "Flex-end" },
    { id: "Space-between", value: "Space-between" },
    { id: "Space-around", value: "Space-around" }
];

export const TEXT_ALIGN_OPTIONS = [
    { id: "Left", value: "Left" },
    { id: "Center", value: "Center" },
    { id: "Right", value: "Right" },
    { id: "Justify", value: "Justify" },
]

export const FLEX_DIRECTIONS = [
    { id: "Row", value: "Row" },
    { id: "Column", value: "Column" },
]

export const DEFAULT_SUBSCRIPTION = {
    instance: undefined,
    appId: '',
    instanceId: undefined,
    plans: undefined,
    isPremium: false,
    upgradeUrl: null,
    reviewUrl: ''
}

export const VALID_TEXT_ALIGN_VALUES = ["left", "right", "center", "justify"] as const;
export const DEFAULT_TEMPLATE = "Template 1";