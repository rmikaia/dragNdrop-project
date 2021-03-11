export default class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
}
//# sourceMappingURL=common.js.map