export function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  return {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  } as PropertyDescriptor;
}
