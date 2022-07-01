// 获取数据
export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
// 添加数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    Window.localStorage.setItem(key, value)
  }
}

// 删除某个数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
// 清空所有数据
export const clearItem = () => {
  window.localStorage.cleanItem()
}
