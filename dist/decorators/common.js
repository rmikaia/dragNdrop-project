export function autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
}
//# sourceMappingURL=common.js.map