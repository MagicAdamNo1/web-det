/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-04-23 03:23:03
 * @LastEditors: Elon C
 * @LastEditTime: 2021-04-28 17:26:05
 * @FilePath: \web-det\det-system\config\config.js
 */
/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-04-23 03:23:03
 * @LastEditors: Elon C
 * @LastEditTime: 2021-04-23 03:57:24
 * @FilePath: \web-det\det-system\db.mjs
 */

const db_config = {
    dialect: 'mariadb',
    db_name: 'testdb',
    host: 'localhost',
    username: 'root',
    password: 'toor',
};

const learn_config = {
    len_array: [1, 2, 3],
    behavior_threshold:1
};

module.exports = {db_config,learn_config};
  