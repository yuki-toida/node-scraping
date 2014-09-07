var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    // views に設定されたテンプレートファイルの指定、テンプレートエンジンに渡すパラメータオブジェクトを指定する
    res.render('index'
        , { title: 'Express' }
        
    );
});

module.exports = router;
