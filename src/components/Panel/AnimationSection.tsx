import React from "react";

import {
  Box,
  FieldSet,
  FieldSetStatusType,
  FormField,
  IconButton,
  Input,
  NumberInput,
  SidePanel,
  Slider,
  Text,
  ToggleSwitch,
  Tooltip,
} from "@wix/design-system";
import * as Icons from "@wix/wix-ui-icons-common";

import styles from "../../site/widgets/custom-elements/typing-effect/panel.module.css";

interface AnimationSectionProps {
  sequence: string[];
  isDeleteRowBtnDisabled: boolean;
  showAnimationCursor: boolean;
  animationCursor: string;
  numberOfLoops: number;
  typingSpeed: number;
  deleteSpeed: number;
  animationDelay: number;
  handleTextChange: (index: number, value: string) => void;
  removeRow: (index: number) => void;
  addRow: (index: number) => void;
  handleAnimationCursorToggle: (checked: boolean) => void;
  handleAnimationCursorChange: (value: string) => void;
  handleNumOfLoopsChange: (value: number) => void;
  handleTypingSpeedValueChange: (value: number) => void;
  handleDeleteSpeedValueChange: (value: number) => void;
  handleAnimationDelayChange: (value: number) => void;
  checkNumberOfLoopsInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
  checkTypingSpeedInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
  checkDeleteSpeedInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
  checkAnimationDelayInputRange: () => {
    status?: FieldSetStatusType;
    message?: string;
  };
}

export const AnimationSection: React.FC<AnimationSectionProps> = ({
  sequence,
  isDeleteRowBtnDisabled,
  showAnimationCursor,
  animationCursor,
  numberOfLoops,
  typingSpeed,
  deleteSpeed,
  animationDelay,
  handleTextChange,
  removeRow,
  addRow,
  handleAnimationCursorToggle,
  handleAnimationCursorChange,
  handleNumOfLoopsChange,
  handleTypingSpeedValueChange,
  handleDeleteSpeedValueChange,
  handleAnimationDelayChange,
  checkNumberOfLoopsInputRange,
  checkTypingSpeedInputRange,
  checkDeleteSpeedInputRange,
  checkAnimationDelayInputRange,
}) => {
  return (
    <>
      <SidePanel.Section
        title={<div className={styles.section}>Customize Animation</div>}
      >
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={1} marginBottom={3}>
            <FieldSet
              key="aib-parent-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
            >
              {sequence.map((item, index) => (
                <FieldSet
                  key={`aib-child-fs-${index}`}
                  gap="medium"
                  legend=""
                  legendPlacement="none"
                  columns="auto 30px 30px"
                >
                  <Input
                    size="small"
                    type="text"
                    value={item}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    placeholder="Enter text"
                  />
                  <Tooltip content="Delete text">
                    <IconButton
                      size="small"
                      skin="standard"
                      priority="secondary"
                      disabled={isDeleteRowBtnDisabled}
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
                </FieldSet>
              ))}
            </FieldSet>
          </Box>
        </SidePanel.Field>
        <SidePanel.Field noPadding divider="auto">
          <Box className={styles.box} marginTop={2} marginBottom={3}>
            <FieldSet
              key="ap-fs"
              legend=""
              gap="large"
              alignment="center"
              direction="vertical"
              legendPlacement="none"
            >
              <FieldSet
                key="nol-fs"
                gap="medium"
                legend="Number of Loops"
                columns="auto 70px"
                alignment="center"
                status={checkNumberOfLoopsInputRange().status}
                statusMessage={checkNumberOfLoopsInputRange().message}
              >
                <Slider
                  onChange={(value) => handleNumOfLoopsChange(value as number)}
                  min={0}
                  max={10}
                  value={numberOfLoops}
                  displayMarks={false}
                />
                <NumberInput
                  value={numberOfLoops}
                  min={0}
                  max={10}
                  onChange={(value) =>
                    handleNumOfLoopsChange((value as number) || 0)
                  }
                  size="small"
                  hideStepper
                />
              </FieldSet>

              <Box marginBottom={2}>
                <Text size="small">
                  <b>Note:</b> If you want to set the animation to infinity, set
                  the Number of Loops to 0.
                </Text>
              </Box>

              <FormField
                label="Show Cursor"
                labelPlacement="left"
                labelWidth="1fr"
              >
                <ToggleSwitch
                  size="medium"
                  checked={showAnimationCursor}
                  onChange={(event) =>
                    handleAnimationCursorToggle(event.target.checked)
                  }
                />
              </FormField>

              {showAnimationCursor && (
                <FieldSet
                  key="atci-fs"
                  legend="Enter Cursor"
                  legendPlacement="left"
                  columns="auto"
                  infoContent="The input for cursor content is limited for one character."
                >
                  <Input
                    size="small"
                    type="text"
                    maxLength={1}
                    value={animationCursor}
                    onChange={(e) =>
                      handleAnimationCursorChange(e.target.value)
                    }
                  />
                </FieldSet>
              )}

              <FieldSet
                key="atts-fs"
                gap="medium"
                legend="Typing Speed"
                columns="auto 100px"
                alignment="center"
                status={checkTypingSpeedInputRange().status}
                statusMessage={checkTypingSpeedInputRange().message}
              >
                <Slider
                  min={10}
                  max={1000}
                  value={typingSpeed}
                  displayMarks={false}
                  onChange={(value) =>
                    handleTypingSpeedValueChange(value as number)
                  }
                />
                <NumberInput
                  value={typingSpeed}
                  min={10}
                  max={1000}
                  onChange={(value) =>
                    handleTypingSpeedValueChange((value as number) || 70)
                  }
                  suffix={<Input.Affix>ms</Input.Affix>}
                  size="small"
                  hideStepper
                />
              </FieldSet>

              <FieldSet
                key="atds-fs"
                gap="medium"
                legend="Delete Speed"
                columns="auto 100px"
                alignment="center"
                status={checkDeleteSpeedInputRange().status}
                statusMessage={checkDeleteSpeedInputRange().message}
              >
                <Slider
                  onChange={(value) =>
                    handleDeleteSpeedValueChange(value as number)
                  }
                  min={10}
                  max={1000}
                  value={deleteSpeed}
                  displayMarks={false}
                />
                <NumberInput
                  value={deleteSpeed}
                  min={10}
                  max={1000}
                  onChange={(value) =>
                    handleDeleteSpeedValueChange((value as number) || 0)
                  }
                  suffix={<Input.Affix>ms</Input.Affix>}
                  size="small"
                  hideStepper
                />
              </FieldSet>

              <FieldSet
                key="atad-fs"
                gap="medium"
                legend="Animation Delay"
                columns="auto 100px"
                alignment="center"
                status={checkAnimationDelayInputRange().status}
                statusMessage={checkAnimationDelayInputRange().message}
              >
                <Slider
                  onChange={(value) =>
                    handleAnimationDelayChange(value as number)
                  }
                  min={0}
                  max={5000}
                  value={animationDelay}
                  displayMarks={false}
                />
                <NumberInput
                  value={animationDelay}
                  min={0}
                  max={5000}
                  onChange={(value) =>
                    handleAnimationDelayChange(value as number)
                  }
                  suffix={<Input.Affix>ms</Input.Affix>}
                  size="small"
                  hideStepper
                />
              </FieldSet>
            </FieldSet>
          </Box>
        </SidePanel.Field>
      </SidePanel.Section>
    </>
  );
};
