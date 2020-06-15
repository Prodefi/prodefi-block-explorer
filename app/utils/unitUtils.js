export const convertByteToLarger = numBytes => {
  if (numBytes / 1024 > 1) {
    numBytes /= 1024;
    if (numBytes / 1024 > 1) {
      numBytes /= 1024;
      if (numBytes / 1024 > 1) {
        numBytes /= 1024;
        return `${numBytes.toFixed(2)} GB`;
      }
      return `${numBytes.toFixed(2)} MB`;
    }
    return `${numBytes.toFixed(2)} KB`;
  }
  return `${numBytes.toFixed(2)} Bytes`;
};

export const convertUSToLarger = numUS => {
  if (numUS / 1000 > 1) {
    numUS /= 1000;
    if (numUS / 1000 > 1) {
      numUS /= 1000;
      return `${numUS.toFixed(2)} s`;
    }
    return `${numUS.toFixed(2)} ms`;
  }
  return `${numUS.toFixed(2)} µs`;
};
