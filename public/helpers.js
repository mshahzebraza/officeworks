export function defaultPairMaker(defaultKeys) {
  return defaultKeys.map(curKey => {
    return { field: curKey, value: '', req: true }
  })
}