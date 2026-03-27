const MOJIBAKE_PATTERN = /[\u00C2\u00C3\u00D8\u00D9]|â/;

export const fixMojibake = (value: string): string => {
  if (!value || !MOJIBAKE_PATTERN.test(value)) {
    return value;
  }

  try {
    const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0) & 0xff);
    const decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);

    if (decoded.includes('\uFFFD')) {
      return value;
    }

    return decoded;
  } catch {
    return value;
  }
};

export const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, '');

export const slugify = (value: string): string =>
  fixMojibake(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
