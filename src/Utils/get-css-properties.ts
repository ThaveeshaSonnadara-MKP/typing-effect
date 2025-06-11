const fontWeightOptions = [
    { id: 'Normal', value: 'Normal' },
    { id: 'Bold', value: 'Bold' },
    { id: 'Bolder', value: 'Bolder' }
];

export const getCssPropertyValuesAvailable = (property: string) => {
    switch (property) {
        case "font-weight":
            return fontWeightOptions;
        default:
            return fontWeightOptions;
    }
}