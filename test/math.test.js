const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    

    expect(total).toBe(13)
    // if (total !== 13) {
    //     throw Error('Total tip should be 13. Got' + total)
    // }
})


test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Fahrenheit to Celsius', () => {
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Celsius to fahrenheit', () => {
    const fahrenheit = celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     },2000)
    
// })

test('should add two numbers', (done) => {
    add(2,3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('should add tow numbers async/await', async () => {
    const sum = await add(10,22)
    expect(sum).toBe(32)
})