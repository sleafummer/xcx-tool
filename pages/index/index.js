// pages/index/index.js
Page({
  bindWxLogin: function (e) {
    wx.login({
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '登录成功，请到控制台查看code',
        })
        console.log(res)
      }
    })  
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.showModal({
        title: '提示',
        content: '成功获取昵称，请查看控制台'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '获取失败'
      })
    }
    console.log(e)
  },

  formSubmit: function (e) {
    wx.showModal({
      title: '提示',
      content: '成功获取formId，请到控制台查看',
    })
    console.log(e.detail.formId)
  }
})