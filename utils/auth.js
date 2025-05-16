// auth.js
// 用户认证相关工具函数

// 存储用户信息到本地缓存
const saveUserInfo = (userInfo) => {
  try {
    wx.setStorageSync('userInfo', userInfo);
    return true;
  } catch (e) {
    console.error('保存用户信息失败', e);
    return false;
  }
};

// 获取本地缓存的用户信息
const getUserInfo = () => {
  try {
    return wx.getStorageSync('userInfo') || null;
  } catch (e) {
    console.error('获取用户信息失败', e);
    return null;
  }
};

// 清除用户信息（退出登录）
const clearUserInfo = () => {
  try {
    wx.removeStorageSync('userInfo');
    return true;
  } catch (e) {
    console.error('清除用户信息失败', e);
    return false;
  }
};

// 检查用户是否已登录
const isLoggedIn = () => {
  return !!getUserInfo();
};

// 模拟用户注册
const register = (username, password, phoneNumber) => {
  return new Promise((resolve, reject) => {
    try {
      // 在实际应用中，这里应该是与后端API通信的代码
      // 这里为了演示，我们只是将用户信息存储在本地
      
      // 检查用户是否已存在
      const allUsers = wx.getStorageSync('allUsers') || [];
      const userExists = allUsers.some(user => user.username === username);
      
      if (userExists) {
        reject({ message: '用户名已存在' });
        return;
      }
      
      // 创建新用户
      const newUser = { 
        id: Date.now().toString(),
        username, 
        password, // 注意：实际应用中，不应该明文存储密码
        phoneNumber,
        registerTime: new Date().toISOString()
      };
      
      // 保存到用户列表
      allUsers.push(newUser);
      wx.setStorageSync('allUsers', allUsers);
      
      // 保存当前用户信息（模拟登录）
      const userInfo = {
        id: newUser.id,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber
      };
      saveUserInfo(userInfo);
      
      resolve(userInfo);
    } catch (e) {
      reject({ message: '注册失败', error: e });
    }
  });
};

// 模拟用户登录
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      // 在实际应用中，这里应该是与后端API通信的代码
      const allUsers = wx.getStorageSync('allUsers') || [];
      const user = allUsers.find(u => u.username === username && u.password === password);
      
      if (!user) {
        reject({ message: '用户名或密码错误' });
        return;
      }
      
      // 登录成功，保存用户信息
      const userInfo = {
        id: user.id,
        username: user.username,
        phoneNumber: user.phoneNumber
      };
      saveUserInfo(userInfo);
      
      resolve(userInfo);
    } catch (e) {
      reject({ message: '登录失败', error: e });
    }
  });
};

module.exports = {
  saveUserInfo,
  getUserInfo,
  clearUserInfo,
  isLoggedIn,
  register,
  login
}; 