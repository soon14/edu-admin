const titles = [
  '零基础快速入门韩语中级/高级/TOPIK考试/韩国留学',
  '日语历年真题讲与练・日语作文',
  '日语零基础/五十音/N1/N2/N3/日漫配音',
  '英语口语发音入门零基础班',
  '日语能力考试N2历年真题听力精练课程【一题四讲】',
  '游遍俄罗斯1视频教程，俄罗斯留学预科课程',
  '大学英语四级-词汇极速通关 四级考试网络在线课程',
  '英语四级-通关畅学班第1期',
  '中级经济法-知识点精讲课'
]
const imgs = [
  'https://img2.baidu.com/it/u=852969322,1820346618&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=337',
  'https://img1.baidu.com/it/u=3126737802,3030532665&fm=253&fmt=auto&app=138&f=JPEG?w=497&h=500',
  'https://img0.baidu.com/it/u=555250675,2314873960&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281',
  'https://img0.baidu.com/it/u=564979755,437025330&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
]
const getRandom = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const getTitle = () => {
  const index = getRandom(0, titles.length - 1)
  return titles[index]
}
export const getImg = () => {
  const index = getRandom(0, imgs.length - 1)
  return imgs[index]
}
