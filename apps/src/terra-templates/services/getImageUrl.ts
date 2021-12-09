const ROOT_URL = 'https://terra-money.github.io/templates';

export function getImageUrl(image: string): string {
  return /^http/.test(image) ? image : `${ROOT_URL}/images/${image}`;
}
