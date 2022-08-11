/* eslint-disable vars-on-top, no-var */
import { UIBitz } from './types';

declare global {
  // runtime
  var UIBITZ_MAIN_URL: string;
  var uibitz: UIBitz;
  function uibitzReady(cb: () => void): void;

  // build-time
  var VERSION: string;
}

export {};
