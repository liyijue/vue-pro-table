// 过滤调 hide 的 columns
export const filterColumnsByHideKey = (colunms: [], hideKey: string) => {
  return colunms.filter(col => !col[hideKey])
}

// 处理响应式收起状态下不需要隐藏的 form-item index
export const calculateExpandSpanMaxIndex = (span: Record<string, number>) => {
  const hiddenLayoutIndex = Object.create(null)

  Object.keys(span).forEach(key => {
    hiddenLayoutIndex[key] = Math.floor(24 / span[key]) - 2
  })

  return hiddenLayoutIndex
}
