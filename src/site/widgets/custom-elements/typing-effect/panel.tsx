import React, {
  type FC,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  useState,
} from "react";
import { widget } from "@wix/editor";
import SupportSection from "../../../../components/SupportSection/support-section";
import {
  WixDesignSystemProvider,
  SidePanel,
  FieldSet,
  FormField,
  Box,
  ColorInput,
  Button,
  IconButton,
  ToggleSwitch,
  Input,
  Text,
  Tooltip,
  Dropdown,
  DropdownLayoutValueOption,
  Slider,
  NumberInput,
  FieldSetStatusType,
  Loader,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import styles from "./panel.module.css";
import { getSubscription } from "../../../../Utils/subscription";
import {
  getAppConstants,
  CSS_PROPERTIES,
  DEFAULT_WIDGET_DATA,
  TEXT_STYLE_OPTIONS,
  TEXT_ALIGN_OPTIONS,
  DISPLAY_OPTIONS,
  ALIGN_ITEMS_OPTIONS,
  JUSTIFY_CONTENT_OPTIONS,
  CSS_TYPOGRAPHY_UNITS,
} from "../../../../Utils/constants";
import { getCssPropertyValuesAvailable } from "../../../../Utils/get-css-properties";
import AlertBanner from "../../../../components/AlertBanner/alert-banner";
import * as Icons from "@wix/wix-ui-icons-common";
import {
  getIdByValue,
  checkRange,
  getFontWeightValueById,
} from "../../../../Utils/tools";

import { WidgetData } from "../../../../types/common-types";
import { reducer, initialState } from "../../../../Utils/reducer";

const {
  APP_NAME,
  MKP_APP_MARKET_URL,
  SUPPORT_LINK_BASE_URL,
  SUPPORT_ARTICLE_LINK,
} = getAppConstants();

const Panel: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [widgetDataFetchComplete, setWidgetDataFetchComplete] =
    useState<boolean>(false);

  // MEMOS
  const memoizedFontWeightOptions = useMemo(() => {
    const availableOptions = getCssPropertyValuesAvailable(
      CSS_PROPERTIES.fontWeight
    );
    return availableOptions;
  }, []);

  // USE EFFECTS

  // USE EFFECT - FETCH DATA
  useEffect(() => {
    console.log("Fetching widget data...");

    widget
      .getProp("widget-data")
      .then((widgetData) => {
        const widgetDataObj: WidgetData =
          JSON.parse(widgetData) || DEFAULT_WIDGET_DATA;
        console.log("widgetDataObj (fetched data):", widgetDataObj);

        dispatch({ type: "SET_WIDGET_DATA", payload: widgetDataObj });

        dispatch({
          type: "SET_SEQUENCE",
          payload:
            widgetDataObj?.dynamicText?.texts ||
            DEFAULT_WIDGET_DATA.dynamicText.texts,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "staticText",
          payload:
            widgetDataObj?.staticText?.text ||
            DEFAULT_WIDGET_DATA.staticText.text,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "staticTextFontColor",
          payload:
            widgetDataObj?.staticText?.fontColor ||
            DEFAULT_WIDGET_DATA.staticText.fontColor,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "dynamicTextFontColor",
          payload:
            widgetDataObj?.dynamicText?.fontColor ||
            DEFAULT_WIDGET_DATA.dynamicText.fontColor,
        });

        const staticWeight =
          widgetDataObj?.staticText?.fontWeight ||
          DEFAULT_WIDGET_DATA.staticText.fontWeight;

        const staticTextFontWeightSelectedId =
          memoizedFontWeightOptions?.find((opt) => opt.value === staticWeight)
            ?.id || "fw-10";

        dispatch({
          type: "UPDATE_FIELD",
          key: "staticTextFontWeight",
          payload: staticTextFontWeightSelectedId,
        });

        const animWeight =
          widgetDataObj?.dynamicText?.fontWeight ||
          DEFAULT_WIDGET_DATA.dynamicText.fontWeight;

        const animTextFontWeightSelectedId =
          memoizedFontWeightOptions?.find((opt) => opt.value === animWeight)
            ?.id || "fw-10";

        dispatch({
          type: "UPDATE_FIELD",
          key: "animTextFontWeight",
          payload: animTextFontWeightSelectedId,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "selectedTextStyle",
          payload:
            widgetDataObj?.textElementType ||
            DEFAULT_WIDGET_DATA.textElementType,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "display",
          payload: widgetDataObj?.display || DEFAULT_WIDGET_DATA.display,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "textAlign",
          payload:
            widgetDataObj?.textAlignProp || DEFAULT_WIDGET_DATA.textAlignProp,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "alignVertically",
          payload: widgetDataObj?.alignItems || DEFAULT_WIDGET_DATA.alignItems,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "alignHorizontally",
          payload:
            widgetDataObj?.justifyContent || DEFAULT_WIDGET_DATA.justifyContent,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "textGap",
          payload: widgetDataObj?.textsGap || DEFAULT_WIDGET_DATA.textsGap,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "staticTextFontSize",
          payload:
            widgetDataObj?.staticText?.fontSize ||
            DEFAULT_WIDGET_DATA.staticText.fontSize,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "animTextFontSize",
          payload:
            widgetDataObj?.dynamicText?.fontSize ||
            DEFAULT_WIDGET_DATA.dynamicText.fontSize,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "showAnimationCursor",
          payload:
            widgetDataObj?.animationOptions?.cursor ||
            DEFAULT_WIDGET_DATA.animationOptions.cursor,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "animationCursor",
          payload:
            widgetDataObj?.animationOptions?.cursorStyle ||
            DEFAULT_WIDGET_DATA.animationOptions.cursorStyle,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "numberOfLoops",
          payload:
            widgetDataObj?.animationOptions?.loop ||
            DEFAULT_WIDGET_DATA.animationOptions.loop,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "typingSpeed",
          payload:
            widgetDataObj?.animationOptions?.typeSpeed ||
            DEFAULT_WIDGET_DATA.animationOptions.typeSpeed,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "deleteSpeed",
          payload:
            widgetDataObj?.animationOptions?.deleteSpeed ||
            DEFAULT_WIDGET_DATA.animationOptions.deleteSpeed,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "animationDelay",
          payload:
            widgetDataObj?.animationOptions?.delaySpeed ||
            DEFAULT_WIDGET_DATA.animationOptions.delaySpeed,
        });

        dispatch({
          type: "UPDATE_FIELD",
          key: "animationDelay",
          payload:
            widgetDataObj?.animationOptions?.delaySpeed ||
            DEFAULT_WIDGET_DATA.animationOptions.delaySpeed,
        });

        if (widgetDataObj?.backgroundColor === "") {
          dispatch({
            type: "UPDATE_FIELD",
            key: "makeWidgetTransparent",
            payload: true,
          });
        } else {
          dispatch({
            type: "UPDATE_FIELD",
            key: "makeWidgetTransparent",
            payload: false,
          });
        }

        dispatch({
          type: "UPDATE_FIELD",
          key: "widgetBackgroundColor",
          payload: widgetDataObj?.backgroundColor,
        });

        console.log("Widget-data fetched successfully.");
        setLoading(false);
        setWidgetDataFetchComplete(true);
      })
      .catch((error) => {
        console.error("Failed to fetch widget-name:", error);
        setLoading(false);
        setWidgetDataFetchComplete(true);
      });
  }, [memoizedFontWeightOptions]);

  // USE EFFECT - UPDATE WIDGET_DATA
  useEffect(() => {
    if (!widgetDataFetchComplete) return;

    const staticTextFontWeight =
      getFontWeightValueById(state.staticTextFontWeight) || "Normal";

    const animTextFontWeight =
      getFontWeightValueById(state.animTextFontWeight) || "Normal";

    const updatedWidgetData: WidgetData = {
      ...state.widgetData,
      staticText: {
        ...state.widgetData.staticText,
        text: state.staticText,
        fontColor: state.staticTextFontColor,
        fontWeight: staticTextFontWeight,
        fontSize: state.staticTextFontSize,
      },
      dynamicText: {
        ...state.widgetData.dynamicText,
        fontColor: state.dynamicTextFontColor,
        fontWeight: animTextFontWeight,
        fontSize: state.animTextFontSize,
        texts: state.sequence,
      },
      textElementType: state.selectedTextStyle || "Default",
      backgroundColor: state.widgetBackgroundColor,
      display: state.display || "Flex",
      textAlignProp: state.textAlign || "Center",
      alignItems: state.alignVertically || "Center",
      justifyContent: state.alignHorizontally || "Center",
      textsGap: state.textGap,
      animationOptions: {
        ...state.widgetData.animationOptions,
        loop: state.numberOfLoops,
        typeSpeed: state.typingSpeed,
        deleteSpeed: state.deleteSpeed,
        delaySpeed: state.animationDelay,
        cursor: state.showAnimationCursor,
        cursorStyle: state.animationCursor,
      },
    };

    console.log("updatedWidgetData (set widget props):", updatedWidgetData);

    if (
      !checkAnimTxtFontSizeInputRange().status &&
      !checkAnimationDelayInputRange().status &&
      !checkDeleteSpeedInputRange().status &&
      !checkNumberOfLoopsInputRange().status &&
      !checkStaticTxtFontSizeInputRange().status &&
      !checkTextGapInputRange().status &&
      !checkTypingSpeedInputRange().status
    ) {
      dispatch({ type: "SET_WIDGET_DATA", payload: updatedWidgetData });
    }
    setLoading(false);
  }, [
    state.staticText,
    state.staticTextFontColor,
    state.staticTextFontWeight,
    state.staticTextFontSize,
    state.dynamicTextFontColor,
    state.animTextFontWeight,
    state.animTextFontSize,
    state.sequence,
    state.selectedTextStyle,
    state.display,
    state.textAlign,
    state.alignVertically,
    state.alignHorizontally,
    state.textGap,
    state.widgetBackgroundColor,
    state.widgetBackgroundColor,
    state.numberOfLoops,
    state.typingSpeed,
    state.deleteSpeed,
    state.animationDelay,
    state.showAnimationCursor,
    state.animationCursor,
  ]);

  // USE EFFECT - UPDATE WIDGET PROPS (based on widgetData changes)
  useEffect(() => {
    if (!widgetDataFetchComplete) return;
    widget.setProp("widget-data", JSON.stringify(state.widgetData));
    setLoading(false);
  }, [state.widgetData]);

  // USE EFFECT - UPDATE DELETE_ROW_BTN & UPDATE_BTN VISIBILITY (based on sequence array changes)
  useEffect(() => {
    if (!widgetDataFetchComplete) return;
    dispatch({
      type: "UPDATE_FIELD",
      key: "isAnimUpdateBtnDisabled",
      payload: false,
    });
    if (state.sequence.length <= 1) {
      dispatch({
        type: "UPDATE_FIELD",
        key: "isDeleteRowBtnDisabled",
        payload: true,
      });
    } else {
      dispatch({
        type: "UPDATE_FIELD",
        key: "isDeleteRowBtnDisabled",
        payload: false,
      });
    }
  }, [state.sequence]);

  // USE EFFECT - TEXT_GAP (based on unit & value changes)
  useEffect(() => {
    if (!widgetDataFetchComplete) return;
    const formattedTextGap = `${state.textGapValue}${state.textGapUnit}`;
    dispatch({
      type: "UPDATE_FIELD",
      key: "textGap",
      payload: formattedTextGap,
    });
  }, [state.textGapUnit, state.textGapValue]);

  // USE EFFECT - UPDATE STATIC_TEXT_FONT_SIZE (based on unit & value changes)
  useEffect(() => {
    if (!widgetDataFetchComplete) return;
    const formattedStaticTextFontSize = `${state.staticTextFontSizeValue}${state.staticTextFontSizeUnit}`;

    dispatch({
      type: "UPDATE_FIELD",
      key: "staticTextFontSize",
      payload: formattedStaticTextFontSize,
    });
  }, [state.staticTextFontSizeUnit, state.staticTextFontSizeValue]);

  // USE EFFECT - UPDATE ANIM_TEXT_FONT_SIZE (based on unit & value changes)
  useEffect(() => {
    if (!widgetDataFetchComplete) return;
    const formattedAnimTextFontSize = `${state.animTextFontSizeValue}${state.animTextFontSizeUnit}`;

    dispatch({
      type: "UPDATE_FIELD",
      key: "animTextFontSize",
      payload: formattedAnimTextFontSize,
    });
  }, [state.animTextFontSizeUnit, state.animTextFontSizeValue]);

  // For Subscription
  useEffect(() => {
    getSubscription()
      .then((sub) => {
        dispatch({
          type: "UPDATE_FIELD",
          key: "subscription",
          payload: sub || {},
        });
      })
      .catch(() => {
        dispatch({
          type: "UPDATE_FIELD",
          key: "subscription",
          payload: {},
        });
      });
  }, []);

  // CALLBACKS
  const getDisplaySelectedId = useCallback(() => {
    const id = getIdByValue(DISPLAY_OPTIONS, state.display || "");
    return id;
  }, [state.display]);

  const getTextAlignSelectedId = useCallback(() => {
    const id = getIdByValue(TEXT_ALIGN_OPTIONS, state.textAlign || "");
    return id;
  }, [state.textAlign]);

  const getAlignVerticalSelectedId = useCallback(() => {
    const id = getIdByValue(ALIGN_ITEMS_OPTIONS, state.alignVertically || "");
    return id;
  }, [state.alignVertically]);

  const getAlignHorizontalSelectedId = useCallback(() => {
    const id = getIdByValue(
      JUSTIFY_CONTENT_OPTIONS,
      state.alignHorizontally || ""
    );
    return id;
  }, [state.alignHorizontally]);

  const getTextStyleId = useCallback(() => {
    const id = getIdByValue(TEXT_STYLE_OPTIONS, state.selectedTextStyle || "");
    return id;
  }, [state.selectedTextStyle]);

  const getTextGapUnitSelectedId = useCallback(() => {
    const id = getIdByValue(CSS_TYPOGRAPHY_UNITS, state.textGapUnit || "");
    return id;
  }, [state.textGapUnit]);

  const checkTextGapInputRange = useCallback(() => {
    const min: number = 0;
    const max: number = 50;
    const isInputInRange = checkRange(state.textGapValue, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.textGapValue]);

  const getStaticTxtFontSizeUnitSelectedId = useCallback(() => {
    const id = getIdByValue(
      CSS_TYPOGRAPHY_UNITS,
      state.staticTextFontSizeUnit || ""
    );
    return id;
  }, [state.staticTextFontSizeUnit]);

  const getAnimTxtFontSizeUnitSelectedId = useCallback(() => {
    const id = getIdByValue(
      CSS_TYPOGRAPHY_UNITS,
      state.animTextFontSizeUnit || ""
    );
    return id;
  }, [state.animTextFontSizeUnit]);

  const checkStaticTxtFontSizeInputRange = useCallback(() => {
    const min: number = 1;
    const max: number = 52;
    const isInputInRange = checkRange(state.staticTextFontSizeValue, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.staticTextFontSizeValue]);

  const checkAnimTxtFontSizeInputRange = useCallback(() => {
    const min: number = 1;
    const max: number = 52;
    const isInputInRange = checkRange(state.animTextFontSizeValue, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.animTextFontSizeValue]);

  const checkNumberOfLoopsInputRange = useCallback(() => {
    const min: number = 0;
    const max: number = 10;
    const isInputInRange = checkRange(state.numberOfLoops, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.numberOfLoops]);

  const checkTypingSpeedInputRange = useCallback(() => {
    const min: number = 10;
    const max: number = 1000;
    const isInputInRange = checkRange(state.typingSpeed, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.typingSpeed]);

  const checkDeleteSpeedInputRange = useCallback(() => {
    const min: number = 10;
    const max: number = 1000;
    const isInputInRange = checkRange(state.deleteSpeed, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.deleteSpeed]);

  const checkAnimationDelayInputRange = useCallback(() => {
    const min: number = 0;
    const max: number = 5000;
    const isInputInRange = checkRange(state.animationDelay, min, max);
    if (isInputInRange) {
      return {
        status: undefined,
        message: undefined,
      };
    } else {
      return {
        status: "warning" as FieldSetStatusType,
        message: `Enter a number between ${min} and ${max}`,
      };
    }
  }, [state.animationDelay]);

  // Methods
  const addRow = (index: number) => {
    try {
      const newText = "New Text";
      const copyArr = [...state.sequence];
      copyArr?.splice(index + 1, 0, newText);

      dispatch({
        type: "SET_SEQUENCE",
        payload: copyArr,
      });
    } catch (error) {
      console.error("Error in addRow", error);
    }
  };

  const removeRow = (index: number) => {
    try {
      const copyArr = [...state.sequence];
      copyArr.splice(index, 1);
      dispatch({
        type: "SET_SEQUENCE",
        payload: copyArr,
      });
    } catch (error) {
      console.error("Error in removeRow", error);
    }
  };

  const handleBackgroundColorToggle = (checked: boolean): void => {
    try {
      dispatch({
        type: "TOGGLE_BOOLEAN",
        key: "makeWidgetTransparent",
      });

      if (checked) {
        dispatch({
          type: "UPDATE_FIELD",
          key: "widgetBackgroundColor",
          payload: "",
        });
      } else {
        dispatch({
          type: "UPDATE_FIELD",
          key: "widgetBackgroundColor",
          payload: "#121212",
        });
      }
    } catch (error) {
      console.error("Error in handleBackgroundColorToggle", error);
    }
  };

  const handleBackgroundColorChange = (color: string): void => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "widgetBackgroundColor",
        payload: color,
      });
    } catch (error) {
      console.error("Error in handleBackgroundColorChange", error);
    }
  };

  function handleTextChange(index: number, value: string) {
    try {
      const copyArr = [...state.sequence];
      copyArr[index] = value;
      dispatch({
        type: "SET_SEQUENCE",
        payload: copyArr,
      });
    } catch (error) {
      console.error("Error in handleTextChange", error);
    }
  }

  function handleStaticFontColorChange(color: string) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "staticTextFontColor",
        payload: color,
      });
    } catch (error) {
      console.error("Error in handleStaticFontColorChange", error);
    }
  }
  function handleDynamicFontColorChange(color: string) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "dynamicTextFontColor",
        payload: color,
      });
    } catch (error) {
      console.error("Error in handleDynamicFontColorChange", error);
    }
  }

  function handleAnimationUpdate(): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "isAnimUpdateBtnDisabled",
        payload: true,
      });
      // TO_DO
    } catch (error) {
      console.error("Error in handleAnimationUpdate", error);
    }
  }

  function handleStaticText(value: string): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "staticText",
        payload: value || "",
      });
      if (value) {
        dispatch({
          type: "UPDATE_FIELD",
          key: "isStaticTextStyleCustomizationsVisible",
          payload: true,
        });
      } else {
        dispatch({
          type: "UPDATE_FIELD",
          key: "isStaticTextStyleCustomizationsVisible",
          payload: false,
        });
        dispatch({
          type: "UPDATE_FIELD",

          key: "staticTextFontColor",
          payload: DEFAULT_WIDGET_DATA?.staticText?.fontColor,
        });
        const inputValue =
          DEFAULT_WIDGET_DATA?.staticText?.fontWeight?.toLowerCase();
        const staticTextFontWeightSelectedId = memoizedFontWeightOptions?.find(
          (option) => option.value === inputValue
        )?.id;
        dispatch({
          type: "UPDATE_FIELD",
          key: "staticTextFontWeight",
          payload: staticTextFontWeightSelectedId || "fw-10",
        });
      }
    } catch (error) {
      console.error("Error in handleStaticText", error);
    }
  }

  function handleStaticTextFontWeight(option: DropdownLayoutValueOption): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "staticTextFontWeight",
        payload: option?.id?.toString(),
      });
    } catch (error) {
      console.error("Error in handleStaticTextFontWeight", error);
    }
  }
  function handleDynamicTextFontWeight(
    option: DropdownLayoutValueOption
  ): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "animTextFontWeight",
        payload: option?.id?.toString(),
      });
    } catch (error) {
      console.error("Error in handleDynamicTextFontWeight", error);
    }
  }

  function handleTextStyleDropdown(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "selectedTextStyle",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleTextStyleDropdown", error);
    }
  }

  function handleDisplayChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "display",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleDisplayChange", error);
    }
  }

  function handleTextAlignmentChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "textAlign",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleTextAlignmentChange", error);
    }
  }

  function handleAlignVerticallyChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "alignVertically",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleAlignVerticallyChange", error);
    }
  }

  function handleAlignHorizontallyChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "alignHorizontally",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleAlignHorizontallyChange", error);
    }
  }

  function handleTextGapValueChange(value: number) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "textGapValue",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleTextGapValueChange", error);
    }
  }

  function handleTextGapUnitChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "textGapUnit",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleTextGapUnitChange", error);
    }
  }

  function handleStaticTxtFontSizeValueChange(value: number) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "staticTextFontSizeValue",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleStaticTxtFontSizeValueChange", error);
    }
  }

  function handleAnimTxtFontSizeValueChange(value: number) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "animTextFontSizeValue",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleAnimTxtFontSizeValueChange", error);
    }
  }

  function handleStaticTextFontSizeUnitChange(
    option: DropdownLayoutValueOption
  ) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "staticTextFontSizeUnit",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleStaticTextFontSizeUnitChange", error);
    }
  }

  function handleAnimTextFontSizeUnitChange(option: DropdownLayoutValueOption) {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "animTextFontSizeUnit",
        payload: option?.value?.toString(),
      });
    } catch (error) {
      console.error("Error in handleAnimTextFontSizeUnitChange", error);
    }
  }

  function handleAnimationCursorToggle(checked: boolean): void {
    try {
      dispatch({
        type: "TOGGLE_BOOLEAN",
        key: "showAnimationCursor",
      });
    } catch (error) {
      console.error("Error in handleAnimationCursorToggle", error);
    }
  }
  function handleAnimationCursorChange(value: string): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "animationCursor",
        payload: value || "",
      });
    } catch (error) {
      console.error("Error in handleAnimationCursorChange", error);
    }
  }

  function handleNumOfLoopsChange(value: number): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "numberOfLoops",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleNumOfLoopsChange", error);
    }
  }

  function handleTypingSpeedValueChange(value: number): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "typingSpeed",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleTypingSpeedValueChange", error);
    }
  }

  function handleDeleteSpeedValueChange(value: number): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "deleteSpeed",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleDeleteSpeedValueChange", error);
    }
  }

  function handleAnimationDelayChange(value: number): void {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        key: "animationDelay",
        payload: value,
      });
    } catch (error) {
      console.error("Error in handleAnimationDelayChange", error);
    }
  }

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />;
      </div>
    ); // Placeholder while loading
  }

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Content stretchVertically noPadding>
          {/* Alert Banner */}
          <AlertBanner showBanner={false} widgetName="Typing Effect" />
          {/* Tutorial Link Text */}
          <SidePanel.Field divider="auto" noPadding>
            <Box
              marginTop={3}
              marginBottom={3}
              alignContent="center"
              align="center"
            >
              <Text size="small">
                How to use the app{" "}
                <a
                  href={SUPPORT_ARTICLE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Tutorial
                </a>
              </Text>
            </Box>
          </SidePanel.Field>
          <SidePanel.Section
            title={<div className={styles.section}>Customize Design</div>}
          >
            <SidePanel.Field divider="auto" noPadding>
              {/* Alignment Controls */}
              <Box className={styles.box} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>Customize Alignment</h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                >
                  {/* DISPLAY DROPDOWN */}
                  <FormField
                    label="Use Flex Layout"
                    infoContent="Enable flexible box layout for alignment control."
                    infoTooltipProps={{
                      textAlign: "center",
                    }}
                  >
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={DISPLAY_OPTIONS}
                      onSelect={(option) => handleDisplayChange(option)}
                      selectedId={getDisplaySelectedId()}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FormField>

                  {state.display === "Flex" && (
                    <>
                      {/* CENTER VERTICALLY DROPDOWN */}
                      <FormField
                        label="Align Vertically"
                        infoContent="Align content vertically."
                        infoTooltipProps={{
                          textAlign: "center",
                        }}
                      >
                        <Dropdown
                          placeholder="Select"
                          size="small"
                          options={ALIGN_ITEMS_OPTIONS}
                          onSelect={(option) =>
                            handleAlignVerticallyChange(option)
                          }
                          selectedId={getAlignVerticalSelectedId()}
                          popoverProps={{
                            dynamicWidth: true,
                          }}
                        />
                      </FormField>
                      {/* CENTER HORIZONTALLY DROPDOWN */}
                      <FormField
                        label="Align Horizontally"
                        infoContent="Align content horizontally."
                        infoTooltipProps={{
                          textAlign: "center",
                        }}
                      >
                        <Dropdown
                          placeholder="Select"
                          size="small"
                          options={JUSTIFY_CONTENT_OPTIONS}
                          onSelect={(option) =>
                            handleAlignHorizontallyChange(option)
                          }
                          selectedId={getAlignHorizontalSelectedId()}
                          popoverProps={{
                            dynamicWidth: true,
                          }}
                        />
                      </FormField>
                    </>
                  )}
                </FieldSet>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field divider="auto" noPadding>
              <Box className={styles.box} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>Customize Text</h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                >
                  {/* TEXT STYLE DROPDOWN */}
                  <FormField
                    label="Text Style"
                    infoContent="Select the text style for both static and animation texts."
                    infoTooltipProps={{
                      textAlign: "center",
                    }}
                  >
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={TEXT_STYLE_OPTIONS}
                      selectedId={getTextStyleId()}
                      onSelect={(option) => {
                        handleTextStyleDropdown(option);
                      }}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FormField>
                  {/* TEXT ALIGN DROPDOWN */}
                  <FormField
                    label="Text Alignment"
                    infoContent="Align text within the widget container."
                    infoTooltipProps={{
                      textAlign: "center",
                    }}
                  >
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={TEXT_ALIGN_OPTIONS}
                      onSelect={(option) => handleTextAlignmentChange(option)}
                      selectedId={getTextAlignSelectedId()}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FormField>
                  {/* TEXT GAP */}
                  <FieldSet
                    gap="small"
                    legend="Spacing between texts"
                    columns="auto 75px 70px"
                    status={checkTextGapInputRange().status}
                    statusMessage={checkTextGapInputRange().message}
                  >
                    {/* TEXT GAP - UNIT VALUE SLIDER */}
                    <Slider
                      onChange={(value) =>
                        handleTextGapValueChange(value as number)
                      }
                      min={0}
                      max={50}
                      value={state.textGapValue}
                      displayMarks={false}
                    />
                    {/* TEXT GAP - UNIT VALUE INPUT */}
                    <NumberInput
                      value={state.textGapValue}
                      min={0}
                      max={50}
                      onChange={(value) => handleTextGapValueChange(value || 0)}
                      suffix={<Input.Affix>{state.textGapUnit}</Input.Affix>}
                      size="small"
                      hideStepper
                    />
                    {/* TEXT GAP - UNIT DROPDOWN */}
                    <Dropdown
                      size="small"
                      options={CSS_TYPOGRAPHY_UNITS}
                      selectedId={getTextGapUnitSelectedId()}
                      onSelect={(option) => handleTextGapUnitChange(option)}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FieldSet>
                </FieldSet>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field divider="auto" noPadding>
              <Box className={styles.box} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>Customize Background</h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                >
                  {/* BACKGROUND TRANSPARENT SWITCH */}
                  <FormField
                    label="Background Transparent"
                    labelPlacement="left"
                    labelWidth="1fr"
                  >
                    <ToggleSwitch
                      size="medium"
                      checked={state.makeWidgetTransparent}
                      onChange={(event) =>
                        handleBackgroundColorToggle(event.target.checked)
                      }
                    />
                  </FormField>
                  {!state.makeWidgetTransparent && (
                    // BACKGROUND COLOR INPUT
                    <FormField
                      label="Background Color"
                      infoContent="Customize the background color of the widget"
                    >
                      <ColorInput
                        size="small"
                        value={state.widgetBackgroundColor}
                        onConfirm={(color) => {
                          handleBackgroundColorChange(color as string);
                        }}
                        popoverPlacement="top-end"
                        popoverProps={{
                          animate: true,
                        }}
                      />
                    </FormField>
                  )}
                </FieldSet>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field divider="auto" noPadding>
              {/* STATIC TEXT & STYLES */}
              <Box className={styles.box} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>
                      Design Static Text Alone
                    </h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                  legendSize="small"
                >
                  {/* STATIC TEXT - INPUT */}
                  <div className={`${styles.fullWidthBox} ${styles.box}`}>
                    <FormField label="Add Static Text">
                      <Input
                        size="small"
                        type="text"
                        value={state.staticText}
                        onChange={(e) => handleStaticText(e.target.value)}
                      />
                    </FormField>
                  </div>
                  {state.isStaticTextStyleCustomizationsVisible && (
                    <>
                      {/* STATIC TEXT - FONT COLOR INPUT */}
                      <FormField label="Font Color">
                        <ColorInput
                          size="small"
                          value={state.staticTextFontColor}
                          onConfirm={(color) => {
                            handleStaticFontColorChange(color as string);
                          }}
                          popoverPlacement="top-end"
                          popoverProps={{
                            animate: true,
                          }}
                        />
                      </FormField>
                      {/* STATIC TEXT - FONT WEIGHT DROPDOWN */}
                      <FormField label="Font Weight">
                        <Dropdown
                          placeholder="Select"
                          size="small"
                          options={memoizedFontWeightOptions}
                          onSelect={(option) =>
                            handleStaticTextFontWeight(option)
                          }
                          selectedId={state.staticTextFontWeight}
                        />
                      </FormField>
                      {/* STATIC TEXT - FONT SIZE */}
                      <FieldSet
                        gap="small"
                        legend="Font Size"
                        columns="auto 75px 70px"
                        status={checkStaticTxtFontSizeInputRange().status}
                        statusMessage={
                          checkStaticTxtFontSizeInputRange().message
                        }
                      >
                        {/* STATIC TEXT - FONT SIZE - UNIT VALUE SLIDER */}
                        <Slider
                          onChange={(value) =>
                            handleStaticTxtFontSizeValueChange(value as number)
                          }
                          min={1}
                          max={52}
                          value={state.staticTextFontSizeValue}
                          displayMarks={false}
                        />
                        {/* STATIC TEXT - FONT SIZE - UNIT VALUE INPUT */}
                        <NumberInput
                          value={state.staticTextFontSizeValue}
                          min={1}
                          max={52}
                          onChange={(value) =>
                            handleStaticTxtFontSizeValueChange(value || 1)
                          }
                          suffix={
                            <Input.Affix>
                              {state.staticTextFontSizeUnit}
                            </Input.Affix>
                          }
                          size="small"
                          hideStepper
                        />
                        {/* STATIC TEXT - FONT SIZE - UNIT DROPDOWN */}
                        <Dropdown
                          size="small"
                          options={CSS_TYPOGRAPHY_UNITS}
                          selectedId={getStaticTxtFontSizeUnitSelectedId()}
                          onSelect={(option) =>
                            handleStaticTextFontSizeUnitChange(option)
                          }
                          popoverProps={{
                            dynamicWidth: true,
                          }}
                        />
                      </FieldSet>
                    </>
                  )}
                </FieldSet>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field divider="auto" noPadding>
              {/* ANIMATION TEXT'S STYLE */}
              <Box className={styles.box} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>
                      Design Animation Text Alone
                    </h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                  legendSize="small"
                >
                  {/* ANIMATION TEXT - FONT COLOR INPUT */}
                  <FormField label="Font Color">
                    <ColorInput
                      size="small"
                      value={state.dynamicTextFontColor}
                      onConfirm={(color) => {
                        handleDynamicFontColorChange(color as string);
                      }}
                      popoverPlacement="top-end"
                      popoverProps={{
                        animate: true,
                      }}
                    />
                  </FormField>
                  {/* ANIMATION TEXT - FONT WEIGHT DROPDOWN */}
                  <FormField label="Font Weight">
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={memoizedFontWeightOptions}
                      onSelect={(option) => handleDynamicTextFontWeight(option)}
                      selectedId={state.animTextFontWeight}
                    />
                  </FormField>
                  {/* ANIMATION TEXT - FONT SIZE */}
                  <FieldSet
                    gap="small"
                    legend="Font Size"
                    columns="auto 75px 70px"
                    status={checkAnimTxtFontSizeInputRange().status}
                    statusMessage={checkAnimTxtFontSizeInputRange().message}
                  >
                    {/* ANIMATION TEXT - FONT SIZE - UNIT VALUE SLIDER */}
                    <Slider
                      onChange={(value) =>
                        handleAnimTxtFontSizeValueChange(value as number)
                      }
                      min={1}
                      max={52}
                      value={state.animTextFontSizeValue}
                      displayMarks={false}
                    />
                    {/* ANIMATION TEXT - FONT SIZE - UNIT VALUE INPUT */}
                    <NumberInput
                      value={state.animTextFontSizeValue}
                      min={1}
                      max={52}
                      onChange={(value) =>
                        handleAnimTxtFontSizeValueChange(value || 1)
                      }
                      suffix={
                        <Input.Affix>{state.animTextFontSizeUnit}</Input.Affix>
                      }
                      size="small"
                      hideStepper
                    />
                    {/* ANIMATION TEXT - FONT SIZE - UNIT DROPDOWN */}
                    <Dropdown
                      size="small"
                      options={CSS_TYPOGRAPHY_UNITS}
                      selectedId={getAnimTxtFontSizeUnitSelectedId()}
                      onSelect={(option) =>
                        handleAnimTextFontSizeUnitChange(option)
                      }
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FieldSet>
                </FieldSet>
              </Box>
            </SidePanel.Field>
          </SidePanel.Section>
          <SidePanel.Section
            title={<div className={styles.section}>Customize Animation</div>}
          >
            <SidePanel.Field divider="auto" noPadding>
              {/* Animation Inputs Box */}
              <Box className={styles.box} marginTop={1} marginBottom={3}>
                <FieldSet
                  legend=""
                  gap="large"
                  alignment="center"
                  direction="vertical"
                >
                  {state.sequence.map((item, index) => (
                    <FieldSet
                      gap="medium"
                      legend=""
                      legendPlacement="none"
                      columns="auto 30px 30px"
                    >
                      <Input
                        size="small"
                        type="text"
                        value={item}
                        onChange={(e) => {
                          handleTextChange(index, e.target.value);
                        }}
                        placeholder="Enter text"
                      />
                      <Tooltip content="Delete text">
                        <IconButton
                          size="small"
                          skin="standard"
                          priority="secondary"
                          disabled={state.isDeleteRowBtnDisabled}
                          onClick={() => removeRow(index)}
                        >
                          <Icons.DeleteSmall />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Add text after">
                        <IconButton
                          size="small"
                          skin="standard"
                          priority="primary"
                          onClick={() => addRow(index)}
                        >
                          <Icons.Add />
                        </IconButton>
                      </Tooltip>
                    </FieldSet>
                  ))}
                </FieldSet>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field noPadding divider="auto">
              <Box className={styles.box} marginTop={2} marginBottom={3}>
                {/* ANIMATION OPTIONS */}
                <FieldSet
                  legend=""
                  gap="large"
                  alignment="center"
                  direction="vertical"
                  legendPlacement="none"
                >
                  <FieldSet
                    gap="medium"
                    legend="Number of Loops"
                    columns="auto 70px"
                    alignment="center"
                    status={checkNumberOfLoopsInputRange().status}
                    statusMessage={checkNumberOfLoopsInputRange().message}
                  >
                    {/* ANIMATION TEXT - NUMBER OF LOOPS SLIDER */}
                    <Slider
                      onChange={(value) =>
                        handleNumOfLoopsChange(value as number)
                      }
                      min={0}
                      max={10}
                      value={state.numberOfLoops}
                      displayMarks={false}
                    />
                    {/* ANIMATION TEXT - NUMBER OF LOOPS INPUT */}
                    <NumberInput
                      value={state.numberOfLoops}
                      min={0}
                      max={10}
                      onChange={(value) =>
                        handleNumOfLoopsChange(
                          (value as number) || (0 as number)
                        )
                      }
                      size="small"
                      hideStepper
                    />
                  </FieldSet>
                  <Box marginBottom={2}>
                    <Text size="small">
                      <b>Note:</b> If you want to set the animation to infinity,
                      set the Number of Loops to 0.
                    </Text>
                  </Box>
                  {/* ANIMATION TEXT - SHOW CURSOR SWITCH */}
                  <FormField
                    label="Show Cursor"
                    labelPlacement="left"
                    labelWidth="1fr"
                  >
                    <ToggleSwitch
                      size="medium"
                      checked={state.showAnimationCursor}
                      onChange={(event) =>
                        handleAnimationCursorToggle(event.target.checked)
                      }
                    />
                  </FormField>
                  {state.showAnimationCursor && (
                    // ANIMATION TEXT - CURSOR INPUT
                    <FieldSet
                      legend="Enter Cursor"
                      legendPlacement="left"
                      columns="auto"
                      infoContent="The input for cursor content is limited for one character."
                    >
                      <Input
                        size="small"
                        type="text"
                        maxLength={1}
                        value={state.animationCursor}
                        onChange={(e) =>
                          handleAnimationCursorChange(e.target.value)
                        }
                      />
                    </FieldSet>
                  )}
                  {/* ANIMATION TEXT - TYPING SPEED */}
                  <FieldSet
                    gap="medium"
                    legend="Typing Speed"
                    columns="auto 100px"
                    alignment="center"
                    status={checkTypingSpeedInputRange().status}
                    statusMessage={checkTypingSpeedInputRange().message}
                  >
                    {/* ANIMATION TEXT - TYPING SPEED SLIDER */}
                    <Slider
                      min={10}
                      max={1000}
                      value={state.typingSpeed}
                      displayMarks={false}
                      onChange={(value) =>
                        handleTypingSpeedValueChange(value as number)
                      }
                    />
                    {/* ANIMATION TEXT - TYPING SPEED INPUT */}
                    <NumberInput
                      value={state.typingSpeed}
                      min={10}
                      max={1000}
                      onChange={(value) => {
                        handleTypingSpeedValueChange(
                          (value as number) || (70 as number)
                        );
                      }}
                      suffix={<Input.Affix>ms</Input.Affix>}
                      size="small"
                      hideStepper
                    />
                  </FieldSet>
                  {/* ANIMATION TEXT - DELETE SPEED */}
                  <FieldSet
                    gap="medium"
                    legend="Delete Speed"
                    columns="auto 100px"
                    alignment="center"
                    status={checkDeleteSpeedInputRange().status}
                    statusMessage={checkDeleteSpeedInputRange().message}
                  >
                    {/* ANIMATION TEXT - DELETE SPEED SLIDER */}
                    <Slider
                      onChange={(value) =>
                        handleDeleteSpeedValueChange(value as number)
                      }
                      min={10}
                      max={1000}
                      value={state.deleteSpeed}
                      displayMarks={false}
                    />
                    {/* ANIMATION TEXT - DELETE SPEED INPUT */}
                    <NumberInput
                      value={state.deleteSpeed}
                      min={10}
                      max={1000}
                      onChange={(value) =>
                        handleDeleteSpeedValueChange(
                          (value as number) || (0 as number)
                        )
                      }
                      suffix={<Input.Affix>ms</Input.Affix>}
                      size="small"
                      hideStepper
                    />
                  </FieldSet>
                  {/* ANIMATION TEXT - ANIMATION DELAY */}
                  <FieldSet
                    gap="medium"
                    legend="Animation Delay"
                    columns="auto 100px"
                    alignment="center"
                    status={checkAnimationDelayInputRange().status}
                    statusMessage={checkAnimationDelayInputRange().message}
                  >
                    {/* ANIMATION TEXT - ANIMATION DELAY SLIDER */}
                    <Slider
                      onChange={(value) =>
                        handleAnimationDelayChange(value as number)
                      }
                      min={0}
                      max={5000}
                      value={state.animationDelay}
                      displayMarks={false}
                    />
                    {/* ANIMATION TEXT - ANIMATION DELAY INPUT */}
                    <NumberInput
                      value={state.animationDelay}
                      min={0}
                      max={5000}
                      onChange={(value) =>
                        handleAnimationDelayChange(value as number)
                      }
                      suffix={<Input.Affix>ms</Input.Affix>}
                      size="small"
                      hideStepper
                    />
                  </FieldSet>
                </FieldSet>
              </Box>
            </SidePanel.Field>
          </SidePanel.Section>
          {/* SUPPORT SECTION */}
          <SupportSection
            instanceId={state.subscription.instanceId}
            appName={APP_NAME}
            supportUrlBase={SUPPORT_LINK_BASE_URL}
            marketUrl={MKP_APP_MARKET_URL}
          />
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
