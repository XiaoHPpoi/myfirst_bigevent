$(function() {
    var layer =layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    //上传按钮绑定事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    $('#file').on('change', function(e) {
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片！')
        }

        //拿到用户选择的文件
        var file = e.target.files[0]
        //将文件转化为路径
        var imgURL = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image
            .cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)
    })

    $('#btnUpload').on('click', function(e) {
        var dataURL = $image.cropper('getCroppedCanvas', {
            //c创建一个Canvas画布
            width: 100,
            heigeht: 100
        })
        .toDataURL('image/png')//将Canvas画布上的内容，转化为base64格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                return layer.msg('更换头像失败！')
                }
               layer.msg('更换头像成功！') 
               window.parent.getUserInfo()
            }
        })
    })
})