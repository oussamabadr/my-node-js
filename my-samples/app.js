
module.exports = class MyStopwatch {
    #startTime = null;
    #endTime = null

    start() {
        if (this.#startTime) {
            throw new Error("Can't start watch more than one time, please reset if you want to call start again.");
        }

        this.#startTime = new Date();
    }

    stop() {
        if (!this.#startTime) {
            throw new Error("Should start before stop watch.");
        }

        if (this.#endTime) {
            throw new Error("Can't stop watch more than one time, please reset if yo want to start/stop.");
        }

        this.#endTime = new Date();
    }

    reset() {
        this.#startTime = null;
        this.#startTime = null;
    }

    duration() {
        if (!this.#startTime || !this.#endTime) {
            throw new Error("Should start and stop watch before getting duration.");
        }

        return (this.#endTime - this.#startTime) / 1000;
    }
    
}