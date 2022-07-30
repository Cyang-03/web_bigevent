let link_reg = document.querySelector('#link_reg')
let link_login = document.querySelector('#link_login')
let login_box = document.querySelector('.login-box')
// 获取注册区域
let reg_box = document.querySelector('.reg-box')
// 获取注册密码框
let rpwd = document.querySelector('.reg-box #password')
// 获取注册的用户输入框
let username = document.querySelector('.reg-box #username')
// 获取注册表单页面
let form_reg = document.querySelector('#form-reg')

// 绑定事件
// 点击去注册，跳转到注册页面
link_reg.addEventListener('click', function() {
    login_box.style.display = 'none'
    reg_box.style.display = 'block'
})
// 点击去登录，跳转到登录页面
link_login.addEventListener('click', function() {
    reg_box.style.display = 'none'
    login_box.style.display = 'block'
})


// 从layui中获取form对象
var form = layui.form
var layer = layui.layer

form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位,且不能出现空格'
      ],
    repwd: function (value) {
        
        if( rpwd.value !== value ) {
            return "两次密码不一致"
        }
    }
})
let un = username.value
let pw = rpwd.value
let params = new URLSearchParams()
params.append("username", un)
params.append("password", pw)

// // 注册表单的提交事件
// form_reg.addEventListener('submit', function(e) {
//     e.preventDefault()

//     // 发起请求
//     axios({
//         method: 'POST',
//         url: 'http://www.liulongbin.top:3007/api/reguser',
//         params,
//       }).then(function (res) {
//         if (res.status !== 0) {
//             return layer.msg(res.message)
//         }
//         layer.msg('注册成功,请登录')
//         link_login.click()
//       })
// })


  // 监听注册表单的提交事件
  $('#form-reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      link_login.click()
    })
  })


  // 监听登录表单提交事件
  $('#form-login').on('submit', function(e) {
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        // localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })