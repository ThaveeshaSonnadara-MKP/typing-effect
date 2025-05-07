import React, {
  type FC,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { widget } from "@wix/editor";
import SupportSection from "../../../../components/SupportSection/support-section";
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  Text,
  FormField,
  ColorInput,
  Swatches,
  FieldSet,
  Box,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { getSubscription } from "../../../../Utils/subscription";
import { getAppConstants } from "../../../../Utils/constants";
import AlertBanner from "../../../../components/AlertBanner/alert-banner";

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

  // USE-EFFECTS

  // For Fetch/Get Widget Data
  useEffect(() => {
    console.log("Fetching widget data...");

    widget
      .getProp("widget-data")
      .then((widgetData) => {
        // Update States
        console.log("widgetData string:", widgetData);
        console.log("widgetData object:", JSON.parse(widgetData));
        setWidgetData(JSON.parse(widgetData));
      })
      .catch((error) => console.error("Failed to fetch widget-name:", error));
  }, [setWidgetData]);

  // For Update/Set Widget Data
  useEffect(() => {
    console.log("Updating widget data...");

    console.log("Updated Widget Data State:", widgetData);
    widget
      .setProp("widget-data", JSON.stringify(widgetData))
      .then(() => console.log("widget-data updated successfully"))
      .catch((error) => console.error("Failed to update widget-data:", error));
  }, [widgetData]);

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
  const handleBackgroundColorChange = (backgroundColor: string) =>
    setWidgetData({ ...widgetData, backgroundColor });

  const handleFontColorChange = (fontColor: string) =>
    setWidgetData({ ...widgetData, fontColor });

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Content stretchVertically noPadding>
          <AlertBanner showBanner={false} widgetName="Typing Effect" />
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
            title={
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
                  margin: "0 auto",
                  padding: "2px 0",
                }}
              >
                Customize Design
              </div>
            }
          >
            <SidePanel.Field divider="auto" noPadding>
              {/* Color Inputs Box [ Background | Font ] */}
              <Box padding="0 15px" marginTop={1} marginBottom={3}>
                <FieldSet
                  legend=""
                  gap="medium"
                  alignment="center"
                  direction="vertical"
                >
                  <FormField label="Background Color">
                    <ColorInput
                      value={widgetData.backgroundColor}
                      onAddColor={(color) =>
                        setWidgetData({
                          ...widgetData,
                          backgroundPresets: [
                            ...widgetData.backgroundPresets,
                            color as string,
                          ],
                        })
                      }
                      onChange={(color) =>
                        handleBackgroundColorChange(color as string)
                      }
                      colorPickerChildren={
                        <Swatches
                          colors={widgetData.backgroundPresets as string[]}
                          onClick={(color: string) =>
                            handleBackgroundColorChange(color)
                          }
                        />
                      }
                      popoverPlacement="top-end"
                      popoverProps={{
                        animate: true,
                      }}
                    />
                  </FormField>
                  <FormField label="Font Color">
                    <ColorInput
                      value={widgetData.fontColor}
                      onAddColor={(color) =>
                        setWidgetData({
                          ...widgetData,
                          fontPresets: [
                            ...widgetData.fontPresets,
                            color as string,
                          ],
                        })
                      }
                      onChange={(color) =>
                        handleFontColorChange(color as string)
                      }
                      colorPickerChildren={
                        <Swatches
                          colors={widgetData.fontPresets}
                          onClick={(color: string) =>
                            handleFontColorChange(color)
                          }
                        />
                      }
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
