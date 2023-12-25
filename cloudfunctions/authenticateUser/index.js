// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();
const userInfoCollection = db.collection('userInfo');

// 云函数入口函数
exports.main = async (event, context) => {
  const { name, id } = event;

  try {
    // 查询云数据库中是否存在匹配的用户信息
    const queryResult = await userInfoCollection
      .where({
        name: name,
        id: id,
      })
      .get();

    // 如果查询结果不为空，表示用户认证成功
    if (queryResult.data.length > 0) {
      return {
        authenticated: true,
      };
    } else {
      // 用户认证失败
      return {
        authenticated: false,
      };
    }
  } catch (error) {
    console.error('云函数调用失败', error);
    throw new Error('云函数调用失败');
  }
};
