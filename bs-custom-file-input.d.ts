declare module 'bs-custom-file-input' {
  interface bsCustomFileInput {
    init(inputSelector?: string, formSelector?: string): void,
    destroy(): void,
  }

  export default bsCustomFileInput;
}
