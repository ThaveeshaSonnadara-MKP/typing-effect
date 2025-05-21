const fontWeightOptions = [
    { id: 'fw-1', value: 'Normal' },
    { id: 'fw-2', value: 'Bold' },
    { id: 'fw-3', value: 'Bolder' }
];

export const getCssPropertyValuesAvailable = (property: string) => {
    switch (property) {
        case "font-weight":
            return fontWeightOptions;
        default:
            return fontWeightOptions;
    }
}