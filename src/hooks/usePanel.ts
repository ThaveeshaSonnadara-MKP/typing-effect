import { useCallback, useReducer, useState } from 'react';

import { DropdownLayoutValueOption } from '@wix/design-system';

import {
    DEFAULT_SUBSCRIPTION, DEFAULT_TEMPLATE, TEXT_ALIGN_OPTIONS
} from '../constants/common-constants';
import { DEFAULT_DATA } from '../constants/templates-constants';
import { Action, State, Subscription, TemplateKey } from '../types/common-types';
import { getCssPropertyValuesAvailable } from '../utils/get-css-properties';
import {
    validateAnimationDelay, validateDeleteSpeed, validateFontSize, validateNumberOfLoops,
    validateTextGap, validateTypingSpeed, ValidationResult
} from '../utils/validation';

// const initialState: State = {
//     staticText: DEFAULT_DATA[DEFAULT_TEMPLATE].staticText.text || "We can help you with",
//     staticTextFontColor: DEFAULT_DATA[DEFAULT_TEMPLATE].staticText.fontColor,
//     dynamicTextFontColor: DEFAULT_DATA[DEFAULT_TEMPLATE].dynamicText.fontColor,
//     sequence: DEFAULT_DATA[DEFAULT_TEMPLATE].dynamicText.texts,
//     display: DEFAULT_DATA[DEFAULT_TEMPLATE].display || "Flex",
//     showAnimationCursor: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.cursor,
//     animationCursor: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.cursorStyle,
//     numberOfLoops: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.loop,
//     typingSpeed: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.typeSpeed,
//     deleteSpeed: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.deleteSpeed,
//     animationDelay: DEFAULT_DATA[DEFAULT_TEMPLATE].animationOptions.delaySpeed,
//     isDeleteRowBtnDisabled: false,
//     isStaticTextStyleCustomizationsVisible: true,
//     staticTextFontWeight: DEFAULT_DATA[DEFAULT_TEMPLATE].staticText.fontWeight,
//     animTextFontWeight: DEFAULT_DATA[DEFAULT_TEMPLATE].dynamicText.fontWeight,
//     staticTextFontSizeValue: DEFAULT_DATA[DEFAULT_TEMPLATE].staticText.fontSizeValue,
//     animTextFontSizeValue: DEFAULT_DATA[DEFAULT_TEMPLATE].dynamicText.fontSizeValue,
//     staticTextFontSizeUnit: DEFAULT_DATA[DEFAULT_TEMPLATE].staticText.fontSizeUnit,
//     animTextFontSizeUnit: DEFAULT_DATA[DEFAULT_TEMPLATE].dynamicText.fontSizeUnit,
//     alignVertically: DEFAULT_DATA[DEFAULT_TEMPLATE].alignItems,
//     alignHorizontally: DEFAULT_DATA[DEFAULT_TEMPLATE].justifyContent,
//     subscription: {
//         instance: undefined,
//         appId: '',
//         instanceId: undefined,
//         plans: undefined,
//         isPremium: false,
//         upgradeUrl: null,
//         reviewUrl: ''
//     },
//     makeWidgetTransparent: false,
//     widgetBackgroundColor: DEFAULT_DATA[DEFAULT_TEMPLATE].backgroundColor,
//     isAnimUpdateBtnDisabled: false,
//     textAlign: DEFAULT_DATA[DEFAULT_TEMPLATE].textAlignProp,
//     textGapValue: +DEFAULT_DATA[DEFAULT_TEMPLATE].textsGapValue,
//     textGapUnit: DEFAULT_DATA[DEFAULT_TEMPLATE].textsGapUnit,
//     flexDirection: DEFAULT_DATA[DEFAULT_TEMPLATE].flexDirection
// };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_SEQUENCE':
            return { ...state, sequence: action.sequence };
        case 'TOGGLE_FIELD':
            return { ...state, [action.field]: !state[action.field] };
        case 'RESET_STATE':
            return { ...action.newState };
        default:
            return state;
    }
}

