export const hosturl = process.env.API_HOST

const app = '/xlxapp/app'

export const fileurl = hosturl + '/upload/app/appUpload/appUpload.do'

// export const wsurl = 'ws://192.168.4.182:8080/ws.json'
// export const wsurl = 'ws://d5.cto3.shovesoft.com/ws.json'
// export const wsurl = 'ws://tap.icmao.com/ws.json'
export const wsurl = 'wss://www.icmao.com/ws.json'

export const relativeurl = app + '/user'

export const saleorderurl = app + '/saleorder'

export const news = app + '/news'

export const setup = app + '/setup'

export const Order = app + '/Order'

export const shop = app + '/shop'

export const my = app + '/my'
