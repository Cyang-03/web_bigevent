$(function() {
    getUserInfo()
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        header: {
        Authorization:localStorage.getItem('token') || '' 
        },
        success: function(res) {
            console.log(res)
        }
    })
}