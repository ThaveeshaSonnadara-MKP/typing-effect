import { appInstances } from '@wix/app-management';

import { Subscription } from '../types/common-types';

const APP_ID = "db139d5c-04be-4ce9-a081-4ca8dc1be74f";

/**
 *@function
 *@description Returns the subscription of the user. Only use for freemium apps, do not use for trial apps.
 *@returns json
 */
export async function getSubscription(): Promise<Subscription> {
    const response = await appInstances.getAppInstance();
    // console.log("response [getAppInstance]:", response);

    const instance = response.instance;

    // instance.vendorProductId = 'premium';
    return {
        instance: instance,
        appId: APP_ID,
        instanceId: instance?.instanceId,
        plans: instance?.availablePlans,
        isPremium: !(instance?.isFree),
        upgradeUrl: formatUpgradeUrl(APP_ID, instance?.instanceId),
        reviewUrl: formatReviewUrl(APP_ID),
    };
}

function formatUpgradeUrl(appId: any, instanceId: any) {
    if (instanceId) return `https://www.wix.com/apps/upgrade/${appId}?appInstanceId=${instanceId}`;
    return null;
}

function formatReviewUrl(appId: any) {
    return `https://www.wix.com/app-market/add-review/${appId}`;
}