/**
 * 小于10补0
 * @param  {[number]} num [description]
 * @return {[type]}     [description]
 */
function padZero(num) {
  return num > 9 ? num : `0${num}`;
}
/**
 * 本地时间格式转换 YYYY-MM-DD hh:mm:ss
 * @param  {[date]} date [new Date()创建的日期]
 * @return {[string]}    [格式化的日期字符串]
 */
function localDateFormat(date) {
  const YYYY = date.getFullYear();
  const MM = padZero(date.getMonth() + 1);
  const DD = padZero(date.getDate());
  const hh = padZero(date.getHours());
  const mm = padZero(date.getMinutes());
  const ss = padZero(date.getSeconds());
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  /**
   * UTC时间格式转换 YYYY-MM-DD hh:mm:ss
   * @param  {[date]} date [new Date()创建的日期]
   * @return {[string]}    [格式化的日期字符串]
   */
  function utcDateFormat(date) {
    const YYYY = date.getUTCFullYear();
    const MM = padZero(date.getUTCMonth() + 1);
    const DD = padZero(date.getUTCDate());
    const hh = padZero(date.getUTCHours());
    const mm = padZero(date.getUTCMinutes());
    const ss = padZero(date.getUTCSeconds());
    return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  }
  /**
   * 获取UTC时间 2019-07-04 00:00:00
   * @param  {[date]}     date    [new Date()创建的日期]
   * @param  {[boolean]}  unix    [是否返回时间戳]
   * @return {[string | number]}  [转换后的时间或时间戳]
   */
  function toUTCTimeOrStamp(date, unix) {
    // 获取时区差
    const localOffset = new Date().getTimezoneOffset() * 60 * 1000;
    // 获取本地时间戳
    const localTimeStamp = new Date(date).getTime();
    // 计算UTC时间戳 LT = UTC + 时区差
    const utcTimeStamp = localTimeStamp - localOffset;
    // 计算UTC时间
    const utcTime = new Date(utcTimeStamp).toISOString();

    return unix ? utcTimeStamp : utcTime;
  }
  toUTCTimeOrStamp("2019-07-04 00:00:00", true); // 1562198400000
  toUTCTimeOrStamp("2019-07-04 00:00:00"); // "2019-07-04T00:00:00.000Z"

  /**
   * 获取样式
   */
  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  }

  /**
   * 用getStyle函数获取、设置样式Ï
   */
  function css(obj, attr, value) {
    if (arguments.length == 2) //获取
    {
      return getStyle(obj, attr);
    } else if (arguments.length == 3) //设置
    {
      obj.style[attr] = value;
    }
  }

  /**
   * 选择类
   */
  function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];

    for (var i = 0; i < aEle.length; i++) {
      if (aEle[i].className == sClass) {
        aResult.push(aEle[i]);
      }
    }
    return aResult;
  }

  /**
   * 事件绑定
   */
  function myAddEvent(obj, sEv, fn) {
    if (obj.attachEvent) {
      obj.attachEvent('on' + sEv, function () {
        fn.call(obj);
      });
    } else {
      obj.addEventListener(sEv, fn, false);
    }
  }

  /**
   * 验证邮箱.
   * @param 邮箱value
   * @return true or false
   */
  function validateEmail(varr) {
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    var Expression = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var objExp = new RegExp(Expression);
    if (objExp.test(varr) == true) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 验证手机号码.
   * @param varr 手机号码
   * @return true or false
   */
  function validatePhone(varr) {
    var reg = /^(1[0-9]{10})$/;
    if (reg.test(varr)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Local Storage 记忆登录邮箱
   *
   * $('#loginEmail').val(localStorage.emailname);
   */
  function saveEmailName() {
    var emailname = $('#loginEmail') getElementbyId('').val();
    localStorage.emailname = emailname;
  }

  /**
   * 回车键切换焦点
   * 登录
   */
  $('#loginEmail').on('keydown', function (e) {
    if (e.keyCode == 13 && $('#loginEmail').val()) {
      $('#loginPwd').focus();
    }
  });
  $('#loginPwd').on('keydown', function (e) {
    if (e.keyCode == 13 && $('#loginPwd').val()) {
      $('#btnLogin').focus();
    }
  });

  /**
   * 设为首页
   */
  function SetHome(obj, url) {
    try {
      obj.style.behavior = 'url(#default#homepage)';
      obj.setHomePage(url);
    } catch (e) {
      if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
          alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
        }
      } else {
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
      }
    }
  }

  /**
   * 加入收藏
   */
  function AddFavorite(title, url) {
    try {
      window.external.addFavorite(url, title);
    } catch (e) {
      try {
        window.sidebar.addPanel(title, url, "");
      } catch (e) {
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请进入新网站后使用Ctrl+D进行添加");
      }
    }
  }