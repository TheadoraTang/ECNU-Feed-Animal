Page({
  data: {
    articles: [
      '社团救助原则（只负责校内）',
      '遇见小奶猫怎么办',
      '遇见校内疑似弃猫怎么办',
      '遇见校内疑似怀孕母猫怎么办',
      '其他问题',
    ],
    scrollY: true,
  },

  navigateToDetail: function (event) {
    const itemName = event.currentTarget.dataset.name;
    const plotNumber = this.mapNameToPlotNumber(itemName);
    wx.navigateTo({
      url: `/pages/knowledge${plotNumber}/knowledge${plotNumber}`,
    });
  },

  mapNameToPlotNumber: function (name) {
    switch (name) {
      case "社团救助原则（只负责校内）":
        return 1;
      case "遇见小奶猫怎么办":
        return 2;
      case "遇见校内疑似弃猫怎么办":
        return 3;
      case "遇见校内疑似怀孕母猫怎么办":
        return 4;
      case "其他问题":
        return 5;
      default:
        return 0; 
    }
  },
});