function createInitialStateFromTemplate(templateKey: TemplateKey): State {
    const templateData = DEFAULT_DATA[templateKey];
    if (!templateData) throw new Error(`Invalid template key: ${templateKey}`);

    return {
        staticText: templateData.staticText.text || "We can help you with",
        staticTextFontColor: templateData.staticText.fontColor,
        dynamicTextFontColor: templateData.dynamicText.fontColor,
        sequence: templateData.dynamicText.texts,
        display: templateData.display || "Flex",
        showAnimationCursor: templateData.animationOptions.cursor,
        animationCursor: templateData.animationOptions.cursorStyle,
        numberOfLoops: templateData.animationOptions.loop,
        typingSpeed: templateData.animationOptions.typeSpeed,
        deleteSpeed: templateData.animationOptions.deleteSpeed,
        animationDelay: templateData.animationOptions.delaySpeed,
        isDeleteRowBtnDisabled: false,
        isStaticTextStyleCustomizationsVisible: true,
        staticTextFontWeight: templateData.staticText.fontWeight,
        animTextFontWeight: templateData.dynamicText.fontWeight,
        staticTextFontSizeValue: templateData.staticText.fontSizeValue,
        animTextFontSizeValue: templateData.dynamicText.fontSizeValue,
        staticTextFontSizeUnit: templateData.staticText.fontSizeUnit,
        animTextFontSizeUnit: templateData.dynamicText.fontSizeUnit,
        alignVertically: templateData.alignItems,
        alignHorizontally: templateData.justifyContent,
        subscription: DEFAULT_SUBSCRIPTION,
        makeWidgetTransparent: false,
        widgetBackgroundColor: templateData.backgroundColor,
        isAnimUpdateBtnDisabled: false,
        textAlign: templateData.textAlignProp,
        textGapValue: +templateData.textsGapValue,
        textGapUnit: templateData.textsGapUnit,
        flexDirection: templateData.flexDirection
    };
}


