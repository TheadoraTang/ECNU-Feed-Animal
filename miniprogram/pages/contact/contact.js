Page({
  // 其他页面配置...

  // 返回按钮点击事件
  navigateBack: function () {
    wx.navigateBack({
      delta: 1, // 返回上一页
    });
  },

  // 其他页面方法...
});
