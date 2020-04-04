(function(root) {
    var docEl = document.documentElement,
    timer = null,
    width, last;

    function changeRem() {
        width = docEl.getBoundingClientRect().width;
        if (last === width) { return; }
        last = width;
        root.rem = (width / 750) * 100;
        if (/ZTE U930_TD/.test(navigator.userAgent)) {
            root.rem = root.rem * 1.13;
        }
        // 适配最大宽度720
        root.rem > 100 ? root.rem = 100 : root.rem = root.rem;
        docEl.style.fontSize = root.rem + 'px';
    }
    changeRem();
    root.addEventListener('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(changeRem, 300);
    });
    root.addEventListener('orientationchange', function() {
        clearTimeout(timer);
        timer = setTimeout(changeRem, 300);
    });
})(window, undefined);