/*
 * @Descripttion: 
 * @version: v0.1
 * @Author: Elon C
 * @Date: 2021-04-21 01:58:19
 * @LastEditors: Elon C
 * @LastEditTime: 2021-04-29 19:15:29
 * @FilePath: \web-det\det-system\test-user\resources\start.js
 */
// nekyRet.watchApi('a', function (data) {
//     console.log('a')
//     console.log(data)
// })
// nekyRet.setData({
//     uid: 123
// })
// nekyRet.watchRead(function () {
//     return {
//         a: 1,
//         b: 2
//     }


// })
zca = [];
zcb = [];
semih = 30 * 60000;
window.onload = initiation;

function initiation() {
    
    const request = new Request('http://localhost:8081/keys');
    getUsers();
    fetch(request)
        .then(
            function (res) {
                return res.json();
            }
        )
        .then(
            function (data) {
                collectionKeys = [];
                for (let key of data) {
                    collectionKeys[collectionKeys.length] = { params: [1, 1, 0], element: key };
                }
                enableFunc2(collectionKeys);
                
                func1.onclick = enableFunc1;
                func2.onclick = enableFunc2(collectionKeys);
                // console.log(collectionKeys[0]['element']);
            })
    function enableFunc1 () {
        func1 = document.querySelector('#func1');
        func1.setAttribute('checked', 'checked');
        nekyRet = nekyEeport.init({
            url: 'http://localhost:8081/keys',
            isCollect: true,    //是否是在收集待采集的keys
            collectionKeys: [],
        })
    }

    function enableFunc2 (collectionKeys) {
        func2 = document.querySelector('#func2');
        func2.setAttribute('checked', 'checked');
        nekyRet = nekyEeport.init({
            url: 'http://localhost:8081/click',
            isCollect: false,    //是否是在收集待采集的keys
            collectionKeys: collectionKeys,
        })
    }
}

function getUsers() {
    const myRequest = new Request('users');
    fetch(myRequest)
    .then(
            function (res) {
                return res.json();
            }
    )
    .then(
        function (data) {
            if (data.length == 0) {
                uid = setUid().toString(36);
                zca[zca.length] = uid;
                let body = {'uid':uid}
                let request = new Request('users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(body)
                });
                fetch(request)
                .then(
                    function (res) {
                        if (res.ok) {
                            getUsers();
                        }
                    }
                )
            } else {
                initUserSession(data);
            }
        }
    )
}

function initUserSession(data) {
    for (let user of data) {
        zca[zca.length] = user;
        sid = (new Date).getTime().toString();
        zcb[user] = [sid];
    }
    freshUserSession();
    u = data[0];
    s = zcb[u][0];
    session = document.getElementById(s).querySelector('.form-check-input');
    session.setAttribute('checked', 'checked');
    // console.log(session)
    setCookies(u, s);
}

function newUser() {
    uid = setUid().toString();
    sid = (new Date).getTime().toString();
    // console.log(uid, sid);
    let body = {'uid':uid}
    let request = new Request('users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(body)
    });
    fetch(request).then(
        function (res) {
            if (res.ok) {
                zca[zca.length] = uid;
                zcb[uid] = [sid];
                freshUserSession();
            }
        }
    )    
}

function newSession() {
    user = this.parentElement;
    while (user.getAttribute('class') != 'card') {
        user = user.parentElement;
    }
    uid = user.getAttribute('id');
    sid = (new Date).getTime().toString();
    // console.log(uid, sid);
    ses = zcb[uid];
    ses[ses.length] = sid;
    freshUserSession();

    // let body = {'uid':uid,'sid': sid}
    // let request = new Request('users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //         },
    //     body: JSON.stringify(body)
    // });
    // fetch(request).then(
    //     function (res) {
    //         if (res.ok) {
    //         }
    //     }
    // )
    
}

function freshUserSession() {
    for (let u of zca) {
        users = document.querySelector('#users');
        button = users.querySelector('#userBtn');
        userTmp = document.querySelector("#userTmp");
        nuser = users.querySelector('#'+u);
        if (nuser == undefined) {
            nuser = userTmp.cloneNode(true);
            nuser.style.removeProperty('display');
            nuser.setAttribute('id', u);
            s = 'User: ' + u; 
            // console.log(s)
            nuser.querySelector('.card-title.inline-block').innerHTML = s;
            button.insertAdjacentElement('beforeBegin', nuser);
            newSessionBtn = nuser.querySelector('#newSessionBtn');
            // console.log(this);
            newSessionBtn.onclick = newSession;        
        }
        // console.log(nuser);

        sessions = nuser.querySelector('#sessions');
        sessionTmp = document.querySelector("#sessionTmp");
        for (let s of zcb[u]) {
            // nsession = sessions.querySelector('#'+s);
            nsession = document.getElementById(s);
            if (nsession == undefined) {
                nsession = sessionTmp.cloneNode(true);
                nsession.style.removeProperty('display');
                nsession.setAttribute('id', s);
                nsession.lastChild.nodeValue = 'Session:' + s;
                sessions.appendChild(nsession);                
            }
            radio = nsession.querySelector('.form-check-input');
            radio.onclick = function () {
                p = this.parentElement;
                let uid,sid
                while (p.getAttribute('class') != 'card') {
                    if (p.getAttribute('class') == 'form-check') {
                        sid = p.getAttribute('id');
                    }
                    p = p.parentElement;
                }
                uid = p.getAttribute('id');
                this.setAttribute('checked','checked');
                setCookies(uid, sid);
            }
        }
    }
}
//生成用户ID
function setUid() {
    return ((new Date).getTime().toString(36) + ("" + Math.random()).slice(- 8).toString(36).substr(2, 5))
}

function setCookies(zca,zcb) {

    let _win = window || null;
    let _doc = _win.document;

    function setCookie(key, val, time) {
        time = time || 0;
        let date = new Date();
        date.setTime(date.getTime() + time);
        _doc.cookie = key + '=' + escape(val) + ';path=/;expires=' + date.toGMTString();
    }
    setCookie('_zca', zca, semih);
    setCookie('_zcb', zcb, semih);
}