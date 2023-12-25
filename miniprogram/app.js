// // app.js
// App({
//   globalData: {
//     userInfo: null,
//     // 其他全局数据...
//   },
  

//   onLaunch: function () {
//     // 初始化云开发
//     wx.cloud.init({
//       env: 'ecnuanimal-8gjgfbk49bd27e44', // 替换成你的云环境 ID
//       traceUser: true,
//     })
//   },

//   onLoad: function () {
//     // 调用云函数
//     this.callCloudFunction();
//   },

//   // 调用云函数的方法
//   callCloudFunction: function () {
//     wx.cloud.callFunction({
//       name: 'clearPlotData', 
//       success: res => {
//         console.log(res);
//         // 处理成功的逻辑
//       },
//       fail: err => {
//         console.error(err);
//         // 处理失败的逻辑
//       }
//     });
//   }
// })


// app.js
App({
  globalData: {
    userInfo: null,
    // 其他全局数据...
  },

  onLaunch: function () {
    // 初始化云开发
    wx.cloud.init({
      env: 'ecnuanimal-8gjgfbk49bd27e44', // 替换成你的云环境 ID
      traceUser: true,
    });
  },

  // 调用云函数的方法
  callCloudFunction: function () {
    wx.cloud.callFunction({
      name: 'clearPlotData', // 云函数的名称
      success: res => {
        console.log(res);
        // 处理成功的逻辑
      },
      fail: err => {
        console.error(err);
        // 处理失败的逻辑
      }
    });
  }
});
