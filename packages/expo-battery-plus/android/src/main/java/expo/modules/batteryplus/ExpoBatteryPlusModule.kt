package expo.modules.batteryplus

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoBatteryPlusModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoBatteryPlus")

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("getBatteryData") {
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

      return@AsyncFunction mapOf("health" to healthText)
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.

  }
}
