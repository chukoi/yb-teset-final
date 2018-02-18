/**
 * camelize.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Convert a string to camel-case
export default function camelize(string) {
  return string.toLowerCase()
    .split(/[-_\s]/g)
    .filter((value: string) => !!value).map((word: string, key: any) => {
      return !key ? word : (word.slice(0, 1).toUpperCase() + word.slice(1));
    }).join('');
}
