import React from "react";

import {
  Box,
  ColorInput,
  Dropdown,
  DropdownLayoutValueOption,
  FieldSet,
  FieldSetStatusType,
  FormField,
  Input,
  NumberInput,
  SidePanel,
  Slider,
} from "@wix/design-system";

import styles from "../../site/widgets/custom-elements/typing-effect/panel.module.css";

interface TextCustomizationSectionProps {
  staticText: string;
  staticTextFontColor: string;
  staticTextFontWeight: string;
  staticTextFontSizeValue: number;
  staticTextFontSizeUnit: string;
  dynamicTextFontColor: string;
  animTextFontWeight: string;
  animTextFontSizeValue: number;
  animTextFontSizeUnit: string;
  textGapValue: number;
  textGapUnit: string;
  isStaticTextStyleCustomizationsVisible: boolean;
  memoizedFontWeightOptions: DropdownLayoutValueOption[];
  cssTypographyUnits: DropdownLayoutValueOption[];
  textAlignOptions: DropdownLayoutValueOption[];
  handleStaticText: (value: string) => void;
  handleStaticFontColorChange: (color: string) => void;
  handleStaticTextFontWeight: (option: DropdownLayoutValueOption) => void;
  handleStaticTxtFontSizeValueChange: (value: number) => void;
  handleStaticTextFontSizeUnitChange: (
    option: DropdownLayoutValueOption
  ) => void;
  handleDynamicFontColorChange: (color: string) => void;
  handleDynamicTextFontWeight: (option: DropdownLayoutValueOption) => void;
  handleAnimTxtFontSizeValueChange: (value: number) => void;
  handleAnimTextFontSizeUnitChange: (option: DropdownLayoutValueOption) => void;
  handleTextGapValueChange: (value: number) => void;
  handleTextGapUnitChange: (option: DropdownLayoutValueOption) => void;
  handleTextAlignmentChange: (option: DropdownLayoutValueOption) => void;
  getStaticTxtFontSizeUnitSelectedId: () => string;
  getAnimTxtFontSizeUnitSelectedId: () => string;
  getTextGapUnitSelectedId: () => string;
  getTextAlignSelectedId: () => string;
  checkStaticTxtFontSizeInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
  checkAnimTxtFontSizeInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
  checkTextGapInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
}

export const TextCustomizationSection: React.FC<
  TextCustomizationSectionProps
