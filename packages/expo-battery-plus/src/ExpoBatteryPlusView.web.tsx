import * as React from 'react';

import { ExpoBatteryPlusViewProps } from './ExpoBatteryPlus.types';

export default function ExpoBatteryPlusView(props: ExpoBatteryPlusViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
