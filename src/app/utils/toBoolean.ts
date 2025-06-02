export function stringToBoolean(value: string | undefined | null): boolean | undefined {
  if (value === undefined || value === null || value === '') return undefined;

  return value.toLowerCase() === 'true';
}
