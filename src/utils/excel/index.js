// [用于导入] 转化excel的日期格式
function formatDate(numb, format) {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return (
    year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
  )
}

/**
 * [用于导入] 将key为中文的数组转化为key为英文的数组, 并且按照`映射关系`转换数据类型
 * @param {Array} list    中文数组
 * @param {Object} mapper 映射关系对象 (映射关系格式需按要求配置)
   {name: {
        text: '姓名',
        type: 'string'
      },
    createdTime:{
        text: '开通时间',
        type: 'date'}}
 * @return {Array}
 */
function formatEnglishKey(list, mapper) {
  return list.map((item) => {
    const result = {}
    // 中文keys
    const chKeys = Object.keys(item)
    chKeys.forEach((chKey) => {
      const value = item[chKey]
      for (const enKey in mapper) {
        const val = mapper[enKey]
        // { 中文key, 数据类型 }
        const { text, type } = val
        if (text === chKey) {
          // 转换数据类型
          if (type === 'date') {
            const valueTemp = parseInt(value) + ''
            // 判断是否是excel时间格式 (5位数字, 不包含/符号, 不包含-符号)
            if (
              valueTemp.length === 5 &&
              !(value + '').includes('/') &&
              !(value + '').includes('-')
            ) {
              result[enKey] = new Date(formatDate(value, '/'))
            } else {
              // 如果不是excel时间格式, 不需要转换
              result[enKey] = new Date(value)
            }
            // console.log(new Date(formatDate(value, '/')), "??", value)
          } else if (type === 'number') {
            result[enKey] = Number(value)
          } else {
            result[enKey] = value + ''
          }
        }
      }
    })
    return result
  })
}
/**
 * [用于导出] 将英文表头转换为中文表头
 * @param {Array} enHeaders     英文表头 ['name', 'age' ...]
 * @param {Object} mapper        映射关系对象 (映射关系格式需按要求配置)
 * @return {Array}              返回中文表头 [ '姓名', '年龄' ...]
 */
function formatChineseHeader(enHeaders, mapper) {
  const result = []
  enHeaders.forEach((enHeader) => {
    for (const header in mapper) {
      if (enHeader === header) {
        result.push(mapper[header].text)
      }
    }
  })
  return result
}
/**
 * [用于导出] 按照表头的顺序导出数据
 * @param {Array} json     [{name: '张三', age: 18}, ...]
 * @param {Array} headers  [name, age]  英文表头
 * @return {Array}     [ [ '张三', 18 ], [] ... ] 返回的是二维数组, 其内每一个数组都是一个数据对象
 * */
function formatJsonByHeader(json, enHeaders, mapper) {
  return json.map((item) => {
    const result = []
    enHeaders.forEach((enHeader) => {
      const value = item[enHeader]
      const formatter = mapper[enHeader].formatter
      // 查看映射表里是否配置了格式化函数
      if (typeof formatter === 'function' && formatter) {
        result.push(formatter(value))
      } else {
        result.push(value)
      }
    })
    return result
  })
}

// [用于导出]格式化时间格式
function exportFormatDate(date, fmt = 'yyyy-MM-dd') {
  if (!(date instanceof Array)) {
    date = new Date(date)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export default {
  formatDate,
  formatEnglishKey,
  formatChineseHeader,
  formatJsonByHeader,
  exportFormatDate
}
