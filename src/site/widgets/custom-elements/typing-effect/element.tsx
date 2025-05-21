import React, { useEffect, useState, type FC } from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import GraphemeSplitter from "grapheme-splitter";
import "@wix/design-system/styles.global.css";
import { Typewriter } from "react-simple-typewriter";
import { WidgetData } from "../../../../types/common-types";
import { DEFAULT_WIDGET_DATA } from "../../../../Utils/constants";
// import { getHtmlTag } from "../../../../Utils/tools";

const SPLITTER = new GraphemeSplitter();

interface Props {
  widgetData?: string;
}

const VALID_TEXT_ALIGN_VALUES = ["left", "right", "center", "justify"] as const;
type TextAlign = (typeof VALID_TEXT_ALIGN_VALUES)[number];

const TypingEffectWidget: FC<Props> = ({ widgetData }) => {
  // STATES
  const [widgetDataState, setWidgetDataState] =
    useState<WidgetData>(DEFAULT_WIDGET_DATA);

  // USE_EFFECTS
  useEffect(() => {
    // console.log("Fetching widget data...");

    if (!widgetData) return;

    try {
      const parsed = JSON.parse(widgetData);
      if (parsed) {
        setWidgetDataState(parsed);

        // console.log("Updated widget data:", parsed);
        // console.log("Widget data fetched successfully.");
      }
    } catch (e) {
      console.error("Error in widget-data fetch.", e);
    }
  }, [widgetData]);

  const getDynamicFontWeight = () => {
    const rawDynamicFontWeight =
      widgetDataState.dynamicText.fontWeight.toLowerCase();
    if (rawDynamicFontWeight === "bolder") return 900;
    return rawDynamicFontWeight;
  };
  const getStaticFontWeight = () => {
    const rawStaticFontWeight =
      widgetDataState.staticText.fontWeight.toLowerCase();
    if (rawStaticFontWeight === "bolder") return 900;
    return rawStaticFontWeight;
  };

  const typedWords = () => {
    const texts = widgetDataState.dynamicText.texts || [""];
    return texts.map((t) => SPLITTER.splitGraphemes(t).join(""));
  };

  function getValidTextAlign(value?: string): TextAlign {
    const val = value?.toLowerCase();
    return VALID_TEXT_ALIGN_VALUES.includes(val as TextAlign)
      ? (val as TextAlign)
      : "center";
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "50px",
        minWidth: "245px",
        backgroundColor: `${widgetDataState?.backgroundColor || "transparent"}`,
        display: `${widgetDataState?.display?.toLowerCase() || "flex"}`,
        alignItems: `${widgetDataState?.alignItems?.toLowerCase() || "center"}`,
        justifyContent: `${
          widgetDataState?.justifyContent?.toLowerCase() || "center"
        }`,
        textAlign: getValidTextAlign(widgetDataState?.textAlignProp),
      }}
    >
      <span
        style={{
          color: widgetDataState.staticText.fontColor,
          fontWeight: getStaticFontWeight(),
          fontSize: widgetDataState.staticText.fontSize,
        }}
      >
        {widgetDataState.staticText.text}
        <span
          style={{
            color: widgetDataState.dynamicText.fontColor,
            fontWeight: getDynamicFontWeight(),
            fontSize: widgetDataState.dynamicText.fontSize,
            marginLeft: widgetDataState.staticText.text
              ? widgetDataState.textsGap
              : 0,
          }}
        >
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
      </span>
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
