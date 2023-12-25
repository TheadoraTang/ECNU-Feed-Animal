// map.js
const app = getApp();
Page({
  data: {
    feedPoints: [
      "七舍", "牛奶棚", "图书馆+河东小桥", "脑所", "大活+共青场+篮球场",
      "五舍内", "五舍后", "河西食堂+浴室", "六舍内", "16舍两侧+电镜中心", "国汉+设计中心"
    ],
    feedTimes: {}, // 存储最近的喂食时间
  },

    onLoad: function () {
    this.loadData();
  },

  onShow: function () {
    this.loadData();
  },

  // 加载数据的函数
  loadData: function () {
    this.getLatestFeedTimes();
  },

  // 调用云函数获取最近的喂食次数
  getLatestFeedTimes: function () {
    wx.cloud.callFunction({
      name: 'getLatestFeedTime',
      success: (res) => {
        const { code, data } = res.result;
        if (code === 0) {
          this.setData({
            feedTimes: data,
          });
        } else {
          wx.showToast({
            title: '获取喂食次数失败',
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: (err) => {
        console.error('云函数调用失败', err);
        wx.showToast({
          title: '函数调用失败',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  navigateToDetail: function (event) {
    const itemName = event.currentTarget.dataset.name;
    const plotNumber = this.mapNameToPlotNumber(itemName);
    wx.navigateTo({
      url: `/pages/plot${plotNumber}/plot${plotNumber}?name=${itemName}`,
    });
  },

  navigateToDetail: function (event) {
    const itemName = event.currentTarget.dataset.name;
    const plotNumber = this.mapNameToPlotNumber(itemName);
    wx.navigateTo({
      url: `/pages/plot${plotNumber}/plot${plotNumber}?name=${itemName}`,
    });
  },

  mapNameToPlotNumber: function (name) {
    switch (name) {
      case "七舍":
        return 1;
      case "牛奶棚":
        return 2;
      case "图书馆+河东小桥":
        return 3;
      case "脑所":
        return 4;
      case "大活+共青场+篮球场":
        return 5;
      case "五舍内":
        return 6;
      case "五舍后":
        return 7;
      case "河西食堂+浴室":
        return 8;
      case "六舍内":
        return 9;
      case "16舍两侧+电镜中心":
        return 10;
      case "国汉+设计中心":
        return 11;
      default:
        return 1; 
    }
  },
});
