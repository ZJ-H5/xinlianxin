import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Alert from '@/base/Confirm'
import storage from 'api/storage'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
// 登录注册
export const login = [
  {
    path: '/',
    redirect: '/recommend/nominate'
  },
  {
    path: '/login',
    component: _import('login/login'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: ''
    },
    name: 'login'
  },
  {
    path: '/phoneLogin',
    component: _import('phoneLogin/phoneLogin'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  },
  {
    path: '/register',
    component: _import('register/register'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  },
  {
    path: '/forgetPassw',
    component: _import('forgetPassw/forgetPassw'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  },
  {
    path: '/regAgreement',
    component: _import('regAgreement/regAgreement'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  },
  {
    path: '/creditsearch',
    component: _import('credit-search/credit-search'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  },
  {
    path: '/modelsearch',
    component: _import('model-search/model-search'),
    meta: { hmd: false, requireAuth: true, noCache: false, icon: '', title: '' }
  }
]
// 首页
export const index = [
  {
    path: '/recommend',
    name: 'Recommend',
    component: _import('recommend/recommend'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'recommend'
    },
    redirect: '/recommend/nominate',
    children: [
      {
        path: 'nominate',
        component: _import('nominate/nominate'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: 'nominate'
        }
      },
      {
        path: 'ranklist',
        component: _import('rank-list/rank-list'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: 'ranklist'
        }
      },
      {
        path: 'credit',
        component: _import('credit/credit'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: 'credit'
        }
      },
      {
        path: 'news',
        component: _import('news/news'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: 'news'
        }
      }
    ]
  },

  {
    path: '/newpage',
    name: 'newpage',
    component: _import('newpage/newpage'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'newpage'
    }
  },

  {
    path: '/productDetail',
    component: _import('product-detail/product-detail'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'productDetail'
    }
  },
  {
    path: '/successMsg',
    component: _import('success-msg/success-msg'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'successMsg'
    }
  },
  {
    path: '/failMsg',
    component: _import('fail-msg/fail-msg'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'failMsg'
    }
  },
  {
    path: '/searchpage',
    component: _import('search-page/search-page'),
    meta: {
      hmd: false,
      requireAuth: true,
      noCache: false,
      icon: '',
      title: 'searchpage'
    }
  },
  {
    path: '/companyDetail',
    component: _import('company-detail/company-detail'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: 'companyDetail'
    },
    redirect: '/companyDetail/introduce',
    children: [
      {
        path: 'introduce',
        component: _import('introduce/introduce'),
        meta: {
          hmd: false,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'introduce'
      },
      {
        path: 'customerpj',
        component: _import('customerpj/customerpj'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'customerpj'
      },
      {
        path: 'hotproduct',
        component: _import('hotproduct/hotproduct'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'hotproduct'
      },
      {
        path: 'tjproduct',
        component: _import('tjproduct/tjproduct'),
        meta: {
          hmd: false,
          requireAuth: true,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'tjproduct'
      }
    ]
  }
]
// 说说
export const fiction = [
  {
    path: '/fiction',
    component: _import('fiction/fiction'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    redirect: '/fiction/fictionImmediate',
    name: 'fiction',
    children: [
      {
        path: 'fictionImmediate',
        component: _import('fiction-immediate/fiction-immediate'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'fictionImmediate'
      },
      {
        path: 'transaction',
        component: _import('fiction-transaction/fiction-transaction'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'notice',
        component: _import('fiction-notice/fiction-notice'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      }
    ]
  },
  {
    path: '/communication',
    component: _import('fiction-communication/fiction-communication'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  }
]
// 购物车
export const cart = [
  {
    path: '/cart',
    component: _import('cart/cart'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: 'cart'
    },
    beforeEach: (to, from, next) => {
      // from.meta.noCache = false
      // to.meta.noCache = false
      // console.log(to.meta)
    },
    name: 'cart'
  },
  {
    path: '/invoiceManagement',
    component: _import('invoice-management/invoice-management'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: 'invoice-management',
      keepAlive: true
    },
    name: 'invoiceManagement'
  },
  {
    path: '/checkOrder',
    component: _import('check-order/check-order'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: true,
      icon: '',
      title: 'checkOrder',
      keepAlive: true
    },
    name: 'checkOrder'
  },
  {
    path: '/checkOrderCart',
    component: _import('check-order-cart/check-order-cart'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: 'checkOrderCart',
      keepAlive: true
    },
    name: 'checkOrderCart',
    beforeEach: (to, from, next) => {
      // from.meta.noCache = false
      // to.meta.noCache = false
      console.log(from.meta, to.meta)
    }
  },
  {
    path: '/payOrder',
    component: _import('pay-order/pay-order'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    name: 'payOrder'
  },
  {
    path: '/manageAddress',
    component: _import('manage-address/manage-address'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/addressChange',
    component: _import('addressChange/addressChange'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  }
]
// 我的
export const userCenter = [
  {
    path: '/allAppraise',
    component: _import('all-appraise/all-appraise'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/customerAppraise',
    component: _import('customerAppraise/customerAppraise'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/sellerAppraise',
    component: _import('sellerAppraise/sellerAppraise'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/selectInvoice',
    component: _import('selectInvoice/selectInvoice'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: '',
      keepAlive: true
    },
    name: 'selectInvoice'
  },
  {
    path: '/addInvoice',
    component: _import('addInvoice/addInvoice'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    redirect: '/addInvoice/generalInvoice',
    children: [
      {
        path: 'generalInvoice',
        component: _import('generalInvoice/generalInvoice'),
        meta: {
          hmd: false,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'generalInvoice'
      },
      {
        path: 'vatInvoice',
        component: _import('vatInvoice/vatInvoice'),
        meta: {
          hmd: false,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'vatInvoice'
      }
    ]
  },
  {
    path: '/editInvoice',
    component: _import('editInvoice/editInvoice'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    redirect: '/editInvoice/generalInvoice',
    children: [
      {
        path: 'generalInvoice',
        component: _import('generalInvoice/generalInvoice'),
        meta: {
          hmd: false,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'editgeneralInvoice'
      },
      {
        path: 'vatInvoice',
        component: _import('vatInvoice/vatInvoice'),
        meta: {
          hmd: false,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        },
        name: 'editvatInvoice'
      }
    ]
  },
  {
    path: '/uploadFile',
    component: _import('uploadFile/uploadFile'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/checkUploadFile',
    component: _import('checkUploadFile/checkUploadFile'),
    meta: { hmd: false, requireAuth: false, noCache: true, icon: '', title: '' }
  },
  {
    path: '/purchaseOrderUpload',
    component: _import('purchaseOrderUpload/purchaseOrderUpload'),
    meta: { hmd: false, requireAuth: false, noCache: true, icon: '', title: '' }
  },
  {
    path: '/selectAddress',
    component: _import('selectAddress/selectAddress'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    name: 'selectAddress'
  },
  {
    path: '/addressAdd',
    component: _import('addressAdd/addressAdd'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },

  {
    path: '/pjinstructions',
    component: _import('pjinstructions/pjinstructions'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/topic',
    component: _import('topic/topic'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/salesOrder',
    component: _import('salesOrder/salesOrder'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/purchaseOrder',
    component: _import('purchase-order/purchase-order'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    children: [
      {
        path: 'qb',
        component: _import('qb/qb'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'dfh',
        component: _import('dfh/dfh'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'dsh',
        component: _import('dsh/dsh'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'dqr',
        component: _import('dqr/dqr'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'dbk',
        component: _import('dbk/dbk'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },

      {
        path: 'dpj',
        component: _import('dpj/dpj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      }
    ]
  },
  {
    path: '/pay',
    component: _import('pay/pay'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/checkBill',
    component: _import('check-bill/check-bill'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/checkLogistics',
    component: _import('check-logistics/check-logistics'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/checkAppendix',
    component: _import('check-appendix/check-appendix'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/checkEvidence',
    component: _import('check-evidence/check-evidence'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/salesOrder',
    component: _import('salesOrder/salesOrder'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    children: [
      {
        path: 'salesOrderAll',
        component: _import('salesOrderAll/salesOrderAll'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'salesOrderDqr',
        component: _import('salesOrderDqr/salesOrderDqr'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'salesOrderDbk',
        component: _import('salesOrderDbk/salesOrderDbk'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'salesOrderDfh',
        component: _import('salesOrderDfh/salesOrderDfh'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'salesOrderDsh',
        component: _import('salesOrderDsh/salesOrderDsh'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'salesOrderDpj',
        component: _import('salesOrderDpj/salesOrderDpj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      }
    ]
  },
  {
    path: '/evaluateBuyers',
    component: _import('evaluateBuyers/evaluateBuyers'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/confirmReceipt',
    component: _import('confirmReceipt/confirmReceipt'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/uploadInvoice',
    component: _import('uploadInvoice/uploadInvoice'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },

  {
    path: '/set',
    component: _import('set/set'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/accountInform',
    component: _import('accountInform/accountInform'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/changeCompanyName',
    component: _import('changeCompanyName/changeCompanyName'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    name: 'changeCompanyName'
  },
  {
    path: '/changePassw',
    component: _import('changePassw/changePassw'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/changePhoneA',
    name: 'ChangePhoneA',
    component: _import('changePhoneA/changePhoneA'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/changePhoneB',
    component: _import('changePhoneB/changePhoneB'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/aboutICCat',
    component: _import('aboutICCat/aboutICCat'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/uploadPayfile',
    component: _import('upload-payfile/upload-payfile'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/orderdetailDqr',
    component: _import('orderdetail-dqr/orderdetail-dqr'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/userCenter',
    component: _import('user-center/user-center'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/collectModels',
    component: _import('collect-models/collect-models'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/attentionSellers',
    component: _import('attention-sellers/attention-sellers'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/highSellers',
    component: _import('high-sellers/high-sellers'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/myAsk',
    component: _import('my-ask/my-ask'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    children: [
      {
        path: 'yxj',
        component: _import('yxj/yxj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'wxj',
        component: _import('wxj/wxj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      }
    ]
  },
  {
    path: '/manageCompany',
    component: _import('manage-company/manage-company'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },
  {
    path: '/selectCompany',
    component: _import('select-company/select-company'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    name: 'selectCompany'
  },
  {
    path: '/manageBill',
    component: _import('manage-bill/manage-bill'),
    meta: {
      hmd: false,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    }
  },

  {
    path: '/myOffer',
    component: _import('my-offer/my-offer'),
    meta: {
      hmd: true,
      requireAuth: false,
      noCache: false,
      icon: '',
      title: ''
    },
    children: [
      {
        path: 'dbj',
        component: _import('dbj/dbj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'ybj',
        component: _import('ybj/ybj'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'yhl',
        component: _import('yhl/yhl'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      },
      {
        path: 'ygq',
        component: _import('ygq/ygq'),
        meta: {
          hmd: true,
          requireAuth: false,
          noCache: false,
          icon: '',
          title: ''
        }
      }
    ]
  }
]
// 登录注册

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...login, ...index, ...fiction, ...cart, ...userCenter]
})
router.beforeEach((to, from, next) => {
  const toDepth = to.path.split('/')
  const fromDepth = from.path.split('/')
  // if (from.meta.title === 'cart') {
  //   to.meta.noCache = false
  // }
  // if (from.meta.title === 'checkOrderCart') {
  //   from.meta.noCache = true
  // }
  if (toDepth.length < fromDepth.length) {
    // console.log(fromDepth.length, toDepth.length)
    // from.meta.noCache = false
    // to.meta.noCache = true
  }
  if (!storage.getStore('token')) {
    if (to.meta.requireAuth) {
      // true 就是不需要路由的  false要验证
      next()
    } else {
      store.commit('SET_REDIRECT', 'recommend/nominate')
      next({
        path: '/login'
        // redirect: to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // redirect: '/login' // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
    // 未登录的状态
  } else {
    store.commit('SET_REDIRECT', '/')
    // false 代表不是黑名单。true代表是
    // 是黑名单的话不能访问即时通讯。购物车下单。采购。销售。询价。报价。客服中心都不能操作
    console.log(storage.getStore('hmd'), to.meta.hmd)
    if (storage.getStore('hmd') === true && to.meta.hmd === true) {
      Alert({
        title: '',
        content: '黑名单用户不能访问！',
        close: '取消',
        submit: '确定',
        flag: true
      }).then(res => {
        console.log(res)
      })
    } else {
      next()
    }
  }
})

export default router
