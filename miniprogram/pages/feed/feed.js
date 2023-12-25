Page({
  data: {
    plotOptions: ["七舍", "牛奶棚", "图书馆+河东小桥", "脑所", "大活+共青场+篮球场", "五舍内", "五舍后", "河西食堂+浴室", "六舍内", "16舍两侧+电镜中心", "国汉+设计中心"],
    selectedPlot: "七舍", // 默认选中第一个选项
  },

  // 返回按钮点击事件
  navigateBack: function () {
    wx.navigateBack({
      delta: 1, // 返回上一页
    });
  },

  bindPickerChange: function (e) {
    // 选择框内容发生变化时更新 selectedPlot 数据
    const index = e.detail.value;
    const selectedPlot = this.data.plotOptions[index];
    this.setData({
      selectedPlot: selectedPlot,
    });
  },

  submitFeed: function () {
    // 获取选择的地点
    const selectedPlot = this.data.selectedPlot;
    const currentTime = new Date(); // Get current time

    // 在 plot 表中查找对应的数据
    const db = wx.cloud.database();
    db.collection('plot').where({
      name: selectedPlot
    }).get().then(res => {
      // 如果找到了对应的数据
      if (res.data.length > 0) {
        // 获取数据的 _id
        const plotId = res.data[0]._id;
        // 更新 count 列数据和时间列
        db.collection('plot').doc(plotId).update({
          data: {
            count: db.command.inc(1), // count 加1
            time: currentTime, // 更新时间列
          },
          success: (result) => {
            console.log('更新数据成功', result);
            // 提示提交成功
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
            });
          },
          fail: (error) => {
            console.error('更新数据失败', error);
            // 提示提交失败
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000,
            });
          }
        });
      } else {
        console.error('未找到对应的数据');

        // 如果未找到对应数据，则插入新数据
        db.collection('plot').add({
          data: {
            name: selectedPlot,
            count: 1,
            time: currentTime,
          },
          success: (result) => {
            console.log('插入新数据成功', result);
            // 提示提交成功
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
            });
          },
          fail: (error) => {
            console.error('插入新数据失败', error);
            // 提示提交失败
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000,
            });
          }
        });
      }
    }).catch(error => {
      console.error('查询数据失败', error);
      // 提示提交失败
      wx.showToast({
        title: '提交失败',
        icon: 'none',
        duration: 2000,
      });
    });
  },
});
