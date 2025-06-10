import React from 'react';

import { Box, Dropdown, FormField, SidePanel, ToggleSwitch } from '@wix/design-system';

import { TEMPLATE_OPTIONS } from '../../constants/common-constants';
import styles from '../../site/widgets/custom-elements/typing-effect/panel.module.css';

interface TemplateSectionProps {
  doCustomizeDesign: boolean;
  getTemplateSelectedId: () => string;
  handleTemplateChange: (option: any) => Promise<void>;
  handleDoCustomizeToggle: (checked: boolean) => void;
}

export const TemplateSection: React.FC<TemplateSectionProps> = ({
  doCustomizeDesign,
  getTemplateSelectedId,
  handleTemplateChange,
  handleDoCustomizeToggle,
}) => {
  return (
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
              checked={doCustomizeDesign}
              onChange={(e) => handleDoCustomizeToggle(e.target.checked)}
            />
          </FormField>
        </Box>
      </SidePanel.Field>
    </SidePanel.Section>
  );
};
