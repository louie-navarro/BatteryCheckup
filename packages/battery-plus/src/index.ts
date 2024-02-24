import BatteryPlusModule from './BatteryPlusModule';
import { BatteryData } from './BatteryPlusModule.types';

/**
 * available on android only
 */
export function getBatteryData(): BatteryData | null {
  if (!BatteryPlusModule.getBatteryData) {
    return null;
  }
  return BatteryPlusModule.getBatteryData() as BatteryData;
}
