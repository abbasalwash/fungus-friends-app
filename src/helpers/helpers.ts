export default function getValuesFromEnum<T>(data: T): string[] {
  return Object.values(data).filter((value) => typeof value === 'string');
}
