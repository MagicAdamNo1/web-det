# 功能
展示前端用户点击事件数据采集和数据预处理结果

# 使用
1. 安装配置NodeJS
2. NPM安装express模块和split2模块
   1. npm install express --save
   1. npm install split2 --save
3. 启动服务
   node app.js
4. 浏览器访问localhost:8080
5. 点击页面中各项均会引发数据采集过程
6. 点击结果项，会打开新的页面，页面展示了之前采集的点击行为的数据。（在UserPage页面点击之后需刷新Result Page方可刷新数据展示）