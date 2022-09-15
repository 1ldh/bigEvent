$(function() {
    // 获取用户基本信息
    getUserInfo()
    // 实现退出功能
    $('#btnLogout').on('click', function() {
        // 弹出层
        layer.confirm('此操作将退出登录, 是否继续?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 清空本地存储中 token 值
        localStorage.removeItem('token')
        // 跳转到登录页面
        location.href = '/login.html'

        // 关闭 confirm 询问框
        layer.close(index);
});
    })
})

let layer = layui.layer
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 设置请求头 携带 token
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}
// 渲染用户的头像
function renderAvatar (user) {
    // 用户名称
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎  ${name}`)
    // 用户头像
    if (user.user_pic === null) {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    } else {
        $('.text-avatar').hide()
        $('.layui-nav-img').prop('src', user.user_pic).show()
    }
}