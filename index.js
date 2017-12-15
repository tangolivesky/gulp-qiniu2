'use strict';
const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');
const vinylFile = require('vinyl-file');
const revHash = require('rev-hash');
const qiniu = require('qiniu');
const Promise = require('promise');
const fs = require('fs');
const fileExtension = require('file-extension');


function relPath(base, filePath) {
	filePath = filePath.replace(/\\/g, '/');
	base = base.replace(/\\/g, '/');

	if (filePath.indexOf(base) !== 0) {
		return filePath;
	}

	const newPath = filePath.slice(base.length);

	if (newPath[0] === '/') {
		return newPath.slice(1);
	}

	return newPath;
}


function getHashFileName(file){
	return revHash(file.contents)+'.'+fileExtension(file.path);
}


const plugin = (opts) => {

    console.log("开始上传");

	opts = Object.assign({},opts);

	var mac = new qiniu.auth.digest.Mac(opts.ACCESS_KEY,opts.SECRET_KEY);
	var config = new qiniu.conf.Config();

	return through.obj((file, enc, cb) => {

		const revisionedFile = relPath(path.resolve(file.cwd, file.base), path.resolve(file.cwd, file.path));
		const key = opts.PATH+'/'+revisionedFile;
		var bucket = opts.BUCKET;
		var options = {
			scope: bucket+':'+key,
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);
		var formUploader = new qiniu.form_up.FormUploader(config);
		const putExtra = new qiniu.form_up.PutExtra();


		formUploader.putFile(uploadToken, key,file.path, putExtra, (respErr, respBody,respInfo) => {

			if (respErr) {
				throw respErr;
				cb();
			}
			if (respInfo.statusCode == 200) {
				console.info(key+'____uploaded');
				cb();

			} else {
				console.log(respInfo.statusCode);
				console.log(respBody);
				cb();
			}

		});

	});

};


module.exports = plugin;
