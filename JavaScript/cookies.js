function getCookie() {
  const cookies = {};
  // cookie 字符串去除空格
  const reg = /\s/g;
  const cookieString = document.cookie.replace(reg, '');
  // cookie 数组
  const cookieArray = cookieString.split(';');
  // 将 cookie 转换为 {name: value} 形式
  cookieArray.forEach(item => {
    const itemArray = item.split('=');
    const [name, value] = itemArray;
    cookies[name] = value;
  });
  return cookies;
}

// 导出 Cookies 对象
export const Cookies = {
  cookies: getCookie(),
  get(name) {
    this.cookies = getCookie();
    return this.cookies[name];
  },
  set(name, value) {
    document.cookie = `${name}=${value}`;
    this.cookies = getCookie();
  },
};
