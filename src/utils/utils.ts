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

export const queryString = (params: Record<string, any>) => {
  const keys = Object.keys(params)
  let qS = ''

  keys.forEach((key, index) => {
    qS += `${key}=${params[key]}`
    qS += index === keys.length - 1 ? '' : '&'
  })

  return qS
}

export const filterEmpty = (params: Record<string, any>) => {
  const empty = [undefined, null]
  const cloneParams = JSON.parse(JSON.stringify(params))

  for (const [k, v] of Object.entries(cloneParams)) {
    if (empty.includes((v as any))) {
      delete cloneParams[k]
    }
  }
  return cloneParams
}
