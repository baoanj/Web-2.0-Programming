var http = require('http');
var url = require('url');
var path = require('path');
var queryString = require('querystring');
var pug = require('pug');
var fs = require('fs');
var mime = require('./src/js/mime').types;
var validator = require('./src/js/validator');
var api = require('./src/js/api');
var users_data_file = "User.json"
var sign_in_template = './src/pug/sign_in.pug';
var details_template = './src/pug/details.pug';

var users = getUsersData();

http.createServer(function(req, res) {
  var filepath = '.' + req.url;
  var ext = getExtname(filepath)
  if (mime.hasOwnProperty(ext)) {
    sendFile(res, filepath, mime[ext]);
  } else {
    switch (req.url) {
      case '/src/js/api/validate-unique':
        api.validateUnique(users, req, res);
        break;
      default:
        req.method === 'POST' ? registUser(req, res) : sendHtml(req, res);
    }
  }
}).listen(8000);

console.log("Signup server is listening at 8000");

// 获取已注册的所有用户
function getUsersData() {
  var userData;
  try {
    userData = fs.readFileSync(users_data_file);
  } catch (e) {
    console.log("ReadFile Error: ", e);
    userData = [];
  }
  if (userData.length == 0) return [];
  else return JSON.parse(userData);
}

// 获取静态资源文件后缀名
function getExtname(filepath) {
  var ext = path.extname(filepath);
  return ext ? ext.slice(1) : 'unknown';
}

// 加载静态资源文件
function sendFile(res, filepath, mime) {
  try {
    res.writeHead(200, { "Content-Type": mime });
    res.end(fs.readFileSync(filepath));
  } catch (e) {
    console.log("ReadFile Error: ", e);
    res.end();
  }
}

// 注册用户
function registUser(req, res) {
  var post = "";
  req.on("data", function(chunk) {
    if (chunk != undefined) {
      post += chunk;
    }
  });
  req.on("end", function(chunk) {
    try {
      var user = queryString.parse(post);
      checkUser(user);
      users.push(user);
      writeDataToFile(users_data_file, JSON.stringify(users))
      res.writeHead(301, { Location: '?username=' + user.username });
      res.end();
    } catch (error) {
      console.log("CheckUser Error: ", error);
      showSignup(res, user, JSON.parse(error.message));
    }
  });
}

// 将数据写进文件
function writeDataToFile(file, data) {
  try {
    fs.writeFileSync(file, data);
  } catch (e) {
    console.log("WriteFile Error: ", e);
  }
}

// 检查各项数据的格式是否正确以及是否已存在
function checkUser(user) {
  var errorMessages = {};
  for (var key in user) {
    if (!validator.isFieldValid(key, user[key])) errorMessages[key] = validator.getErrorMessage1(key);
    if (!validator.isAttrValueUnique(users, user, key))
      errorMessages[key] = validator.getErrorMessage2(key);
  }
  if (Object.keys(errorMessages).length > 0) throw new Error(JSON.stringify(errorMessages));
}

// 根据路由显示相应页面
function sendHtml(req, res) {
  var username = queryString.parse(url.parse(req.url).query).username;
  if (req.url == '/') {
    showSignup(res, {}, {});
  } else if (!username) {
    notFound(res);
  } else if (!isRegistedUser(username)) {
    showSignup(res, { username: username }, {});
  } else {
    showDetail(res, username);
  }
}

// 检验用户名是否已注册
function isRegistedUser(username) {
  return !!findUserByUsername(username);
}

// 显示注册页面
function showSignup(res, user, error) {
  showHtml(res, sign_in_template, { user: user, error: error });
}

// 显示用户详情页
function showDetail(res, username) {
  showHtml(res, details_template, findUserByUsername(username));
}

// 渲染模板引擎，加载页面
function showHtml(res, template, data) {
  templateRenderFile(res, template, data);
}

// 通过用户名得到整个用户对象
function findUserByUsername(username) {
  for (var i in users) {
    if (users[i].username === username) {
      return users[i];
    }
  }
  return null;
}

// 渲染模板引擎，加载页面
function templateRenderFile(res, template, data) {
  pug.renderFile(template, data, function(err, html) {
    if (err) {
      notFound(res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    }
  });
}

// 404 Not Found Tips
function notFound(res) {
  res.writeHead(404, 'not found', { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
}
