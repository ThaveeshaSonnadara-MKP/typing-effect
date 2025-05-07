import React, { useEffect, useState, type FC } from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import styles from "./element.module.css";

interface Props {
  widgetData?: string;
}

type WidgetData = {
  backgroundColor: string;
  fontColor: string;
  size: string;
  backgroundPresets: string[];
  fontPresets: string[];
};

const DEFAULT_WIDGET_DATA = {
  backgroundColor: "#121212",
  fontColor: "#E0E0E0",
  size: "small",
  backgroundPresets: ["white", "black", "lightcoral"],
  fontPresets: ["white", "black", "lightcoral"],
};

const TypingEffectWidget: FC<Props> = ({ widgetData }) => {
  const [widgetDataState, setWidgetDataState] =
    useState<WidgetData>(DEFAULT_WIDGET_DATA);
  useEffect(() => {
    if (widgetData) {
      setWidgetDataState(JSON.parse(widgetData));
    } else {
      setWidgetDataState(DEFAULT_WIDGET_DATA);
    }
  }, [widgetData]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: widgetDataState.backgroundColor,
        boxSizing: "border-box",
        color: widgetDataState.fontColor,
      }}
    >
      <h2>Test text</h2>
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