> = ({
  staticText,
  staticTextFontColor,
  staticTextFontWeight,
  staticTextFontSizeValue,
  staticTextFontSizeUnit,
  dynamicTextFontColor,
  animTextFontWeight,
  animTextFontSizeValue,
  animTextFontSizeUnit,
  textGapValue,
  textGapUnit,
  isStaticTextStyleCustomizationsVisible,
  memoizedFontWeightOptions,
  cssTypographyUnits,
  textAlignOptions,
  handleStaticText,
  handleStaticFontColorChange,
  handleStaticTextFontWeight,
  handleStaticTxtFontSizeValueChange,
  handleStaticTextFontSizeUnitChange,
  handleDynamicFontColorChange,
  handleDynamicTextFontWeight,
  handleAnimTxtFontSizeValueChange,
  handleTextGapValueChange,
  handleTextGapUnitChange,
  handleAnimTextFontSizeUnitChange,
  handleTextAlignmentChange,
  getStaticTxtFontSizeUnitSelectedId,
  getAnimTxtFontSizeUnitSelectedId,
  getTextGapUnitSelectedId,
  getTextAlignSelectedId,
  checkStaticTxtFontSizeInputRange,
  checkAnimTxtFontSizeInputRange,
  checkTextGapInputRange,
}) => {
  return (
    <>
      <SidePanel.Section
        title={<div className={styles.section}>Customize Text</div>}
      >
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={1} marginBottom={3}>
            <FieldSet
              key="ct-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
              legendSize="small"
            >
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
                  options={textAlignOptions}
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
                  value={textGapValue}
                  displayMarks={false}
                />
                {/* TEXT GAP - UNIT VALUE INPUT */}
                <NumberInput
                  value={textGapValue}
                  min={0}
                  max={50}
                  onChange={(value) => handleTextGapValueChange(value || 0)}
                  suffix={<Input.Affix>{textGapUnit}</Input.Affix>}
                  size="small"
                  hideStepper
                />
                {/* TEXT GAP - UNIT DROPDOWN */}
                <Dropdown
                  size="small"
                  options={cssTypographyUnits}
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
      </SidePanel.Section>
      {/* Static Text Section */}
      <SidePanel.Section
        title={<div className={styles.section}>Customize Static Text</div>}
      >
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={1} marginBottom={3}>
            <FieldSet
              key="dst-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
              legendSize="small"
            >
              <div className={`${styles.fullWidthBox} ${styles.box}`}>
                <FormField label="Add Static Text">
                  <Input
                    size="small"
                    type="text"
                    value={staticText}
                    onChange={(e) => handleStaticText(e.target.value)}
                  />
                </FormField>
              </div>
              {isStaticTextStyleCustomizationsVisible && (
                <>
                  <FormField label="Font Color">
                    <ColorInput
                      size="small"
                      value={staticTextFontColor}
                      onConfirm={(color) =>
                        handleStaticFontColorChange(color as string)
                      }
                      popoverPlacement="top-end"
                      popoverProps={{ animate: true }}
                    />
                  </FormField>
                  <FormField label="Font Weight">
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={memoizedFontWeightOptions}
                      onSelect={handleStaticTextFontWeight}
                      selectedId={staticTextFontWeight}
                    />
                  </FormField>
                  <FieldSet
                    key="stfs-fs"
                    gap="small"
                    legend="Font Size"
                    columns="auto 75px 70px"
                    status={checkStaticTxtFontSizeInputRange().status}
                    statusMessage={checkStaticTxtFontSizeInputRange().message}
                  >
                    <Slider
                      onChange={(value) =>
                        handleStaticTxtFontSizeValueChange(value as number)
                      }
                      min={1}
                      max={72}
                      value={staticTextFontSizeValue}
                      displayMarks={false}
                    />
                    <NumberInput
                      value={staticTextFontSizeValue}
                      min={1}
                      max={72}
                      onChange={(value) =>
                        handleStaticTxtFontSizeValueChange(value || 1)
                      }
                      suffix={
                        <Input.Affix>{staticTextFontSizeUnit}</Input.Affix>
                      }
                      size="small"
                      hideStepper
                    />
                    <Dropdown
                      size="small"
                      options={cssTypographyUnits}
                      selectedId={getStaticTxtFontSizeUnitSelectedId()}
                      onSelect={handleStaticTextFontSizeUnitChange}
                      popoverProps={{ dynamicWidth: true }}
                    />
                  </FieldSet>
                </>
              )}
            </FieldSet>
          </Box>
        </SidePanel.Field>
      </SidePanel.Section>

      {/* Animation Text Section */}
      <SidePanel.Section
        title={<div className={styles.section}>Customize Animation Text</div>}
      >
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={1} marginBottom={3}>
            <FieldSet
              key="dat-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
              legendSize="small"
            >
              <FormField label="Font Color">
                <ColorInput
                  size="small"
                  value={dynamicTextFontColor}
                  onConfirm={(color) =>
                    handleDynamicFontColorChange(color as string)
                  }
                  popoverPlacement="top-end"
                  popoverProps={{ animate: true }}
                />
              </FormField>
              <FormField label="Font Weight">
                <Dropdown
                  placeholder="Select"
                  size="small"
                  options={memoizedFontWeightOptions}
                  onSelect={handleDynamicTextFontWeight}
                  selectedId={animTextFontWeight}
                />
              </FormField>
              <FieldSet
                key="atfs-fs"
                gap="small"
                legend="Font Size"
                columns="auto 75px 70px"
                status={checkAnimTxtFontSizeInputRange().status}
                statusMessage={checkAnimTxtFontSizeInputRange().message}
              >
                <Slider
                  onChange={(value) =>
                    handleAnimTxtFontSizeValueChange(value as number)
                  }
                  min={1}
                  max={72}
                  value={animTextFontSizeValue}
                  displayMarks={false}
                />
                <NumberInput
                  value={animTextFontSizeValue}
                  min={1}
                  max={72}
                  onChange={(value) =>
                    handleAnimTxtFontSizeValueChange(value || 1)
                  }
                  suffix={<Input.Affix>{animTextFontSizeUnit}</Input.Affix>}
                  size="small"
                  hideStepper
                />
                <Dropdown
                  size="small"
                  options={cssTypographyUnits}
                  selectedId={getAnimTxtFontSizeUnitSelectedId()}
                  onSelect={handleAnimTextFontSizeUnitChange}
                  popoverProps={{ dynamicWidth: true }}
                />
              </FieldSet>
            </FieldSet>
          </Box>
        </SidePanel.Field>
      </SidePanel.Section>
    </>
  );
};
