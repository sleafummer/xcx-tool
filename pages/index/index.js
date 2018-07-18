// pages/index/index.js
Page({
  data: {
    code: ''
  },

  bindWxLogin: function(e) {
    let that = this;
    wx.login({
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '登录成功，请到控制台查看code',
        })
        console.log(res)
        that.setData({ code: res.code })
      }
    })
  },

  bindGetUserInfo: function(e) {
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

  formSubmit: function(e) {
    wx.showModal({
      title: '提示',
      content: '成功获取formId，请到控制台查看',
    })
    console.log(e.detail.formId)
  },

  bindFetchToken: function(e) {
    wx.login({
      success: function(res) {
        const code = res.code;
        console.log(code);
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: 'http://api.27ng.com/platform/token/get',
          method: 'POST',
          dataType: 'json', // 默认值 如果设为json，会尝试对返回的数据做一次 JSON.parse
          data: {
            code: code
          },
          success: function(res) {
            console.log(res.data);
            wx.showModal({
              title: '提示',
              content: '成功获取token, 请查看控制台'
            })
          }
        })
      }
    })
  },

  bindChooseLocation: function(e) {
    wx.chooseLocation({
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '地址选择成功，请查看控制台'
        })
        console.log(res);
      }
    })
  },

  getPhoneNumber: function(e) {
    console.log(e);
  }
})