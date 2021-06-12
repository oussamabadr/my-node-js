const { test, expect } = require('@jest/globals')
const MyStopwatch = require('./app')

test('Just Test', () => {
    expect(true).toBe(true);
})


test('should get correct duration', async () => {
    let delay = 500;

    const mywatch = new MyStopwatch()

    mywatch.start();

    await new Promise( (r) => setTimeout(r, delay))

    mywatch.stop();

    const duration = mywatch.duration();

    expect(duration).toBeGreaterThanOrEqual(delay/1000)
})

test('should throw error if start twice', async () => {
    const mywatch = new MyStopwatch()

    mywatch.start();

    expect(() => mywatch.start()).toThrowError();
})


test('should throw error if stop twice', async () => {
    let delay = 500;

    const mywatch = new MyStopwatch()

    mywatch.start();

    await new Promise( (r) => setTimeout(r, delay))

    mywatch.stop();

    expect(() => mywatch.stop()).toThrowError();
})


test('should throw error if duration was called before start', async () => {
    const mywatch = new MyStopwatch()
    expect(() => mywatch.duration()).toThrowError();
})

test('should throw error if duration was called before stop', async () => {
    const mywatch = new MyStopwatch()
    mywatch.start()
    expect(() => mywatch.duration()).toThrowError();
})
