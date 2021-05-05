/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-04-28 18:56:12
 * @LastEditors: Elon C
 * @LastEditTime: 2021-04-29 22:16:21
 * @FilePath: \web-det\det-system\test-user\models\user.js
 */
const {Sequelize,DataTypes,Model } = require('sequelize');
const {db_config} = require('../config/config');

const sequelize = new Sequelize(db_config.db_name, db_config.username, db_config.password, {
  // ...
  dialect:db_config.dialect,
  host: db_config.host,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
});
// fs.
class User extends Model {
  
  //增加新条目
  static async create_user(
    u_id,
  ){
    // console.log(db.db_name, db.usernaame,db.passwd)
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
        try {
          await User.sync();  
          const [user,flag] = await User.findOrCreate({
            where : {
              u_id:u_id,
          },
          });  
          if (flag) {
            console.log(`User:{JSON.stringify(User)}已经保存到数据库`);
            return user;
          } else {
            console.log(`User:{JSON.stringify(User)}已经存在于数据库`);
          }
        }catch (error) {
            console.error(`User:{JSON.stringify(User)}模型创建失败：`, error);
        } 
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }  
  }
  
  //按uid查找条目
  static async get_user_by_uid(user_id) {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
        try {
          await User.sync();  
          return await User.findAll({
            where: {
              u_id: user_id,
            }
          });  
        }catch (error) {
            console.error('User模型表查找失败：', error);
        } 
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } 
  }
  
  //查找所有条目
  static async get_user_all() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
        try {
          await User.sync();  
          return await User.findAll();  
        }catch (error) {
            console.error('User模型表查找失败：', error);
        } 
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } 
  }
  
static async removeAndCreateTab() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
        try {
          await User.sync({force: true});  
          console.log(`已经重置了表格${User.modelName}`);
        }catch (error) {
            console.error(`模型表${User.modelName}重建失败：`, error);
        } 
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

User.init({
    // 在这里定义模型属性
  u_id: {
    type: DataTypes.STRING(36),
    allowNull: false
  },
}, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
    timestamps: true,// 不要忘记启用时间戳！
  });

module.exports = User;
