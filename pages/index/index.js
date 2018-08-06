// pages/index/index.js
Page({
  data: {
    code: '',
    token: '',
    region: ['安徽省', '宣城市', '宁国市'],
    areacode: ['340000', '3421800', '342881'],
    postcode: '242300'
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
        that.setData({
          code: res.code
        })
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
    var that = this;
    wx.login({
      success: function(res) {
        const code = res.code;
        that.setData({ code })
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          url: 'https://api.ngsfc.cn/platform/token/get',
          method: 'POST',
          dataType: 'json', // 默认值 如果设为json，会尝试对返回的数据做一次 JSON.parse
          data: {
            code: code
          },
          success: function(res) {
            console.log(res.data.data.token);
            var token = res.data.data.token;
            that.setData({ token });
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
  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value,
      areacode: e.detail.code,
      postcode: e.detail.postcode
    })
  },

  pay: function() {
    console.log('支付');
    var that = this;
    // 下单
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: this.data.token
      },
      url: 'https://api.ngsfc.cn/order',
      methos: 'POST',
      data: {
      },
      success: function(res) {
        // 判断库存量检测有没有通过 -> 是否可加入行程
        if (res.data.pass) {
          that.getPreOrder(res.data.order_id);
        } else {
          wx.showToast({
            title: '订单未创建成功'
          })
          console.log('订单未创建成功');
        }
      }
    })
  },

  getPreOrder: function (orderID) {
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: this.data.token
      },
      url: 'https://api.ngsfc.cn/pay/pre_order',
      methos: 'POST',
      data: {
        id: orderID
      },
      success: function (res) {
        var preData = res.data;
        wx.requestPayment({
          timeStamp: preData.timeStamp,
          nonceStr: preData.nonceStr,
          package: preData.package,
          signType: preData.signType,
          paySign: preData.paySign,
          success: function (res) {
            console.log(res);
          },
          fail: function (error) {
            console.log(error);
          }
        })
      }
    })
  }
})