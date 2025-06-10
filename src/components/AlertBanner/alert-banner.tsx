import React, { FC } from 'react';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './alert-banner.module.css';

type Props = {
  showBanner: boolean | undefined;
  widgetName: string | undefined;
};

const DEFAULT_WIDGET_NAME = "< widget-name >";

const AlertBanner: FC<Props> = ({ showBanner, widgetName }) => {
  const isAlertBannerVisible = showBanner === true;
  const widgetNameHandler = widgetName || DEFAULT_WIDGET_NAME;

  if (!isAlertBannerVisible) return null;

  return (
    <div className={styles.alertBanner}>
      <FontAwesomeIcon
        icon={faEye}
        aria-label="eye"
        role="img"
        className={styles.eyeIcon}
      />
      <span className={styles.alertText}>
        To see the {widgetNameHandler} running,
        <br />
        Go to site <b>Preview</b>.
      </span>
    </div>
  );
};

export default AlertBanner;
