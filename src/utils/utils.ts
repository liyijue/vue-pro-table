export const filterColumnsByHideKey = (colunms: [], hideKey: string) => {
  return colunms.filter(col => !col[hideKey])
}
