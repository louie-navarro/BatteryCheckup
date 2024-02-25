package expo.modules.batteryplus

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class BatteryPlusModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BatteryPlus")

    Function("getBatteryData") {
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
      val intent =  IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { filter ->
        context.registerReceiver(null, filter)
      }

      val rawHealth = intent?.getIntExtra(BatteryManager.EXTRA_HEALTH, -1) ?: -1
      val health = getHealthText(rawHealth)

      val temperature = intent?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, -1) ?: -1

      val rawVoltage = intent?.getIntExtra(BatteryManager.EXTRA_VOLTAGE, -1) ?: -1
      val voltage = getBatteryVoltage(rawVoltage)

      val technology = intent?.getStringExtra(BatteryManager.EXTRA_TECHNOLOGY)

      val cycleCount = intent?.getIntExtra(BatteryManager.EXTRA_CYCLE_COUNT, -1 )?: -1

      val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val chargeContext =  batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CHARGE_COUNTER)
      val capacity = batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      val maxCapacity = getMaxCapacity(chargeContext, capacity)


      return@Function mapOf(
              "health" to health,
              "temperature" to temperature,
              "voltage" to voltage,
              "technology" to technology,
              "cycleCount" to cycleCount,
              "maxCapacity" to maxCapacity,
      )
    }
  }

  private fun getBatteryVoltage(voltage: Int): Float {
    return if (voltage > 1000) voltage / 1000f else voltage.toFloat()
  }

  private fun getHealthText(health: Int): String {
    return when(health) {
      BatteryManager.BATTERY_HEALTH_GOOD -> "GOOD"
      BatteryManager.BATTERY_HEALTH_COLD -> "COLD"
      BatteryManager.BATTERY_HEALTH_OVERHEAT -> "OVER-HEAT"
      BatteryManager.BATTERY_HEALTH_DEAD -> "DEAD"
      BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE -> "OVER-VOLTAGE"
      BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE -> "FAILED"
      else -> "UNKNOWN"
    }
  }

  private fun getMaxCapacity(chargeCounter: Int, capacity: Int): Float {
    if(chargeCounter == Integer.MIN_VALUE || capacity == Integer.MIN_VALUE)
      return 0f
    return  ((chargeCounter / capacity) * 100).toFloat()
  }
}
