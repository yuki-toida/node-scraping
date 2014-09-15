var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();

// views �̓e���v���[�g�t�@�C���̊i�[�f�B���N�g�����w��
// __dirname�ϐ��͎��s���̃��W���[�����܂܂��f�B���N�g���𕶎���Ŋi�[����
// path.join�͈������Ŏw�肵���f�B���N�g����A�����郁�\�b�h
// app.js ���i�[����Ă���f�B���N�g������ views�f�B���N�g�����w�肵�Ă���
app.set('views', path.join(__dirname, 'views'));

// view engine �̎w��
app.set('view engine', 'ejs');

// /favicon�ւ̃��N�G�X�g��M���Ɏw�肳�ꂽ�A�C�R���t�@�C���𑗐M����
app.use(favicon(__dirname + '/public/favicon.ico'));

// ���N�G�X�g��M���ɁA���̏����w�肳�ꂽ�X�g���[����R���\�[���ɏo�͂���
app.use(logger('dev'));

// json�Aform�Aform-data ���̌`���ő��M���ꂽ���N�G�X�g�{�f�B����͂���req�I�u�W�F�N�g��body�v���p�e�B�Ɋi�[
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// express.static �͎w�肳�ꂽ�f�B���N�g���z���̃t�@�C����ÓI�ɑ��M����ݒ�
// app.js ���i�[����Ă���f�B���N�g������ public�f�B���N�g�����w�肵�Ă���
app.use(express.static(path.join(__dirname, 'public')));

// ���N�G�X�gURL�ɑΉ����鏈�������s����
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

