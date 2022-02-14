// eslint-disable-next-line import/prefer-default-export
export function renderIndentation(offset: number, correction?: number) {
  return '&nbsp;'.repeat((offset + (correction || 0)) * 4);
}
