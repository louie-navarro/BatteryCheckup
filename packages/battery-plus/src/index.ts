import ExpoBatteryPlusModule from './ExpoBatteryPlusModule';
import { BatteryData } from './ExpoBatteryPlusModule.types';

export async function getBatteryData() {
  if (!ExpoBatteryPlusModule.getBatteryData) {
    return null;
  }

  return (await ExpoBatteryPlusModule.getBatteryData()) as BatteryData;
}
