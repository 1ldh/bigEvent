$(function() {
    // 点击去注册按钮显示注册表单
    $('#link_reg').on('click', function() {
        $('.login').hide()
        $('.req').show()
    })
    // 点击去登录按钮显示登录表单
    $('#link_login').on('click', function() {
        $('.login').show()
        $('.req').hide()
    })
    // 表单验证
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 自定义一个 pwd 校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'], 
        // 检验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            let pwd = $('.req [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#requser').on('submit', function(e) {
        e.preventDefault()
        // 发起 post 请求
        let data = {username: $('.req [name=username]').val(),password: $('.req [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！请登录')
            // 成功后 使用自动触发行为跳转到登录
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#loginuser').submit(function(e) {
        e.preventDefault()
        // 发起 post 请求
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 登录成功
                layer.msg('登录成功')
                // 将 token 的值存入本地存储中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})