export function usePanel(currentTemplateKey: TemplateKey) {
    // const [state, dispatch] = useReducer(reducer, initialState);
    // const [state, dispatch] = useReducer(reducer, null, () => {
    //     // Initially no state; wait for actual data to load
    //     return null;
    //   });
    const [state, dispatch] = useReducer(reducer, currentTemplateKey, createInitialStateFromTemplate);

    const [loading, setLoading] = useState(false);

    // Reset state based on new template data
    const resetStateWithTemplate = useCallback((templateKey: TemplateKey) => {
        const newState = createInitialStateFromTemplate(templateKey);
        dispatch({ type: 'RESET_STATE', newState });
    }, []);


    const handlers = {
        handleStaticText: useCallback((value: string) => {
            dispatch({ type: 'SET_FIELD', field: 'staticText', value });
        }, []),

        handleStaticFontColorChange: useCallback((color: string) => {
            dispatch({ type: 'SET_FIELD', field: 'staticTextFontColor', value: color });
        }, []),

        handleStaticTextFontWeight: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'staticTextFontWeight', value: option?.id });
        }, []),

        handleStaticTxtFontSizeValueChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'staticTextFontSizeValue', value });
        }, []),

        handleStaticTextFontSizeUnitChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'staticTextFontSizeUnit', value: option?.value });
        }, []),

        handleDynamicFontColorChange: useCallback((color: string) => {
            dispatch({ type: 'SET_FIELD', field: 'dynamicTextFontColor', value: color });
        }, []),

        handleAnimTextFontWeight: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'animTextFontWeight', value: option?.id });
        }, []),

        handleAnimTxtFontSizeValueChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'animTextFontSizeValue', value });
        }, []),

        handleAnimTextFontSizeUnitChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'animTextFontSizeUnit', value: option?.value });
        }, []),

        handleTextChange: useCallback((index: number, value: string) => {
            const newSequence = [...state.sequence];
            newSequence[index] = value;
            dispatch({ type: 'SET_SEQUENCE', sequence: newSequence });
        }, [state.sequence]),

        removeRow: useCallback((index: number) => {
            const newSequence = [...state.sequence];
            newSequence.splice(index, 1);
            dispatch({ type: 'SET_SEQUENCE', sequence: newSequence });
        }, [state.sequence]),

        addRow: useCallback((index: number) => {
            const newSequence = [...state.sequence];
            newSequence.splice(index + 1, 0, "New Text");
            console.log("newSequence:", newSequence);

            dispatch({ type: 'SET_SEQUENCE', sequence: newSequence });
        }, [state.sequence]),

        handleDisplayChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'display', value: option?.value });
        }, []),

        handleAlignVerticallyChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'alignVertically', value: option?.value });
        }, []),

        handleAlignHorizontallyChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'alignHorizontally', value: option?.value });
        }, []),

        handleAnimationCursorToggle: useCallback(() => {
            dispatch({ type: 'TOGGLE_FIELD', field: 'showAnimationCursor' });
        }, []),

        handleAnimationCursorChange: useCallback((value: string) => {
            dispatch({ type: 'SET_FIELD', field: 'animationCursor', value });
        }, []),

        handleNumOfLoopsChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'numberOfLoops', value });
        }, []),

        handleTypingSpeedValueChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'typingSpeed', value });
        }, []),

        handleDeleteSpeedValueChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'deleteSpeed', value });
        }, []),

        handleAnimationDelayChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'animationDelay', value });
        }, []),

        handleSubscriptionChange: useCallback((subscription: Subscription) => {
            dispatch({ type: 'SET_FIELD', field: 'subscription', value: subscription });
        }, []),
        handleTextGapValueChange: useCallback((value: number) => {
            dispatch({ type: 'SET_FIELD', field: 'textGapValue', value });
        }, []),
        handleTextGapUnitChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'textGapUnit', value: option?.value });
        }, []),
        handleTextAlignmentChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'textAlign', value: option?.value });
        }, []),
        handleFlexDirectionChange: useCallback((option: DropdownLayoutValueOption) => {
            dispatch({ type: 'SET_FIELD', field: 'flexDirection', value: option?.value });
        }, [])
    };

    const selectors = {
        getFontWeightOptions: useCallback(() => getCssPropertyValuesAvailable("font-weight"), []),
        getCssTypographyUnits: useCallback(() => [
            { id: "px", value: "px" },
            { id: "rem", value: "rem" },
            { id: "em", value: "em" },
        ], []),
        getTextAlignOptions: useCallback(() => TEXT_ALIGN_OPTIONS, []),
        getDisplaySelectedId: useCallback(() => state.display, [state.display]),
        getAlignVerticalSelectedId: useCallback(() => state.alignVertically, [state.alignVertically]),
        getAlignHorizontalSelectedId: useCallback(() => state.alignHorizontally, [state.alignHorizontally]),
        getStaticTxtFontSizeUnitSelectedId: useCallback(() => state.staticTextFontSizeUnit, [state.staticTextFontSizeUnit]),
        getAnimTxtFontSizeUnitSelectedId: useCallback(() => state.animTextFontSizeUnit, [state.animTextFontSizeUnit]),
        getTextGapUnitSelectedId: useCallback(() => state.textGapUnit, [state.textGapUnit]),
        getTextAlignSelectedId: useCallback(() => state.textAlign, [state.textAlign]),
        getFlexDirectionSelectedId: useCallback(() => state.flexDirection, [state.flexDirection])
    };

    const validators = {
        checkNumberOfLoopsInputRange: useCallback((): ValidationResult => {
            return validateNumberOfLoops(state.numberOfLoops);
        }, [state.numberOfLoops]),

        checkTypingSpeedInputRange: useCallback((): ValidationResult => {
            return validateTypingSpeed(state.typingSpeed);
        }, [state.typingSpeed]),

        checkDeleteSpeedInputRange: useCallback((): ValidationResult => {
            return validateDeleteSpeed(state.deleteSpeed);
        }, [state.deleteSpeed]),

        checkAnimationDelayInputRange: useCallback((): ValidationResult => {
            return validateAnimationDelay(state.animationDelay);
        }, [state.animationDelay]),

        checkStaticTxtFontSizeInputRange: useCallback((): ValidationResult => {
            return validateFontSize(state.staticTextFontSizeValue);
        }, [state.staticTextFontSizeValue]),

        checkAnimTxtFontSizeInputRange: useCallback((): ValidationResult => {
            return validateFontSize(state.animTextFontSizeValue);
        }, [state.animTextFontSizeValue]),

        checkTextGapInputRange: useCallback((): ValidationResult => {
            return validateTextGap(state.textGapValue);
        }, [state.textGapValue])
    };

    return {
        state,
        loading,
        handlers,
        selectors,
        validators,
        setLoading,
        resetStateWithTemplate
    };
}
