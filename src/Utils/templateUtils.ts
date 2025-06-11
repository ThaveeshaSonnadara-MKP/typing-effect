import { DEFAULT_TEMPLATE } from '../constants/common-constants';
import { DEFAULT_DATA } from '../constants/templates-constants';
import { WidgetData } from '../types/common-types';

type TemplateKey = keyof typeof DEFAULT_DATA;

export const isValidTemplate = (template: string): template is TemplateKey => {
    return template in DEFAULT_DATA;
};

export const getTemplateData = (template: string): WidgetData => {
    if (isValidTemplate(template)) {
        return DEFAULT_DATA[template];
    }
    return DEFAULT_DATA[DEFAULT_TEMPLATE];
};

export const getDefaultTemplateData = (): WidgetData => {
    return DEFAULT_DATA[DEFAULT_TEMPLATE];
};

export const validateAndGetTemplateData = (template: string | null): {
    template: string;
    data: WidgetData;
} => {
    if (!template || !isValidTemplate(template)) {
        return {
            template: DEFAULT_TEMPLATE,
            data: getDefaultTemplateData()
        };
    }
    return {
        template,
        data: getTemplateData(template)
    };
};
