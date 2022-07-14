const radio = () => {
  return {
    options: ['点击编辑内容', '点击编辑内容'],
    value: [0]
  }
}
const checkbox = () => {
  return {
    options: ['点击编辑内容', '点击编辑内容'],
    value: []
  }
}
const trueOrfalse = () => {
  return {
    options: ['点击编辑内容', '点击编辑内容'],
    value: 0
  }
}
const answer = () => {
  return {
    options: ['点击编辑内容'],
    value: 0
  }
}
const completion = () => {
  return {
    options: ['点击编辑内容', '点击编辑内容'],
    value: 0
  }
}

export const templates = { radio, checkbox, trueOrfalse, answer, completion }
