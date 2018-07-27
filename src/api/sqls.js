
export var config = {
  dbName: 'toking',
  tableName: 'tablestu',
  keyPath: 'countId',
  version: 2021,
  db: null,
  errorCode: {
    // 错误码
    open: 91001, // 打开数据库失败的错误
    save: 91002, // 保存数据失败的错误
    get: 91003, // 获取数据失败的错误
    delete: 91004, // 删除数据失败的错误
    deleteAll: 91005, // 清空数据库失败的错误
    add: 91006, // 插入
    ok: 90000
  }
}

export function openDB (callback) {
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB
  if ('webkitIndexedDB' in window) {
    window.IDBTransaction = window.webkitIDBTransaction
    window.IDBKeyRange = window.webkitIDBKeyRange
  }
  if (!indexedDB) {
    alert('你的浏览器不支持!')
  }
  var request = indexedDB.open(config.dbName, config.version)
  request.onerror = function (e) {
    callback(config.errorCode.open)
  }
  request.onupgradeneeded = function (event) {
    console.log('触发了upgradeneeded事件')
    var db = event.target.result
    if (!db.objectStoreNames.contains(config.tableName)) {
      db.createObjectStore(config.tableName, {keyPath: config.keyPath})
      // objectStore.createIndex('type', 'cid', {unique: false})
    }
    config.db = db
    callback(config.errorCode.ok)
  }
  request.onsuccess = function (event) {
    config.db = event.target.result
    callback(config.errorCode.ok, true)
  }
}

export function addData (list, statusMessage, cid, func) {
  // alert('put之前的list' + JSON.stringify(list))
  var transaction = config.db.transaction(config.tableName, 'readonly')
  var result = transaction.objectStore(config.tableName).get(cid)
  result.onsuccess = function (e) {
    var getvals = e.target.result
    // 第一次添加
    if (!getvals || getvals == undefined) {
      var settransaction = config.db.transaction(config.tableName, 'readwrite')
      var result = settransaction.objectStore(config.tableName)
      var resultmsg

      var newlist = {
        list: [list],
        countId: cid,
        statusMessage: statusMessage || 0
      }
      // alert('add' + JSON.stringify(list))
      resultmsg = result.add(newlist)
      resultmsg.onsuccess = function (e) {
        func(e.target.result)
      }

      resultmsg.onerror = function () {
        func(config.errorCode.add)
      }
    } else {
      var listarr = getvals

      if (Object.keys(list).length !== 0 === true) {
        listarr.list.push(list)
        // alert('操你大爷' + (Object.keys(list).length !== 0))
      }

      // if()
      listarr.statusMessage = statusMessage || 0

      var settransaction2 = config.db.transaction(config.tableName, 'readwrite')
      var result2 = settransaction2.objectStore(config.tableName)
      // alert('put' + JSON.stringify(list))
      var request = result2.get(cid)
      request.onsuccess = function (e) {
        var cursor = e.target.result
        for (var key in listarr) {
          cursor[key] = listarr[key]
        }
        // 替换（整个）
        result2.put(cursor)
        // alert('resultto' + JSON.stringify(cursor))
        func(e.target.result)
      }
      request.onerror = function () {
        func(config.errorCode.add)
      }

      // var request2 = result2.get(cid)
      // request2.onsuccess = function (e) {
      //   var cursor = e.target.result
      //   alert('resultto' + JSON.stringify(cursor))
      // }
    }
  }
}
// 获取单条// 获取
export function getData (tableName, cid, func) {
  // tableName = tableName || config.tableName
  // 通过索引获取
  // var transaction = config.db.transaction(tableName, 'readonly')
  // var result = transaction.objectStore(tableName)

  // // 获取索引对象
  // var index = result.index('cid')
  // var res
  // index.get(keyName).onsuccess = function (e) {
  //   res = e.target.result
  //   console.log(res)
  // }
  // return

  // 通过索引和游标联合获取数据

  // var transaction = config.db.transaction(tableName, 'readonly')
  // var result = transaction.objectStore(tableName)
  // var index = result.index('type')

  // var res = []
  // var request = index.openCursor(IDBKeyRange.only(keyName))

  // request.onsuccess = function (e) {
  //   var cursor = e.target.result
  //   if (cursor && cursor !== null) {
  //     var obj = cursor.value
  //     res.push(obj)
  //     cursor.continue()
  //   }
  // }
  // 通过下标Keyid获取数据
  var transaction = config.db.transaction(config.tableName, 'readonly')

  // 通过下标获取
  var result = transaction.objectStore(config.tableName).get(cid)

  var res
  result.onsuccess = function (e) {
    res = e.target.result
    func(res)
  }
  result.onerror = function (e) {
    func(config.errorCode.get)
  }
}
// 获取所有数据
export function getAll (tableName, func) {
  var transaction = config.db.transaction([config.tableName], 'readonly')
  var result = transaction.objectStore(config.tableName)

  var res
  var data = []
  var i = 0
  result.openCursor().onsuccess = function (e) {
    res = e.target.result

    if (res && res !== null) {
      // console.log(res.key)
      // console.log(res.value)

      // var key = res.key
      // var value = res.value
      // data[key] = val
      // 这里要对消息做处理了
      // res.value.forEach((item, index) => {
      //   // 判断用户进了页面但有可能发和没发消息
      //   if (item.type !== 1) {

      //   }
      // })
      // smallArr = res.value.list[res.value.list.length - 1]
      // smallArr.information = res.value.list[0].information
      // smallArr.myinformation = res.value.list[0].myinformation

      // if (res.value.list[0].myinformation.userId === information.userId) {
      // smallArr.information = res.value.list[0].information
      // } else {
      // smallArr.information = res.value.list[0].myinformation
      // }
      data[i] = {
        [config.keyPath]: res.key, // 对方的
        list: res.value.list, // 对方的信息（内容是最后一个的
        statusMessage: res.value.statusMessage
      }

      i++

      res.continue()
    }
  }
  transaction.oncomplete = function (e) {
    func(data)
  }
}

