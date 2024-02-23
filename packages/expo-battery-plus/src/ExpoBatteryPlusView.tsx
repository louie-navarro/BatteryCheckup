import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoBatteryPlusViewProps } from './ExpoBatteryPlus.types';

const NativeView: React.ComponentType<ExpoBatteryPlusViewProps> =
  requireNativeViewManager('ExpoBatteryPlus');

export default function ExpoBatteryPlusView(props: ExpoBatteryPlusViewProps) {
  return <NativeView {...props} />;
}
