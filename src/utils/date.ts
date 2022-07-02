export function formatDate(
  millisecond: number,
  template: string = 'YYYY-mm-dd HH:MM:SS'
) {
  let res = ''
  try {
    const date = new Date(millisecond)
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
    } as Record<string, string>
    template = template || 'YYYY-mm-dd'
    for (const k in opt) {
      const ret = new RegExp('(' + k + ')').exec(template)
      if (ret) {
        template = template.replace(
          ret[1],
          ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    res = template
  } catch (error) {
    console.warn('ERROR formatDate', error)
  }
  return res
}
