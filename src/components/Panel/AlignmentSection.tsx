import React from "react";

import {
  Box,
  Dropdown,
  DropdownLayoutValueOption,
  FieldSet,
  FormField,
  SidePanel,
} from "@wix/design-system";

import {
  ALIGN_ITEMS_OPTIONS,
  DISPLAY_OPTIONS,
  FLEX_DIRECTIONS,
  JUSTIFY_CONTENT_OPTIONS,
} from "../../constants/common-constants";
import styles from "../../site/widgets/custom-elements/typing-effect/panel.module.css";

interface AlignmentSectionProps {
  display: string;
  getDisplaySelectedId: () => string;
  getAlignVerticalSelectedId: () => string;
  getAlignHorizontalSelectedId: () => string;
  getFlexDirectionSelectedId: () => string;
  handleDisplayChange: (option: DropdownLayoutValueOption) => void;
  handleAlignVerticallyChange: (option: DropdownLayoutValueOption) => void;
  handleAlignHorizontallyChange: (option: DropdownLayoutValueOption) => void;
  handleFlexDirectionChange: (option: DropdownLayoutValueOption) => void;
}

export const AlignmentSection: React.FC<AlignmentSectionProps> = ({
  display,
  getDisplaySelectedId,
  getAlignVerticalSelectedId,
  getAlignHorizontalSelectedId,
  getFlexDirectionSelectedId,
  handleDisplayChange,
  handleAlignVerticallyChange,
  handleAlignHorizontallyChange,
  handleFlexDirectionChange,
}) => {
  return (
    <>
      <SidePanel.Section
        title={<div className={styles.section}>Customize Alignment</div>}
      >
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={1} marginBottom={3}>
            <FieldSet
              key="ac-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
            >
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
                  onSelect={handleDisplayChange}
                  selectedId={getDisplaySelectedId()}
                  popoverProps={{
                    dynamicWidth: true,
                  }}
                />
              </FormField>

              {display === "Flex" && (
                <>
                  {/* FLEX DIRECTION DROPDOWN */}
                  <FormField
                    label="Flexing Direction"
                    infoContent="Choose how text elements should appear in the container box."
                    infoTooltipProps={{
                      textAlign: "center",
                    }}
                  >
                    <Dropdown
                      placeholder="Select"
                      size="small"
                      options={FLEX_DIRECTIONS}
                      onSelect={(option) => handleFlexDirectionChange(option)}
                      selectedId={getFlexDirectionSelectedId()}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FormField>
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
                      onSelect={handleAlignVerticallyChange}
                      selectedId={getAlignVerticalSelectedId()}
                      popoverProps={{
                        dynamicWidth: true,
                      }}
                    />
                  </FormField>
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
                      onSelect={handleAlignHorizontallyChange}
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
      </SidePanel.Section>
    </>
  );
};
