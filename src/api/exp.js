const exp = [
  {exptip: '手机必须是11位手机号码', tip: '请输入手机号吗', type: 'phone', val: /^((13|14|15|17|18)[0-9]{1}\d{8})$/},
  {exptip: '密码8-16位字母、数字', tip: '请输入密码', type: 'password', val: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/},
  {exptip: '密码8-16位字母、数字', tip: '请输入原始密码', type: 'oldpassword', val: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/},
  {exptip: '两次密码不一样', tip: '请输入第二次密码', type: 'passwordtwo', val: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/},
  {exptip: '验证码为6位数', tip: '请输入验证码', type: 'code', val: /^\d{6}$/}
]

// 返回type
export function TYPE (type) {
  return exp.find((x) => x.type === type)
}

// 根据正则返回type
export function TYPE_NAME (type, val) {
  let index = exp.findIndex((x) => x.type === type)
  if (index !== -1 && !exp[index].val.test(val)) {
    return exp[index].type
  } else {
    return ''
  }
}

// 返回正则
export function VAL (type) {
  let index = exp.findIndex((x) => x.type === type)
  if (index !== -1) {
    return exp[index].val
  } else {
    return false
  }
}

// 返回正则提示
export function EXPTIP (type) {
  let index = exp.findIndex((x) => x.type === type)
  if (index !== -1) {
    return exp[index].exptip
  } else {
    return false
  }
}

// 返回提示
export function TIP (type) {
  let index = exp.findIndex((x) => x.type === type)
  if (index !== -1) {
    return exp[index].tip
  } else {
    return false
  }
}

// 返回boolen
export function EXP (type, val) {
  let index = exp.findIndex((x) => x.type === type)
  if (index !== -1) {
    return exp[index].val.test(val)
  } else {
    return false
  }
}
