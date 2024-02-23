import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoBatteryPlus.web.ts
// and on native platforms to ExpoBatteryPlus.ts
import ExpoBatteryPlusModule from './ExpoBatteryPlusModule';
import ExpoBatteryPlusView from './ExpoBatteryPlusView';
import { ChangeEventPayload, ExpoBatteryPlusViewProps } from './ExpoBatteryPlus.types';

// Get the native constant value.
export const PI = ExpoBatteryPlusModule.PI;

export function hello(): string {
  return ExpoBatteryPlusModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoBatteryPlusModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoBatteryPlusModule ?? NativeModulesProxy.ExpoBatteryPlus);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoBatteryPlusView, ExpoBatteryPlusViewProps, ChangeEventPayload };
