declare namespace jest {
  interface Matchers<R> {
    toBeInArray(expected: string[]): R;
  }
}
