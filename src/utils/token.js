// 存储token
export const setToken = token => {
  return localStorage.setItem("TOKEN", token);
};

// 读取token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

//清除本地存储的token
export const removeToken = () => {
  return localStorage.removeItem("TOKEN");
};
