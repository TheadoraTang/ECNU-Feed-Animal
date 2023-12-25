const cloud = require('wx-server-sdk');
cloud.init({env: cloud.DYNAMIC_CURRENT_ENV});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取数据库引用
  const db = cloud.database();

  try {
    // 删除集合中所有文档
    const result = await db.collection('plot').where({}).get();
    
    // 获取集合中的所有文档的 _id
    const ids = result.data.map(doc => doc._id);

    // 删除所有文档
    await Promise.all(ids.map(id => db.collection('plot').doc(id).remove()));

    return {
      success: true,
      message: '集合清空成功',
      result: result
    };
  } catch (error) {
    return {
      success: false,
      message: '集合清空失败',
      error: error
    };
  }
};
