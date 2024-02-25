export const isAlphanumeric = (str: string): boolean => {
  const res = /^[a-zA-Z0-9]+$/.test(str)
  return !!res
}
