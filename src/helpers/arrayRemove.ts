/**
 * arrayRemove.ts
 *
 * @dateCreated 18/02/2018
 * @author Dean Heffernan
 */

// Remove a value from an array.
export default function arrayRemove(array, value) {
  const index = array.indexOf(value);
  array.splice(index, 1);
  return array;
}
