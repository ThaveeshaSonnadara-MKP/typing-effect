const APP_NAME = 'typing_effect';
const SUPPORT_LINK_BASE_URL = 'https://feedback.marketpushapps.com/?instance=';
const MKP_APP_MARKET_URL = 'https://www.wix.com/app-market/developer/marketpushapps';
const SUPPORT_ARTICLE_LINK = 'https://help.marketpushapps.com/en/articles/11115132-how-to-use-slideshow-carousel';

type AppConstants = {
    APP_NAME: string;
    SUPPORT_LINK_BASE_URL: string;
    MKP_APP_MARKET_URL: string;
    SUPPORT_ARTICLE_LINK: string;
}

export function getAppConstants(): AppConstants {
    return { APP_NAME, SUPPORT_LINK_BASE_URL, MKP_APP_MARKET_URL, SUPPORT_ARTICLE_LINK }
}