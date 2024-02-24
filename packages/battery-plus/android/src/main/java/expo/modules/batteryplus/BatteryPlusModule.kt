package expo.modules.batteryplus

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class BatteryPlusModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BatteryPlus")

    Function("getBatteryData") { ->
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      val intent =  IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { filter ->
        context.registerReceiver(null, filter)
      }

      val health = intent?.getIntExtra(BatteryManager.EXTRA_HEALTH, -1) ?: -1
      val healthText =  when(health) {
        BatteryManager.BATTERY_HEALTH_GOOD -> "GOOD"
        BatteryManager.BATTERY_HEALTH_COLD -> "COLD"
        BatteryManager.BATTERY_HEALTH_OVERHEAT -> "OVER-HEAT"
        BatteryManager.BATTERY_HEALTH_DEAD -> "DEAD"
        BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE -> "OVER-VOLTAGE"
        BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE -> "FAILED"
        else -> "UNKNOWN"
      }

      return@Function mapOf("health" to healthText)
    }

  }
}
