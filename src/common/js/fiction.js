
import {dateFormat} from 'api/time'
export class Fiction {
  constructor ({type, content, contentimg, componyName, companyImg, tel, time, timeType, statusMessage, information, myinformation}) {
    this.type = type
    this.content = content
    this.contentimg = contentimg
    this.componyName = componyName
    this.companyImg = companyImg
    this.tel = tel
    this.time = time
    this.myimgtype = !!companyImg
    this.timeType = timeType
    this.statusMessage = statusMessage
    this.information = information || ''
    this.myinformation = myinformation || ''
  }
}

export function creatFiction (
  companyImg,
  componyName,
  cid,
  tel,
  timeType,
  information,
  myinformation,
  content,
  type
) {
  return new Fiction({
    type: type,
    content: content,
    contentimg: '',
    componyName: componyName,
    companyImg: companyImg,
    tel: tel,
    time: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    myimgtype: !!companyImg,
    timeType: timeType,
    statusMessage: 0,
    information: information,
    myinformation: myinformation
  })
}
