import ExpoModulesCore

public class ExpoBatteryPlusModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoBatteryPlus")

    AsyncFunction("getBatteryData") { 
      return nil;
    }
  }
}
