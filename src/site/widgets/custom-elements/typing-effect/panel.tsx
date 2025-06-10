import "@wix/design-system/styles.global.css";

import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Dropdown,
  FormField,
  Loader,
  SidePanel,
  Text,
  ToggleSwitch,
  WixDesignSystemProvider,
} from "@wix/design-system";
import { widget } from "@wix/editor";

import { AlignmentSection } from "../../../../components/Panel/AlignmentSection";
import { AnimationSection } from "../../../../components/Panel/AnimationSection";
import { TextCustomizationSection } from "../../../../components/Panel/TextCustomizationSection";
import SupportSection from "../../../../components/SupportSection/support-section";
import {
  DEFAULT_TEMPLATE,
  getAppConstants,
  TEMPLATE_OPTIONS,
} from "../../../../constants/common-constants";
import { DEFAULT_DATA } from "../../../../constants/templates-constants";
import { usePanel } from "../../../../hooks/usePanel";
import { TemplateKey, WidgetData } from "../../../../types/common-types";
import { getSubscription } from "../../../../utils/subscription";
import styles from "./panel.module.css";
import debounce from "lodash.debounce";

const {
  APP_NAME,
  MKP_APP_MARKET_URL,
  SUPPORT_LINK_BASE_URL,
  SUPPORT_ARTICLE_LINK,
} = getAppConstants();

