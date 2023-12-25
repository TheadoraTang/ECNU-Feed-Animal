Page({
  data: {
    userInfo: null,
    authenticated: false,
    authFailed: false,
    inputName: "",
    inputId: "",
  },

  bindNameInput: function (e) {
    this.setData({
      inputName: e.detail.value,
    });
  },

  bindIdInput: function (e) {
    this.setData({
      inputId: e.detail.value,
    });
  },

  onLogin: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;

        // 将用户信息存储到全局数据中
        getApp().globalData.userInfo = userInfo;

        // 更新页面的数据
        this.setData({
          userInfo: userInfo,
        });

        wx.cloud.callFunction({
          name: 'authenticateUser',
          data: {
            name: this.data.inputName,
            id: this.data.inputId,
          },
          success: (res) => {
            const authenticated = res.result.authenticated;

            if (authenticated) {
              this.setData({
                authenticated: true,
                authFailed: false,
              });
            } else {
              this.setData({
                authFailed: true,
              });
            }
          },
          fail: (err) => {
            console.error('认证失败', err);
          },
        });
      },
      fail: (err) => {
        console.error('获取用户信息失败', err);
      },
    });
  },

  navigateToIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
});
