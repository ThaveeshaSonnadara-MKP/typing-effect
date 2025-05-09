import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import GraphemeSplitter from "grapheme-splitter";
import { WixDesignSystemProvider, Box } from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import styles from "./element.module.css";
import { Typewriter } from "react-simple-typewriter";

const SPLITTER = new GraphemeSplitter();

interface Props {
  widgetData?: string;
}

type StaticTextProps = {
  text: string;
  fontSize: string;
  fontColor: string;
  fontWeight: string;
};

type DynamicTextProps = {
  texts: string[];
  fontSize: string;
  fontColor: string;
  fontWeight: string;
};

type WidgetData = {
  staticText: StaticTextProps;
  dynamicText: DynamicTextProps;
  backgroundColor: string;
  textElementType: string;
  textsGap: string;
  alignItemsCenter: boolean;
  textAlignCenter: boolean;
  justifyContentCenter: boolean;
  displayFlex: boolean;
};

const DEFAULT_SEQUENCE = [
  "We produce food for Mice",
  "We produce food for Hamsters",
  "We produce food for Guinea Pigs",
  "We produce food for Chinchillas",
];

const DYNAMIC_TEXT_PROPS: DynamicTextProps = {
  texts: DEFAULT_SEQUENCE,
  fontSize: "1rem",
  fontColor: "",
  fontWeight: "Bold",
};

const DEFAULT_STATIC_TEXT_PROPS: StaticTextProps = {
  text: "Welcome...",
  fontSize: "1rem",
  fontColor: "#000000",
  fontWeight: "Normal",
};

const DEFAULT_WIDGET_DATA: WidgetData = {
  staticText: DEFAULT_STATIC_TEXT_PROPS,
  dynamicText: DYNAMIC_TEXT_PROPS,
  backgroundColor: "#121212",
  textElementType: "h1",
  textsGap: "5px",
  alignItemsCenter: true,
  textAlignCenter: false,
  justifyContentCenter: true,
  displayFlex: true,
};

const TypingEffectWidget: FC<Props> = ({ widgetData }) => {
  // STATES
  const [widgetDataState, setWidgetDataState] =
    useState<WidgetData>(DEFAULT_WIDGET_DATA);

  // USE_EFFECTS
  useEffect(() => {
    console.log("Running Use Effect...");

    if (widgetData) {
      const widgetDataObj = JSON.parse(widgetData);
      console.log("widgetData Object:", widgetDataObj);

      if (widgetDataObj) {
      }

      setWidgetDataState(widgetDataObj);
    } else {
      setWidgetDataState(DEFAULT_WIDGET_DATA);
    }
  }, []);

  const splitUsersInputTexts = useCallback(() => {
    const texts: string[] = widgetDataState.dynamicText.texts;
    const formattedArray: string[] = [];
    texts.forEach((text) => {
      const result: string = SPLITTER.splitGraphemes(text).join("");
      formattedArray.push(result);
    });

    console.log("SPLITTER Result:", formattedArray);
    return formattedArray;
  }, [widgetDataState, setWidgetDataState]);

  return (
    <div
      style={{
        backgroundColor: `${widgetDataState?.backgroundColor || "transparent"}`,
      }}
      className={`${
        widgetDataState?.displayFlex ? styles.flex : styles.block
      } ${widgetDataState?.alignItemsCenter ? styles.alignItemsCenter : ""} ${
        widgetDataState?.justifyContentCenter ? styles.justifyContentCenter : ""
      } ${widgetDataState?.textAlignCenter ? styles.textAlignCenter : ""}`}
    >
      {(() => {
        switch (widgetDataState?.textElementType) {
          case "h1":
            return (
              <h1
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
            );
          case "h2":
            return (
              <h2
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h2>
            );
          case "h3":
            return (
              <h3
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h3>
            );
          case "h4":
            return (
              <h4
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h4>
            );
          case "h5":
            return (
              <h5
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h5>
            );
          case "h6":
            return (
              <h6
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h6>
            );
          case "p":
            return (
              <p
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </p>
            );
          case "span":
            return (
              <span
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </span>
            );
          default:
            return (
              <h1
                style={{
                  color: `${widgetDataState?.staticText?.fontColor}`,
                  fontWeight: `${widgetDataState?.staticText?.fontWeight}`,
                  fontSize: `${widgetDataState?.staticText?.fontSize}`,
                }}
              >
                {widgetDataState?.staticText?.text}
                <span
                  style={{
                    color: `${widgetDataState?.dynamicText?.fontColor}`,
                    fontWeight: `${widgetDataState?.dynamicText?.fontWeight}`,
                    fontSize: `${widgetDataState?.dynamicText?.fontSize}`,
                    marginLeft: `${
                      widgetDataState?.staticText?.text
                        ? widgetDataState?.textsGap
                        : 0
                    }`,
                  }}
                >
                  {/* Style will be inherited from the parent element */}
                  <Typewriter
                    words={splitUsersInputTexts()}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </h1>
            );
        }
      })()}
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
