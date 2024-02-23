import ExpoModulesCore

public class ExpoBatteryPlusModule: Module {
  public func definition() -> ModuleDefinition {
    AsyncFunction("getBatteryData") { 
      return nil;
    }
  }
}
