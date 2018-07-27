// 简单去重取值 1-6个
export function searchpage (array) {
  if (array.length <= 0) { return [] }
  let newarr = Array.from(new Set(array))
  if (newarr.length > 6) {
    return newarr.slice(0, 6)
  }
  return newarr
}