const Panel: React.FC = () => {
  const [doCustomize, setDoCustomize] = useState<boolean>(false);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [localLoading, setLocalLoading] = useState<boolean>(false); // Placeholder for isSavingData, not used in this panel
  const [templateState, setTemplateState] = useState<string>(DEFAULT_TEMPLATE);
  const [widgetDataLocal, setWidgetDataLocal] = useState<WidgetData>(
    DEFAULT_DATA[DEFAULT_TEMPLATE]
  );

  const {
    state,
    loading,
    handlers,
    selectors,
    validators,
    resetStateWithTemplate,
  } = usePanel(templateState as TemplateKey);

  // FETCH WIDGET PROPS
  useEffect(() => {
    console.log("[Panel - FETCH WIDGET PROPS] Fetching widget-props started.");

    const fetchWidgetProps = async () => {
      try {
        const widgetData = await widget.getProp("widget-data");
        console.log(
          "[Panel - FETCH WIDGET PROPS] Fetched widget-data prop:",
          widgetData
        );
        if (widgetData) {
          const parsedWidgetData: WidgetData = JSON.parse(widgetData);
          console.log(
            "[Panel - FETCH WIDGET PROPS] Parsed widget-data prop:",
            parsedWidgetData
          );
          setWidgetDataLocal(parsedWidgetData);
          setTemplateState(parsedWidgetData.templateId || DEFAULT_TEMPLATE);
          setDoCustomize(parsedWidgetData.doCustomize === "true");
          resetStateWithTemplate(
            parsedWidgetData.templateId as keyof typeof DEFAULT_DATA
          );
        } else {
          console.warn("[Panel - FETCH WIDGET PROPS] No widget-data found.");
          setWidgetDataLocal(DEFAULT_DATA[DEFAULT_TEMPLATE]);
          setTemplateState(DEFAULT_TEMPLATE);
          setDoCustomize(false);
          resetStateWithTemplate(DEFAULT_TEMPLATE);
        }
      } catch (error) {
        console.error(
          "[Panel - FETCH WIDGET PROPS] Error fetching widget-data prop:",
          error
        );
        setWidgetDataLocal(DEFAULT_DATA[DEFAULT_TEMPLATE]);
        setTemplateState(DEFAULT_TEMPLATE);
        setDoCustomize(false);
        resetStateWithTemplate(DEFAULT_TEMPLATE);
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchWidgetProps();
    console.log(
      "[Panel - FETCH WIDGET PROPS] Fetching widget-props completed."
    );
  }, []);

  // UPDATE DO_CUSTOMIZE - Update doCustomize state when widgetDataLocal changes
  // useEffect(() => {
  //   setIsFetchingData(true);
  //   console.log(
  //     "[Panel - UPDATE DO_CUSTOMIZE] Resetting state with template:",
  //     templateState
  //   );
  //   resetStateWithTemplate(templateState as keyof typeof DEFAULT_DATA);
  //   setIsFetchingData(false);
  // }, [templateState]);

  // UPDATE WIDGET_DATA_LOCAL - Update widgetDataLocal when state changes
  useEffect(() => {
    console.log("[Panel - UPDATE WIDGET_DATA_LOCAL] State change detected");
    console.log("[Panel - UPDATE WIDGET_DATA_LOCAL] newState:", state);
    const newWidgetData: WidgetData = {
      staticText: {
        text: state.staticText,
        fontColor: state.staticTextFontColor,
        fontWeight: state.staticTextFontWeight,
        fontSizeValue: state.staticTextFontSizeValue,
        fontSizeUnit: state.staticTextFontSizeUnit,
      },
      dynamicText: {
        texts: state.sequence,
        fontColor: state.dynamicTextFontColor,
        fontWeight: state.animTextFontWeight,
        fontSizeValue: state.animTextFontSizeValue,
        fontSizeUnit: state.animTextFontSizeUnit,
      },
      animationOptions: {
        loop: state.numberOfLoops,
        cursor: state.showAnimationCursor,
        cursorStyle: state.animationCursor,
        typeSpeed: state.typingSpeed,
        deleteSpeed: state.deleteSpeed,
        delaySpeed: state.animationDelay,
      },
      backgroundColor: state.widgetBackgroundColor,
      alignItems: state.alignVertically,
      textAlignProp: state.textAlign,
      justifyContent: state.alignHorizontally,
      display: state.display,
      flexDirection: state.flexDirection,
      textsGapValue: state.textGapValue,
      textsGapUnit: state.textGapUnit,
      templateId: templateState,
      doCustomize: JSON.stringify(doCustomize),
    };
    console.log(
      "[Panel - UPDATE WIDGET_DATA_LOCAL] New Widget Data:",
      newWidgetData
    );
    setWidgetDataLocal(newWidgetData);
    const debouncedSetProp = debounce(() => {
      widget.setProp("widget-data", JSON.stringify(newWidgetData));
    }, 300); // Adjust debounce delay as needed
    debouncedSetProp();

    return () => {
      debouncedSetProp.cancel();
    };
  }, [state, templateState, doCustomize]);

  // UPDATED WIDGET_DATA - Updating widget-data prop when widgetDataLocal changes
  // useEffect(() => {
  //   console.log(
  //     "[Panel - UPDATED WIDGET_DATA] Setting widget-data prop with new data."
  //   );
  //   widget
  //     .setProp("widget-data", JSON.stringify(widgetDataLocal))
  //     .then(() => {
  //       console.log(
  //         "[Panel - UPDATED WIDGET_DATA] widget-data prop set successfully."
  //       );
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "[Panel - UPDATED WIDGET_DATA] Error setting widget-data prop:",
  //         error
  //       );
  //     });
  // }, [widgetDataLocal, setWidgetDataLocal]);

  // SUBSCRIPTION - For Subscription
  useEffect(() => {
    getSubscription()
      .then((sub) => {
        console.log("[Panel - SUBSCRIPTION] Subscription:", sub);

        handlers.handleSubscriptionChange(sub);
      })
      .catch(() => {
        handlers.handleSubscriptionChange({
          instance: undefined,
          appId: "",
          instanceId: undefined,
          plans: undefined,
          isPremium: false,
          upgradeUrl: "",
          reviewUrl: "",
        });
      });
  }, []);

  const handleTemplateChange = (option: any) => {
    console.log(
      "[Panel - handleTemplateChange] Running template change handler."
    );
    if (!option || !option.id) {
      console.error(
        "[Panel - handleTemplateChange] Invalid option selected:",
        option
      );
      return;
    }
    const newTemplateId = option.id;
    console.log(
      "[Panel - handleTemplateChange] New Template Id:",
      newTemplateId
    );

    setTemplateState(newTemplateId);
    resetStateWithTemplate(newTemplateId as TemplateKey);

    console.log("[Panel - handleTemplateChange] Template updated");
  };

  const getTemplateSelectedId = useCallback((): string => {
    console.log(
      "[Panel - getTemplateSelectedId] Getting selected template ID.",
      templateState
    );
    return templateState;
  }, [templateState]);

  const handleDoCustomizeToggle = (checked: boolean) => {
    try {
      console.log(
        "[Panel - handleDoCustomizeToggle] Do Customize Toggle changed:",
        checked
      );
      // Update the doCustomize state
      setDoCustomize(checked);
    } catch (error) {
      console.error(
        "[Panel - handleDoCustomizeToggle] Error in handleDoCustomizeToggle:",
        error
      );
    }
  };

  if (loading || isFetchingData) {
    return (
      <Box align="center" verticalAlign="middle" height="100vh">
        <Loader size="small" />
      </Box>
    );
  }

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300" height="100vh">
        <SidePanel.Content stretchVertically noPadding>
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
            <SidePanel.Field noPadding>
              <Box className={styles.box} marginTop={3} marginBottom={3}>
                <FormField label="Select Template">
                  <Dropdown
                    ariaRoledescription="Template Dropdown"
                    placeholder="Select"
                    size="small"
                    options={TEMPLATE_OPTIONS}
                    onSelect={async (option) => {
                      await handleTemplateChange(option);
                    }}
                    selectedId={getTemplateSelectedId()}
                    popoverProps={{
                      dynamicWidth: true,
                    }}
                  />
                </FormField>
              </Box>
            </SidePanel.Field>
            <SidePanel.Field noPadding>
              <Box className={styles.box} marginTop={3} marginBottom={3}>
                <FormField
                  label="Customize Template Design"
                  labelPlacement="left"
                  labelWidth="1fr"
                >
                  <ToggleSwitch
                    size="medium"
                    checked={doCustomize}
                    onChange={(e) => handleDoCustomizeToggle(e.target.checked)}
                  />
                </FormField>
              </Box>
            </SidePanel.Field>
          </SidePanel.Section>
          {doCustomize && (
            <>
              <TextCustomizationSection
                staticText={state.staticText}
                staticTextFontColor={state.staticTextFontColor}
                staticTextFontWeight={state.staticTextFontWeight}
                staticTextFontSizeValue={state.staticTextFontSizeValue}
                staticTextFontSizeUnit={state.staticTextFontSizeUnit}
                dynamicTextFontColor={state.dynamicTextFontColor}
                animTextFontWeight={state.animTextFontWeight}
                animTextFontSizeValue={state.animTextFontSizeValue}
                animTextFontSizeUnit={state.animTextFontSizeUnit}
                isStaticTextStyleCustomizationsVisible={
                  state.isStaticTextStyleCustomizationsVisible
                }
                memoizedFontWeightOptions={selectors.getFontWeightOptions()}
                cssTypographyUnits={selectors.getCssTypographyUnits()}
                textAlignOptions={selectors.getTextAlignOptions()}
                handleStaticText={handlers.handleStaticText}
                handleStaticFontColorChange={
                  handlers.handleStaticFontColorChange
                }
                handleStaticTextFontWeight={handlers.handleStaticTextFontWeight}
                handleStaticTxtFontSizeValueChange={
                  handlers.handleStaticTxtFontSizeValueChange
                }
                handleStaticTextFontSizeUnitChange={
                  handlers.handleStaticTextFontSizeUnitChange
                }
                handleDynamicFontColorChange={
                  handlers.handleDynamicFontColorChange
                }
                handleDynamicTextFontWeight={handlers.handleAnimTextFontWeight}
                handleAnimTxtFontSizeValueChange={
                  handlers.handleAnimTxtFontSizeValueChange
                }
                handleAnimTextFontSizeUnitChange={
                  handlers.handleAnimTextFontSizeUnitChange
                }
                getStaticTxtFontSizeUnitSelectedId={
                  selectors.getStaticTxtFontSizeUnitSelectedId
                }
                getAnimTxtFontSizeUnitSelectedId={
                  selectors.getAnimTxtFontSizeUnitSelectedId
                }
                checkStaticTxtFontSizeInputRange={
                  validators.checkStaticTxtFontSizeInputRange
                }
                checkAnimTxtFontSizeInputRange={
                  validators.checkAnimTxtFontSizeInputRange
                }
                textGapValue={state.textGapValue}
                textGapUnit={state.textGapUnit}
                handleTextGapValueChange={handlers.handleTextGapValueChange}
                handleTextGapUnitChange={handlers.handleTextGapUnitChange}
                getTextGapUnitSelectedId={selectors.getTextGapUnitSelectedId}
                checkTextGapInputRange={validators.checkTextGapInputRange}
                handleTextAlignmentChange={handlers.handleTextAlignmentChange}
                getTextAlignSelectedId={selectors.getTextAlignSelectedId}
              />
              <AlignmentSection
                display={state.display}
                getDisplaySelectedId={selectors.getDisplaySelectedId}
                getAlignVerticalSelectedId={
                  selectors.getAlignVerticalSelectedId
                }
                getAlignHorizontalSelectedId={
                  selectors.getAlignHorizontalSelectedId
                }
                handleDisplayChange={handlers.handleDisplayChange}
                handleAlignVerticallyChange={
                  handlers.handleAlignVerticallyChange
                }
                handleAlignHorizontallyChange={
                  handlers.handleAlignHorizontallyChange
                }
                getFlexDirectionSelectedId={
                  selectors.getFlexDirectionSelectedId
                }
                handleFlexDirectionChange={handlers.handleFlexDirectionChange}
              />
            </>
          )}
          <AnimationSection
            sequence={state.sequence}
            isDeleteRowBtnDisabled={state.isDeleteRowBtnDisabled}
            showAnimationCursor={state.showAnimationCursor}
            animationCursor={state.animationCursor}
            numberOfLoops={state.numberOfLoops}
            typingSpeed={state.typingSpeed}
            deleteSpeed={state.deleteSpeed}
            animationDelay={state.animationDelay}
            handleTextChange={handlers.handleTextChange}
            removeRow={handlers.removeRow}
            addRow={handlers.addRow}
            handleAnimationCursorToggle={handlers.handleAnimationCursorToggle}
            handleAnimationCursorChange={handlers.handleAnimationCursorChange}
            handleNumOfLoopsChange={handlers.handleNumOfLoopsChange}
            handleTypingSpeedValueChange={handlers.handleTypingSpeedValueChange}
            handleDeleteSpeedValueChange={handlers.handleDeleteSpeedValueChange}
            handleAnimationDelayChange={handlers.handleAnimationDelayChange}
            checkNumberOfLoopsInputRange={
              validators.checkNumberOfLoopsInputRange
            }
            checkTypingSpeedInputRange={validators.checkTypingSpeedInputRange}
            checkDeleteSpeedInputRange={validators.checkDeleteSpeedInputRange}
            checkAnimationDelayInputRange={
              validators.checkAnimationDelayInputRange
            }
          />
          {/* SUPPORT SECTION */}
          <SupportSection
            instanceId={state.subscription.instanceId || ""}
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
