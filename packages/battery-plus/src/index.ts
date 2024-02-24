import BatteryPlusModule from './BatteryPlusModule';
import { BatteryData } from './BatteryPlusModule.types';

/**
 * available on android only
 */
export async function getBatteryData(): Promise<BatteryData | null> {
  if (!BatteryPlusModule.getBatteryData) {
    return null;
  }
  return (await BatteryPlusModule.getBatteryData()) as BatteryData;
}
