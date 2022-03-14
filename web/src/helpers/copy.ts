export const copy = (id: string | HTMLInputElement) => {
  const copyText: HTMLInputElement | null =
    typeof id === 'string' ? document.querySelector(`#${id}`) : id;

  if (copyText) {
    copyText.select();

    document.execCommand('copy');
    (window.getSelection() as any).removeAllRanges(); // tslint:disable-line
  }
};
