export default function checkIsEmptyValues(obj: { [key: string]: string }): boolean {
  return Object.values(obj).every(e => !e)
}
