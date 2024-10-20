export function downloadBlob(blob: Blob, options?: { filename: string }) {
  const url = window.URL.createObjectURL(blob);

  download(url, options);
  window.URL.revokeObjectURL(url);
}

export function download(url: string, options?: { filename: string }) {
  const { filename } = options || { filename: 'unknown' };
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.setAttribute('download', filename || 'unknown');
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