// 修改所有数据
export function updateData (keyName, content) {
  var transaction = config.db.transaction(config.tableName, 'readwrite')

  var result = transaction.objectStore(config.tableName)

  var request = result.get(config.keyName)
  var res
  request.onsuccess = function (e) {
    res = e.target.result
    // 遍历用户传递进来的json对象
    for (var key in content) {
      res[key] = content[key]
    }
    result.put(res)
  }

  request.onerror = function (e) {
    console.log('修改数据失败,原因:' + e.target.errorCode || e.target.error)
  }
}

// 删除指定数据
export function deleteDB (keyId, func) {
  setTimeout(function () {
    var result = config.db.transaction(config.tableName, 'readwrite').objectStore(config.tableName).delete(keyId)
    // 删除数据成功回调函数
    result.onsuccess = function (e) {
      func(config.errorCode.ok)
    }

    // 删除数据失败回调函数
    result.onerror = function () {
      func(config.errorCode.delete)
    }
  }, 500)
}

// 清空数据表数据
export function clearData (tableName) {
  var result = config.db.transaction(tableName, 'readwrite').objectStore(tableName).clear()

  result.onsuccess = function () {
    console.log('清空表:' + tableName + '成功!')
  }

  result.onerror = function (e) {
    console.log('清空表:' + tableName + '失败!原因:' + e.target.errorCode || e.target.error)
  }
}

// 删除数据库
export function deleteDBs (dbName) {
  setTimeout(function () {
    // 关闭数据库
    config.db.close()
    // 删除数据库
    indexedDB.deleteDatabase(dbName)
    console.log('删除数据库' + dbName + '成功!')
  }, 500)
}

// 点击按钮插入数据
// function insert () {
// addData(this.list)
// }

// 点击按钮获取数据
// function get () {
//   openDB(config.dbName, config.tableName, config.keyPath, config.version)

//   setTimeout(function () {
//     // 通过keyId获取数据
//     // getData(config.tableName,1001,func);
//     // 通过索引获取数据
//     getData(config.tableName, 18, func)

//     function func (data) {
//       console.log(data)
//     }
//   }, 500)
// }

// 点击获取所有数据
// function gets () {
//   openDB(config.dbName, config.tableName, config.keyPath, config.version)

//   setTimeout(function () {
//     getAll(config.tableName, function (data) {
//       console.log(data)
//     })
//   }, 500)
// }

// 点击删除指定数据
function delBy () {
  openDB(config.dbName, config.tableName, config.keyPath, config.version)
  setTimeout(function () {
    deleteData(config.tableName, 1001)
  }, 500)
}

// 点击清空指定表数据
function clearTabData () {
  openDB(config.dbName, config.tableName, config.keyPath, config.version)

  setTimeout(function () {
    clearData(config.tableName)
  }, 500)
}

// 点击删除指定数据库
function deletes () {
  openDB(config.dbName, config.tableName, config.keyPath, config.version)
  deleteDB('testh501')
}

// 点击更新指定下标数据
function update () {
  openDB(config.dbName, config.tableName, config.keyPath, config.version)

  setTimeout(function () {
    updateData(1002, {name: '大麦茶', age: 100})
  }, 500)
}
