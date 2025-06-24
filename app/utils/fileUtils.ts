export const truncateFilename = (
  filename: string,
  maxLength: number = 30
): string => {
  if (filename.length <= maxLength) return filename;

  const extension = filename.split('.').pop() || '';
  const nameWithoutExtension = filename.slice(0, filename.lastIndexOf('.'));
  const availableLength = maxLength - extension.length - 4; // 4 for "..." and "."

  if (availableLength <= 0) return filename;

  const keepStart = Math.ceil(availableLength / 2);
  const keepEnd = Math.floor(availableLength / 2);

  return `${nameWithoutExtension.slice(0, keepStart)}...${nameWithoutExtension.slice(-keepEnd)}.${extension}`;
};
