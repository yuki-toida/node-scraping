var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    // views �ɐݒ肳�ꂽ�e���v���[�g�t�@�C���̎w��A�e���v���[�g�G���W���ɓn���p�����[�^�I�u�W�F�N�g���w�肷��
    res.render('index'
        , { title: 'Express' }
        
    );
});

module.exports = router;
