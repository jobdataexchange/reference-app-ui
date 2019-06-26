export function getEnumKeys<T>(myEnum: T): keyof T {
  return Object.keys(myEnum).filter(k => typeof (myEnum as any)[k] === 'string') as any;
}

export function createEmptyObjectFromEnum(e) {
  const emptyObj = {};
  [...getEnumKeys(e)].map( k => emptyObj[e[k]] = '');
  return emptyObj;

}
