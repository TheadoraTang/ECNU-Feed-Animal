// pages/knowledge5/knowledge5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  navigateBack: function () {
    wx.navigateBack({
      delta: 1, // 返回上一页
    });
  },
  // handleToAddress(e) {
  //   this.setData({
  //     toAddress: e.detail.value
  //   })
  // },
  handleSubject(e) {
    this.setData({
      toSubject: e.detail.value
    })
  },
  handleTextarea(e) {
    this.setData({
      toTextArea: e.detail.value
    })
  },
  handleClick() {
    wx.showLoading({
      title: '发送中'
    })
    const {toSubject, toTextArea} = this.data
    wx.cloud.callFunction({
      name: 'sendEmail',
      data: {
        from: '973068733@qq.com',
        to: 'txh973068733@126.com',
        subject: toSubject,
        text: toTextArea
        // html: '<p><b>你好：</b><img src=""></p>' +'<p>欢迎欢迎<br/></p>'
      },
      success: res => {
        wx.hideLoading()
        console.log(res)
        wx.showToast({
          title: '发送成功'
        })
      },
      fail: err =>{
        wx.hideLoading()
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})