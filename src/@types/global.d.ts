declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  openDialog: () => Promise<void | string[]>;
  test: () => string;
  connect: () => Promise<void | string[]>;
}