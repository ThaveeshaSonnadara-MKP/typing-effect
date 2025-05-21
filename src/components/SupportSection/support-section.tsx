import React, { FC } from "react";
import { FormField, Button, SidePanel, Tooltip } from "@wix/design-system";
import * as Icons from "@wix/wix-ui-icons-common";

interface Props {
  instanceId: string;
  appName: string;
  supportUrlBase: string;
  marketUrl?: string;
}

const SupportSection: FC<Props> = ({
  instanceId,
  appName,
  supportUrlBase,
  marketUrl,
}) => {
  const supportUrl = `${supportUrlBase}${instanceId}&app=${appName}`;
  const reviewUrl = `${supportUrlBase}${instanceId}&app=${appName}&page=feedback-mood`;
  const moreAppsUrl = marketUrl || "https://www.wix.com/app-market";

  return (
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
          Support
        </div>
      }
    >
      <SidePanel.Field divider="auto">
        <FormField>
          <Tooltip content="Please tell us what you think about the app.">
            <Button
              size="medium"
              skin="premium"
              fullWidth
              priority="secondary"
              prefixIcon={<Icons.Heart />}
              onClick={() => window.open(reviewUrl, "_blank")}
            >
              Add a Review
            </Button>
          </Tooltip>
        </FormField>
      </SidePanel.Field>

      <SidePanel.Field divider="auto">
        <FormField label="Explore Resources & Contact Us">
          <Tooltip content="Please click this button to get support from the support team.">
            <Button
              size="medium"
              skin="standard"
              fullWidth
              priority="secondary"
              prefixIcon={<Icons.HelpCircle />}
              onClick={() => window.open(supportUrl, "_blank")}
            >
              Support Center
            </Button>
          </Tooltip>
        </FormField>
      </SidePanel.Field>

      <SidePanel.Field divider="auto">
        <FormField infoContent="" showInfoIconOnHover>
          <Tooltip content="Click this button to view more apps from Market Push Apps.">
            <Button
              size="medium"
              skin="standard"
              fullWidth
              priority="secondary"
              prefixIcon={<Icons.ExternalLink />}
              onClick={() => window.open(moreAppsUrl, "_blank")}
            >
              More great apps
            </Button>
          </Tooltip>
        </FormField>
      </SidePanel.Field>
    </SidePanel.Section>
  );
};

export default SupportSection;
