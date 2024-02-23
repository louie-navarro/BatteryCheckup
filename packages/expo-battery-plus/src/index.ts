import ExpoBatteryPlusModule from './ExpoBatteryPlusModule';

export async function getBatteryData() {
  return (await ExpoBatteryPlusModule.asyncFunction('getBatteryData')) as {
    health: string;
  } | null;
}
