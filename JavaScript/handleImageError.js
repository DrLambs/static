// 「前端进阶」如何优雅的处理图片异常
// https://juejin.im/post/5d3e4304f265da1b8608cee5?utm_source=gold_browser_extension

window.addEventListener('error', function (e) {
  let target = e.target, // 当前dom节点
    tagName = target.tagName,
    times = Number(target.dataset.times) || 0, // 以失败的次数，默认为0
    allTimes = 3; // 总失败次数，此时设定为3
  // 当前异常是由图片加载异常引起的
  if (tagName.toUpperCase() === 'IMG') {
    if (times >= allTimes) {
      target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    } else {
      target.dataset.times = times + 1;
      target.src = '//xxx.xxx.xxx/default.jpg';
    }
  }
}, true)