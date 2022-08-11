let mainUrl = '';
if (document.currentScript && 'src' in document.currentScript) {
  const param = new URLSearchParams(document.currentScript.src.split('?')[1]).get('mainUrl');
  if (param) {
    mainUrl = param;
  }
}
global.UIBITZ_MAIN_URL = mainUrl;

let resolve;
const promise = new Promise((res) => {
  resolve = res;
});
global.uibitzReady = (cb: () => void) => promise.then(cb);

import('./uibitz').then(resolve);
