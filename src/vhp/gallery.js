    /**
     * 选择图片
     * @param {Function} fn 图片选择回调 (err, [...imgs])
     * @param {Number} more 图片最大选择数量（仅在选择相册时有效）
     */
    var getGallery = function (fn, more) {

        plus.nativeUI.actionSheet({

            cancel: "取消",
            buttons: [{
                title: "照相机",
                style: "destructive"
            }, {
                title: "相册"
            }]
        }, function (e) {
            var index = e.index;
            if (index === 0) {
                return;
            }
            index--;
            if (index === 0) {
                var cmr = plus.camera.getCamera();
                cmr.captureImage(function (p) {
                    plus.io.resolveLocalFileSystemURL(p, function (entry) {
                        var img_name = entry.name;
                        var img_path = entry.toLocalURL();
                        fn && fn(null, [img_path], [img_name]);
                    }, function (e) {
                        fn && fn(e.message);
                    });
                }, function (e) {
                    fn && fn(e.message);
                }, {
                    filename: '_doc/camera/',
                    index: 1
                });
            } else if (index === 1) {
                plus.gallery.pick(function (data) {
                    if (more) {
                        var imgs = [];
                        for (var a in data.files) {
                            imgs.push(data.files[a]);
                        }
                        data = imgs;
                    }
                    fn && fn(null, data);
                }, function (e) {
                    fn && fn(e.message);
                }, {
                    filter: "image",
                    multiple: !!more,
                    system: false,
                    maximum: more,
                    onmaxed: function () {
                        plus.nativeUI.toast('您最多能选择' + more + '张');
                    }
                });
            }
        });

    };


 export {getGallery}   