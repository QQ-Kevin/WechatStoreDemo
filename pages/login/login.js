const auth = require('../../utils/auth.js');

Page({
  data: {
    username: '',
    password: '',
    loading: false
  },

  onLoad() {
    // 如果已经登录，跳转到首页
    if (auth.isLoggedIn()) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  // 处理登录点击
  handleLogin() {
    const { username, password } = this.data;
    
    // 输入验证
    if (!username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ loading: true });
    
    // 登录逻辑
    auth.login(username, password)
      .then(userInfo => {
        this.setData({ loading: false });
        
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        
        // 登录成功后跳转到首页
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      })
      .catch(error => {
        this.setData({ loading: false });
        
        wx.showToast({
          title: error.message || '登录失败',
          icon: 'none'
        });
      });
  },
  
  // 跳转到注册页面
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
}); 