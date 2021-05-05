/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-04-28 19:35:35
 * @LastEditors: Elon C
 * @LastEditTime: 2021-04-29 19:00:56
 * @FilePath: \web-det\det-system\test-user\test\test_user.js
 */

const User = require('../models/user')

User.removeAndCreateTab();
// User.create_user('a');
// User.get_user_all().then(
//     function (data) {
//         console.log(JSON.stringify(data, null, 2));
//     }
// );