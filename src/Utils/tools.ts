import { getCssPropertyValuesAvailable } from './get-css-properties';

export function getIdByValue(array: Array<{ id: number, value: string }>, value: string): number | undefined {
    const match = array.find(option => option.value === value);
    return match?.id;
}

export function getFontWeightValueById(id: string): string | undefined {
    const fontWeights = getCssPropertyValuesAvailable("font-weight");
    const match = fontWeights.find(option => option.id === id);
    return match?.value
}

export function checkRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export const getHtmlTag = (type?: string): string => {
    switch (type) {
        case "Heading 1":
            return "h1";
        case "Heading 2":
            return "h2";
        case "Heading 3":
            return "h3";
        case "Heading 4":
            return "h4";
        case "Heading 5":
            return "h5";
        case "Heading 6":
            return "h6";
        case "Paragraph":
            return "p";
        case "Span":
        case "Default":
        default:
            return "span";
    }
};