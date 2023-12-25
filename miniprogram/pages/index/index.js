Page({
  data: {
    userInfo: null,
  },

  onLoad: function (options) {
    // 从 options 中获取传递过来的用户信息
    const nickname = options.nickname;
    const avatarUrl = options.avatarUrl;

    // 更新页面的数据
    this.setData({
      userInfo: {
        nickName: nickname,
        avatarUrl: avatarUrl,
      },
    });
  },
  onShow: function () {
    // 获取全局数据，这里假设你将用户信息存储在全局变量 globalData 中
    const globalData = getApp().globalData;
    const userInfo = globalData.userInfo || {};

    // 更新页面的数据
    this.setData({
      userInfo: userInfo,
    });
  },

  // 跳转到喂食打卡页面
  goToFeed: function () {
    wx.navigateTo({
      url: '/pages/feed/feed',
    });
  },

  // 跳转到联系我们页面
  goToContact: function () {
    wx.navigateTo({
      url: '/pages/contact/contact',
    });
  },
});


