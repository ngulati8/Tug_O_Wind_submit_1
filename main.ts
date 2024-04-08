let counter = 0
let ch2 = 0
let ch1 = 0
OLED12864_I2C.init(60)
OLED12864_I2C.on()
music.setBuiltInSpeakerEnabled(false)
let trigger = 0
led.enable(false)
servos.P1.setAngle(90)
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
pins.setPull(DigitalPin.P6, PinPullMode.PullUp)
OLED12864_I2C.clear()
pins.analogWritePin(AnalogPin.P2, 0)
pins.analogWritePin(AnalogPin.P3, 0)
basic.forever(function () {
    while (trigger == 0) {
        ch1 = pins.digitalReadPin(DigitalPin.P5)
        if (ch1 == 1) {
            trigger = 1
            ch2 = pins.digitalReadPin(DigitalPin.P6)
            if (ch2 == 1) {
                counter += 5
            } else {
                counter += -5
            }
            basic.pause(100)
        }
    }
    while (trigger == 1) {
        ch1 = pins.digitalReadPin(DigitalPin.P5)
        if (ch1 == 0) {
            trigger = 0
            basic.pause(500)
        }
    }
    OLED12864_I2C.clear()
    OLED12864_I2C.showNumber(
    2,
    2,
    counter,
    1
    )
    servos.P1.setAngle(90 + counter)
    if (counter > 0) {
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, 12 * counter)
    } else {
        pins.analogWritePin(AnalogPin.P3, 0)
        pins.analogWritePin(AnalogPin.P2, 0 - 12 * counter)
    }
    if (counter == 80 || counter == -80) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.InBackground)
        basic.pause(1000)
        counter = 0
    }
})
