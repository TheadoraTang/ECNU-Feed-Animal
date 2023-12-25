// cloudfunctions/getLatestFeedTime/index.js
const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    // 从 plot 表中查询最近的喂食时间
    const latestFeedTimes = await db.collection('plot').field({ name: true, count: true }).get();
    // 将数据按名称组织成对象
    const latestFeedTimesMap = {};
    latestFeedTimes.data.forEach((item) => {
        latestFeedTimesMap[item.name] = item.count;
    });

    return {
      code: 0,
      data: latestFeedTimesMap,
    };
  } catch (err) {
    console.error(err);
    return {
      code: 1,
      message: '查询失败',
    };
  }
};
