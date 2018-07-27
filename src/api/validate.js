import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
import {EXPTIP, EXP, TIP} from './exp'

// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN',
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 1000,
  strict: true,
  enableAutoClasses: true,
  events: 'input|blur',
  inject: true

}

Vue.use(VeeValidate, config)

// / 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      // phone: () => '请输入正确的邮箱格式'
      required: (field) => TIP(field)
    },
    attributes: {
      phone: 'phone',
      code: 'code',
      password: 'password',
      passwordtwo: 'passwordtwo',
      oldpassword: 'oldpassword'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => EXPTIP(field)
  },
  validate: value => {
    return value.length === 11 && EXP('phone', value)
  }
})
Validator.extend('code', {
  messages: {
    zh_CN: field => EXPTIP(field)
  },
  validate: value => {
    return value.length === 6 && EXP('code', value)
  }
})
Validator.extend('password', {
  messages: {
    zh_CN: field => EXPTIP(field)
  },
  validate: value => {
    return EXP('password', value)
  }
})
Validator.extend('passwordtwo', {
  messages: {
    zh_CN: field => EXPTIP(field)
  },
  validate: value => {
    return EXP('passwordtwo', value)
  }
})
Validator.extend('oldpassword', {
  messages: {
    zh_CN: field => EXPTIP(field)
  },
  validate: value => {
    return EXP('oldpassword', value)
  }
})

// after{target} - 比target要大的一个合法日期，格式(DD/MM/YYYY)
// alpha - 只包含英文字符
// alpha_dash - 可以包含英文、数字、下划线、破折号
// alpha_num - 可以包含英文和数字
// before:{target} - 和after相反
// between:{min},{max} - 在min和max之间的数字
// confirmed:{target} - 必须和target一样
// date_between:{min,max} - 日期在min和max之间
// date_format:{format} - 合法的format格式化日期
// decimal:{decimals?} - 数字，而且是decimals进制
// digits:{length} - 长度为length的数字
// dimensions:{width},{height} - 符合宽高规定的图片
// email - 不解释
// ext:[extensions] - 后缀名
// image - 图片
// in:[list] - 包含在数组list内的值
// ip - ipv4地址
// max:{length} - 最大长度为length的字符
// mimes:[list] - 文件类型
// min - max相反
// mot_in - in相反
// numeric - 只允许数字
// regex:{pattern} - 值必须符合正则pattern
// required - 不解释
// size:{kb} - 文件大小不超过
// url:{domain?} - (指定域名的)url

// 关于errors：

// 上面的代码我们看到有errors.has,errors.first,errors是组件内置的一个数据模型，用来存储和处理错误信息，可以调用以下方法：

// errors.first('field') - 获取关于当前field的第一个错误信息
// collect('field') - 获取关于当前field的所有错误信息(list)
// has('field') - 当前filed是否有错误(true/false)
// all() - 当前表单所有错误(list)
// any() - 当前表单是否有任何错误(true/false)
// add(String field, String msg) - 添加错误
// clear() - 清除错误
// count() - 错误数量
// remove(String field) - 清除指定filed的所有错误
