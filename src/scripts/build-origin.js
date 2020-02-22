const axios = require('axios')
const fs = require('fs')

const loadCityList = async data => {
  const cityList = data
  .match(/window.getAreaStat = (.*?)}catch/)[1]
  const provinces = JSON.parse(cityList)
  fs.writeFileSync('./data/area.json', cityList)
}

let times = 0
async function request () {
  console.log('开始执行request函数')
  return axios.request('https://3g.dxy.cn/newh5/view/pneumonia').then(({ data: html }) => {
    return Promise.all([
      loadCityList(html),
    ])
  }).catch(e => {
    console.log('Retry')
    if (times++ > 1) {
      throw e
    }
    return request()
  })
}

request().catch(e => {
  console.log(e)
  process.exit(1)
})