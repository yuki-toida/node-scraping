var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();

// views はテンプレートファイルの格納ディレクトリを指定
// __dirname変数は実行中のモジュールが含まれるディレクトリを文字列で格納する
// path.joinは引き数で指定したディレクトリを連結するメソッド
// app.js が格納されているディレクトリ内の viewsディレクトリを指定している
app.set('views', path.join(__dirname, 'views'));

// view engine の指定
app.set('view engine', 'ejs');

// /faviconへのリクエスト受信時に指定されたアイコンファイルを送信する
app.use(favicon(__dirname + '/public/favicon.ico'));

// リクエスト受信時に、その情報を指定されたストリームやコンソールに出力する
app.use(logger('dev'));

// json、form、form-data 等の形式で送信されたリクエストボディを解析してreqオブジェクトのbodyプロパティに格納
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// express.static は指定されたディレクトリ配下のファイルを静的に送信する設定
// app.js が格納されているディレクトリ内の publicディレクトリを指定している
app.use(express.static(path.join(__dirname, 'public')));

// リクエストURLに対応する処理を実行する
app.use('/', require('./routes/index'));
//app.use('/detail', require('./routes/detail'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', config.port);
var server = app.listen(app.get('port'), function() {
  console.log('listening on ' + server.address().port);
});

