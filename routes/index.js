var express = require('express');
var router = express.Router();
var dbModel = require('../models/mysql');
var arrayUtil = require('../models/array_util'); 

router.get('/', function (req, res) {
	dbModel.getPool(function(err, con) {
            con.query('SELECT * FROM ScrapeInfo ORDER BY AddTime DESC, Category', function(err, result) {
			if (err) throw err;
			con.release();

            // views�ɐݒ肳�ꂽ�e���v���[�g�t�@�C���w��A�n���p�����[�^�I�u�W�F�N�g���w��
            res.render('index', {
                    title: 'Top',
                    data: result
            });
		});
	});
});

module.exports = router;
