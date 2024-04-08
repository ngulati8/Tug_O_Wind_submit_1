let counter = 0
let ch2 = 0
let ch1 = 0
OLED12864_I2C.init(60)
OLED12864_I2C.on()
music.setBuiltInSpeakerEnabled(false)
let trigger = 0
led.enable(false)
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
    if (counter > 0) {
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, counter)
    } else {
        pins.analogWritePin(AnalogPin.P3, 0)
        pins.analogWritePin(AnalogPin.P2, 0 - counter)
    }
    if (counter == 200 || counter == -200) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
        basic.pause(500)
        counter = 0
    }
})
