/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-03-31 10:25:10
 * @LastEditors: Elon C
 * @LastEditTime: 2021-05-01 21:24:26
 * @FilePath: \web-det\det-system\test-user\app.js
 */
var express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const User = require('./models/user');

function start(){
    var app = express();
    app.use(express.json()) // for parsing application/json
    app.use(express.static(path.join(__dirname, 'resources')))
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    app.get('/', function (req, res) {
    console.log("Request for / received.");
        res.sendFile( __dirname + "/" + "index.html" );
    })

    app.get('/users', async function (req, res) {
        users = await User.get_user_all();
        // console.log(JSON.stringify(users, null, 2));
        data = [];
        for (let user of users) {
            data[data.length] = user['u_id'];
        }
        res.json(data);
    })

    app.post('/users', bodyParser.text(),function (req, res) {
        body =req.body 
        uid = body['uid'];
        // console.log(body);
        User.create_user(uid).then(
            newUser => { 
                if (newUser != undefined) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            } 
        );
    })

    // function collectItems(jsonString) {
    //     // fs.createReadStream(path.join(__dirname, 'results/ClickItems.txt'))
    //     //     .pipe(split())
    //     //     .on('data', function (line) {
    //     //         ele = JSON.parse(line);

    //     //     });
    //     fs.appendFile(path.join(__dirname, 'results/ClickItems.txt'), jsonString, (err) => {
    //         if (err) throw err;
    //         console.log('数据已被追加到文件');
    //     })    
    // }

    // app.get('/items', function (req, res) {
    //     res.sendFile( __dirname + "/views/" + "items.html" );
    // })

    // app.get('/results', function (req, res) {
    //     res.sendFile( __dirname + "/views/" + "results.html" );
    // })

    // app.get('/data', function (req, res) {
    //     file = path.join(__dirname, '/results/ClickRecords.txt');
    //     pretreate(file,res);
    // })



    // function pretreate(filename,res) {
    //     body = {
    //         length: 0,
    //         //data: [
    //         //     {
    //         //         uid: null,
    //         //         sid: null,
    //         //         startTime:null,
    //         //         endTime:null,
    //         //         clickFrequencies: null,
    //         //         clickSeries: null,
    //         //     }
    //         // ]
    //     }
    //     fs.createReadStream(filename)
    //         .pipe(split())
    //         .on('data', function (line) {
    //             x = line.substr(0, line.length - 1);
    //             ele = JSON.parse(x);
        
    //             if (ele.eventType == 'click') {7
    //                 if (body.length != 0) {
    //                     data = body.data
    //                     data.forEach(element => {
    //                         if (element.uid === ele.uid && element.sid === ele.sid) {
    //                             clickSeries = element.clickSeries;
    //                             times = clickSeries.length;
    //                             clickSeries[times] = ele.identify;
    //                             if (ele.clickTime < element.startTime){
    //                                 element.startTime = ele.clickTime
    //                             }
    //                             if (ele.clickTime > element.endTime){
    //                                 element.endTime = ele.clickTime
    //                             }
    //                             element.clickFrequencies = times / (element.endTime - element.startTime)*1000;
    //                             ele.readflag = 1;
    //                         }
    //                     })
    //                     if (ele.readflag === 0) {
    //                         body.length++;
    //                         data[data.length] =
    //                         {
    //                             uid: ele.uid,
    //                             sid: ele.sid,
    //                             startTime:ele.clickTime,
    //                             endTime:ele.clickTime,
    //                             clickFrequencies: 1,
    //                             clickSeries: [ele.identify],
    //                         }
    //                         ele.readflag = 1;
    //                     }
    //                 } else {
    //                     body.length++;
    //                     body.data = [{
    //                         uid: ele.uid,
    //                         sid: ele.sid,
    //                         startTime:ele.clickTime,
    //                         endTime:ele.clickTime,
    //                         clickFrequencies: 1,
    //                         clickSeries: [ele.identify],
    //                     }]
    //                 }
    //             }
    //         }).on('end', function () {
    //             // console.log(body.length);
    //             // return body;
    //             res.json(body);
    //         });
    // }

    // app.post('/click', bodyParser.text(), function (req, res, next) {  
    //     req.body.readflag = 0;
    //     writeFile(JSON.stringify(req.body) + ',\n'); 
    //     res.sendStatus(200);
    // });


    // function writeFile (jsonString){
    //     fs.appendFile(path.join(__dirname, 'results/ClickRecords.txt'), jsonString, (err) => {
    //         if (err) throw err;
    //         console.log('数据已被追加到文件');
    //     })
    // }
    var server = app.listen(8080, function () {
 
        var host = server.address().address
        var port = server.address().port
       
        console.log("访问地址为 http://%s:%s", host, port)
       
    })
}
testUser = { 'start': start };

module.exports = testUser;