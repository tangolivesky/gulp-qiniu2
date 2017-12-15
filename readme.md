
## Install

```
$ npm install gulp-qiniu2 --save-dev
```

## Usage

```js
const gulp = require('gulp');
const qiniu = require('gulp-qiniu');

gulp.task('default', () =>
    gulp.src(['dist/**/*.mp3'])
    .pipe(qiniu({
        ACCESS_KEY:'6w2yg1wEpZx7tZ_6HSffYKa8r************',
        SECRET_KEY:'i8Fi6FCE_tKj0mkLFkwFDFv*********',
        BUCKET:'test',
        PATH:'projectname'
    }))
);
```

## 参数

1. ACCESS_KEY   七牛对象存储 ACCESS_KEY
2. SECRET_KEY   七牛对象存储 SECRET_KEY
3. BUCKET       七牛对象存储 bucket存储空间名称
4. PATH         自定义的存储的路径


## 说明

本插件只做七牛上传使用，使用生成完的文件路径对应七牛目标路径

如：
原路径目录
audio\e1\1.1.mp3

最后上传到七牛的路径为
http://ozvj7mm32.bkt.clouddn.com/projectname/audio/e1/1.1.mp3

如：(生成文件为hash文件)

audio\SDF234LK234JL243HOIUWRE90.mp3

最后上传到七牛的路径为
http://ozvj7mm32.bkt.clouddn.com/projectname/audio/SDF234LK234JL243HOIUWRE90.mp3


## 项目地址
https://github.com/tangolivesky/gulp-qiniu2
