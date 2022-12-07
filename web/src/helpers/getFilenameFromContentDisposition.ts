const FILENAME_PARAM = 'filename=';

export const getFilenameFromContentDisposition = (
  contentDispositionHeader: string | null,
): string | null => {
  if (!contentDispositionHeader) {
    return null;
  }

  const indexOf = contentDispositionHeader?.indexOf(FILENAME_PARAM);

  if (!indexOf) {
    return null;
  }

  return contentDispositionHeader.slice(indexOf + FILENAME_PARAM.length);
};
