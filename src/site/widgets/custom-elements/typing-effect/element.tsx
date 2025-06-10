import "@wix/design-system/styles.global.css";

import GraphemeSplitter from "grapheme-splitter";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Typewriter } from "react-simple-typewriter";
import reactToWebComponent from "react-to-webcomponent";

import {
  DEFAULT_TEMPLATE,
  VALID_TEXT_ALIGN_VALUES,
} from "../../../../constants/common-constants";
import { DEFAULT_DATA } from "../../../../constants/templates-constants";
import { TextAlign, WidgetData } from "../../../../types/common-types";
import styles from "./element.module.css";

const SPLITTER = new GraphemeSplitter();

interface Props {
  widgetData: string;
}

const getValidTextAlign = (value?: string): TextAlign => {
  const val = value?.toLowerCase();
  return VALID_TEXT_ALIGN_VALUES.includes(val as TextAlign)
    ? (val as TextAlign)
    : "center";
};

const TypingEffectWidget: FC<Props> = ({ widgetData }) => {
  const [widgetDataState, setWidgetDataState] = useState<WidgetData>(
    DEFAULT_DATA[DEFAULT_TEMPLATE]
  );
  const [templateState, setTemplateState] = useState<string>(DEFAULT_TEMPLATE);
  const [doCustomize, setDoCustomize] = useState<string>("false");

  // Initial effect to parse widgetData prop
  // and set the initial state
  // This effect runs only once when the component mounts
  // and updates the widgetDataState with the parsed data
  // If widgetData is not provided, it will use the default template data
  useEffect(() => {
    if (!widgetData) return;
    try {
      const parsed = JSON.parse(widgetData);
      console.log("[element - Initial] Widget data updated from prop:", parsed);
      setWidgetDataState(parsed);
      setDoCustomize(parsed.doCustomize);
      setTemplateState(parsed.templateId);
    } catch (error) {
      console.error("[element - Initial] Failed to parse widgetData:", error);
    }
  }, [widgetData]);

  // Effect to update doCustomize state when widgetDataState.doCustomize changes
  // This effect runs whenever the doCustomize in widgetDataState changes
  // and updates the doCustomize state with the new value
  // If doCustomize is not provided, it defaults to "false"
  // This is useful for controlling customization options in the widget
  // useEffect(() => {
  //   console.log(
  //     "[element - DO_CUSTOMIZE] Updated doCustomize:",
  //     widgetDataState.doCustomize
  //   );
  //   setDoCustomize(widgetDataState.doCustomize);
  // }, [widgetDataState.doCustomize]);

  // Effect to update templateState when the widgetDataState.templateId changes
  // This effect runs whenever the templateId in widgetDataState changes
  // and updates the templateState with the new templateId
  // If templateId is not provided, it defaults to DEFAULT_TEMPLATE
  // useEffect(() => {
  //   console.log(
  //     "[element - TEMPLATE_STATE] Updated templateState:",
  //     widgetDataState.templateId
  //   );
  //   // setTemplateState(widgetDataState.templateId);
  // }, [widgetDataState.templateId]);

  // Effect to fetch the template data based on the templateState
  // This effect runs whenever the templateState changes
  // and updates the widgetDataState with the corresponding template data
  // useEffect(() => {
  //   try {
  //     console.log(
  //       "[element - WIDGET_DATA_STATE] Template state changed:",
  //       templateState
  //     );
  //     const templateData =
  //       DEFAULT_DATA[templateState as keyof typeof DEFAULT_DATA];
  //     console.log(
  //       "[element - WIDGET_DATA_STATE] Current Template data:",
  //       templateData
  //     );
  //     // Update widgetDataState with the template data
  //     // setWidgetDataState(templateData);
  //   } catch (error) {
  //     console.error(
  //       "[element - WIDGET_DATA_STATE] Error in templateState fetch.",
  //       error
  //     );
  //   }
  // }, [templateState]);

  // Memoized callbacks
  const getDynamicFontWeight = useCallback(() => {
    const raw = widgetDataState.dynamicText.fontWeight.toLowerCase();
    return raw === "bolder" ? 900 : raw;
  }, [widgetDataState.dynamicText.fontWeight]);

  const getStaticFontWeight = useCallback(() => {
    const raw = widgetDataState.staticText.fontWeight.toLowerCase();
    return raw === "bolder" ? 900 : raw;
  }, [widgetDataState.staticText.fontWeight]);

  const typedWords = () => {
    return (widgetDataState.dynamicText.texts || [""]).map((t) =>
      SPLITTER.splitGraphemes(t).join("")
    );
  };

  // Memoized styles
  const containerStyles = useMemo(
    () => ({
      backgroundColor: widgetDataState?.backgroundColor || "transparent",
      display: widgetDataState?.display?.toLowerCase() || "flex",
      alignItems: widgetDataState?.alignItems?.toLowerCase() || "center",
      justifyContent:
        widgetDataState?.justifyContent?.toLowerCase() || "center",
      textAlign: getValidTextAlign(widgetDataState?.textAlignProp),
    }),
    [
      widgetDataState?.backgroundColor,
      widgetDataState?.display,
      widgetDataState?.alignItems,
      widgetDataState?.justifyContent,
      widgetDataState?.textAlignProp,
    ]
  );

  const staticTextStyles = useMemo(
    () => ({
      color: widgetDataState.staticText.fontColor,
      fontWeight: getStaticFontWeight(),
      fontSize: `${widgetDataState.staticText.fontSizeValue}${widgetDataState.staticText.fontSizeUnit}`,
    }),
    [
      widgetDataState.staticText.fontColor,
      widgetDataState.staticText.fontSizeValue,
      widgetDataState.staticText.fontSizeUnit,
      getStaticFontWeight,
    ]
  );

  const dynamicTextStyles = useMemo(
    () => ({
      color: widgetDataState.dynamicText.fontColor,
      fontWeight: getDynamicFontWeight(),
      fontSize: `${widgetDataState.dynamicText.fontSizeValue}${widgetDataState.dynamicText.fontSizeUnit}`,
      marginLeft: widgetDataState.staticText.text
        ? `${widgetDataState.textsGapValue}${widgetDataState.textsGapUnit}`
        : 0,
    }),
    [
      widgetDataState.dynamicText.fontColor,
      widgetDataState.dynamicText.fontSizeValue,
      widgetDataState.dynamicText.fontSizeUnit,
      widgetDataState.staticText.text,
      widgetDataState.textsGapValue,
      widgetDataState.textsGapUnit,
      getDynamicFontWeight,
    ]
  );

  // Memoized typewriter props
  const typewriterProps = useMemo(
    () => ({
      words: typedWords(),
      loop: widgetDataState.animationOptions?.loop ?? 0,
      cursor: widgetDataState.animationOptions?.cursor ?? true,
      cursorStyle: widgetDataState.animationOptions?.cursorStyle ?? "|",
      typeSpeed: widgetDataState.animationOptions?.typeSpeed ?? 70,
      deleteSpeed: widgetDataState.animationOptions?.deleteSpeed ?? 50,
      delaySpeed: widgetDataState.animationOptions?.delaySpeed ?? 1000,
    }),
    [typedWords, widgetDataState.animationOptions]
  );

  function getTemplateClass(templateState: string) {
    switch (templateState) {
      case "Template 1":
        return styles.template1;
      case "Template 2":
        return styles.template2;
      case "Template 3":
        return styles.template3;
      case "Template 4":
        return styles.template4;
      default:
        return "";
    }
  }

  return (
    <div
      style={{
        backgroundColor: widgetDataState?.backgroundColor || "transparent",
        display: widgetDataState?.display?.toLowerCase() || "flex",
        alignItems: widgetDataState?.alignItems?.toLowerCase() || "center",
        justifyContent:
          widgetDataState?.justifyContent?.toLowerCase() || "center",
        textAlign: getValidTextAlign(widgetDataState?.textAlignProp),
        flexDirection:
          widgetDataState.flexDirection === "row" ? "row" : "column",
        borderRadius:
          widgetDataState.templateId === "Template 3" ||
          widgetDataState.templateId === "Template 4"
            ? "5em"
            : "0px",
        padding: "1em",
      }}
    >
      {widgetDataState.staticText.text && (
        <div
          className={styles.staticText}
          style={{
            color: widgetDataState.staticText.fontColor,
            fontWeight: getStaticFontWeight(),
            fontSize: `${widgetDataState.staticText.fontSizeValue}${widgetDataState.staticText.fontSizeUnit}`,
          }}
        >
          <span>{widgetDataState.staticText.text}</span>
        </div>
      )}
      <div
        className={styles.dynamicText}
        style={{
          color: widgetDataState.dynamicText.fontColor,
          fontWeight: getDynamicFontWeight(),
          fontSize: `${widgetDataState.dynamicText.fontSizeValue}${widgetDataState.dynamicText.fontSizeUnit}`,
          marginLeft: widgetDataState.staticText.text
            ? `${widgetDataState.textsGapValue}${widgetDataState.textsGapUnit}`
            : 0,
        }}
      >
        <span>
          <Typewriter
            words={typedWords()}
            loop={widgetDataState.animationOptions?.loop ?? 0}
            cursor={widgetDataState.animationOptions?.cursor ?? true}
            cursorStyle={widgetDataState.animationOptions?.cursorStyle ?? "|"}
            typeSpeed={widgetDataState.animationOptions?.typeSpeed ?? 70}
            deleteSpeed={widgetDataState.animationOptions?.deleteSpeed ?? 50}
            delaySpeed={widgetDataState.animationOptions?.delaySpeed ?? 1000}
          />
        </span>
      </div>
    </div>
  );
};

const TypingEffectElement = reactToWebComponent(
  TypingEffectWidget,
  React,
  ReactDOM as any,
  {
    props: {
      widgetData: "string",
    },
  }
);

export default TypingEffectElement;
