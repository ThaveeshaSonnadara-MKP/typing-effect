const fontWeightOptions = [
    { id: 'fw-1', value: '100' },
    { id: 'fw-2', value: '200' },
    { id: 'fw-3', value: '300' },
    { id: 'fw-4', value: '400' },
    { id: 'fw-5', value: '500' },
    { id: 'fw-6', value: '600' },
    { id: 'fw-7', value: '700' },
    { id: 'fw-8', value: '800' },
    { id: 'fw-9', value: '900' },
    { id: 'fw-10', value: 'Normal' },
    { id: 'fw-11', value: 'Bold' },
    { id: 'fw-12', value: 'Lighter' },
    { id: 'fw-13', value: 'Bolder' },
    { id: 'fw-14', value: 'Inherit' },
    { id: 'fw-15', value: 'Initial' },
    { id: 'fw-16', value: 'Revert' },
    { id: 'fw-17', value: 'Revert-layer' },
    { id: 'fw-18', value: 'Unset' }
];

export const getCssPropertyValuesAvailable = (property: string) => {
    switch (property) {
        case "font-weight":
            return fontWeightOptions;
        default:
            return fontWeightOptions;
    }
}