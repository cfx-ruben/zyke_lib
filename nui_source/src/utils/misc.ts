/*
  That is true when the page runs in a standard browser.
  Within the game, there is GetParentResourceName / invokeNative.
*/

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;