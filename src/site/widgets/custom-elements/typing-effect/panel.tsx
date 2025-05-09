import React, { type FC, useState, useEffect, useMemo } from "react";
import { widget } from "@wix/editor";
import SupportSection from "../../../../components/SupportSection/support-section";
import debounce from "lodash/debounce";
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
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import styles from "./panel.module.css";
import { getSubscription } from "../../../../Utils/subscription";
import { getAppConstants } from "../../../../Utils/constants";
import AlertBanner from "../../../../components/AlertBanner/alert-banner";
import * as Icons from "@wix/wix-ui-icons-common";

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

const {
  APP_NAME,
  MKP_APP_MARKET_URL,
  SUPPORT_LINK_BASE_URL,
  SUPPORT_ARTICLE_LINK,
} = getAppConstants();

const Panel: FC = () => {
  // REFS

  // STATES
  const [widgetData, setWidgetData] = useState<WidgetData>(DEFAULT_WIDGET_DATA);
  const [subscription, setSubscription] = useState<Record<string, any>>({});
  const [makeWidgetTransparent, setMakeWidgetTransparent] =
    useState<boolean>(false);
  const [widgetBackgroundColor, setWidgetBackgroundColor] =
    useState<string>("#121212");
  const [staticTextFontColor, setStaticTextFontColor] =
    useState<string>("#000000");
  const [sequence, setSequence] = useState<string[]>([
    "We produce food for Mice",
    "We produce food for Hamsters",
    "We produce food for Guinea Pigs",
    "We produce food for Chinchillas",
  ]);
  const [isAnimUpdateBtnDisabled, setIsAnimUpdateBtnDisabled] =
    useState<boolean>(true);

  // MEMOS
  const updateWidgetBackgroundDebounce = useMemo(() => {
    return debounce((color: string) => {
      setWidgetBackgroundColor(color);
    }, 300);
  }, []);
  const addRowDebounce = useMemo(() => {
    return debounce((index: number) => {
      const newText = "New Text";
      const copyArr = [...sequence];
      copyArr?.splice(index + 1, 0, newText);
      setSequence(copyArr);
    }, 300);
  }, []);
  const removeRowDebounce = useMemo(() => {
    return debounce((index: number) => {
      const copyArr = [...sequence];
      copyArr.splice(index, 1);
      setSequence(copyArr);
    }, 300);
  }, []);
  const updateSequenceDebounce = useMemo(() => {
    return debounce((index: number, value: string) => {
      const copyArr = [...sequence];
      copyArr[index] = value;
      setSequence(copyArr);
    }, 300);
  }, []);

  // EFFECTS
  useEffect(() => {
    console.log("Fetching widget data...");

    widget
      .getProp("widget-data")
      .then((widgetData) => {
        // Update States
        const widgetDataObj: WidgetData = JSON.parse(widgetData);
        setWidgetData(widgetDataObj || DEFAULT_WIDGET_DATA);
        setWidgetBackgroundColor(
          widgetDataObj?.backgroundColor || DEFAULT_WIDGET_DATA?.backgroundColor
        );
        setSequence(
          widgetDataObj?.dynamicText?.texts ||
            DEFAULT_WIDGET_DATA?.dynamicText?.texts
        );
        setStaticTextFontColor(
          widgetDataObj?.staticText?.fontColor ||
            DEFAULT_WIDGET_DATA?.staticText?.fontColor
        );
        console.log("Widget-data fetched successfully.");
      })
      .catch((error) => console.error("Failed to fetch widget-name:", error));
  }, []);

  useEffect(() => {
    setIsAnimUpdateBtnDisabled(false);
  }, [sequence]);

  // For Subscription
  useEffect(() => {
    getSubscription()
      .then((sub) => {
        setSubscription(sub || {});
      })
      .catch(() => {
        setSubscription({});
      });
  }, []);

  // Methods
  const addRow = (index: number) => {
    try {
      addRowDebounce(index);
    } catch (error) {
      console.error("Error in addRow", error);
    }
  };

  const removeRow = (index: number) => {
    try {
      removeRowDebounce(index);
    } catch (error) {
      console.error("Error in removeRow", error);
    }
  };

  const handleBackgroundColorToggle = (checked: boolean): void => {
    try {
      setMakeWidgetTransparent(!makeWidgetTransparent);

      if (checked) {
        setWidgetBackgroundColor("");
      } else {
        setWidgetBackgroundColor("#121212");
      }
    } catch (error) {
      console.error("Error in handleBackgroundColorToggle", error);
    }
  };

  const handleBackgroundColorChange = (color: string): void => {
    try {
      updateWidgetBackgroundDebounce(color);
    } catch (error) {
      console.error("Error in handleBackgroundColorChange", error);
    }
  };

  function handleTextChange(index: number, value: string) {
    try {
      updateSequenceDebounce(index, value);
    } catch (error) {
      console.error("Error in handleTextChange", error);
    }
  }

  function handleFontColorChange(arg0: string) {
    try {
      // To-Do
    } catch (error) {
      console.error("Error in handleFontColorChange", error);
    }
  }

  function handleAnimationUpdate(): void {
    try {
      setIsAnimUpdateBtnDisabled(true);
    } catch (error) {
      console.error("Error in handleAnimationUpdate", error);
    }
  }

  function handleStaticText(value: string): void {
    try {
      // To-Do
    } catch (error) {
      console.error("Error in handleStaticText", error);
    }
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
              {/* Color Input For Background */}
              <Box className={styles.box} marginTop={1} marginBottom={3}>
                <FieldSet
                  legend=""
                  gap="large"
                  alignment="center"
                  direction="vertical"
                >
                  <FormField
                    label="Background Transparent"
                    labelPlacement="left"
                    labelWidth="1fr"
                  >
                    <ToggleSwitch
                      size="medium"
                      checked={makeWidgetTransparent}
                      onChange={(event) =>
                        handleBackgroundColorToggle(event.target.checked)
                      }
                    />
                  </FormField>
                  {!makeWidgetTransparent && (
                    <FormField
                      label="Background Color"
                      infoContent="Customize the background color of the widget"
                    >
                      <ColorInput
                        value={widgetBackgroundColor}
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
              {/* Color Input For Text */}
              <Box className={styles.box} marginTop={1} marginBottom={3}>
                <FieldSet
                  legend={
                    <h3 style={{ fontWeight: "bold" }}>
                      Customize Static Text
                    </h3>
                  }
                  gap="large"
                  alignment="center"
                  direction="vertical"
                  legendSize="small"
                >
                  <div className={`${styles.fullWidthBox} ${styles.box}`}>
                    <Input
                      type="text"
                      defaultValue={widgetData?.staticText?.text}
                      onChange={(e) => handleStaticText(e.target.value)}
                    />
                  </div>
                  <FormField label="Font Color">
                    <ColorInput
                      value={staticTextFontColor}
                      onConfirm={(color) => {
                        handleFontColorChange(color as string);
                      }}
                      popoverPlacement="top-end"
                      popoverProps={{
                        animate: true,
                      }}
                    />
                  </FormField>
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
                  {sequence.map((item, index) => (
                    <div key={index} className={styles.animationInputsWrapper}>
                      <Input
                        type="text"
                        defaultValue={item}
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
                    </div>
                  ))}
                  <Button
                    prefixIcon={<Icons.Refresh />}
                    disabled={isAnimUpdateBtnDisabled}
                    onClick={() => handleAnimationUpdate()}
                  >
                    Update Animation
                  </Button>
                </FieldSet>
              </Box>
            </SidePanel.Field>
          </SidePanel.Section>
          {/* Support Section */}
          <SupportSection
            instanceId={subscription.instanceId}
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
