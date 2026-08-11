document.querySelectorAll('.triple-quote').forEach(function (el) {
    if (el.classList.length > 1) {
        hljs.highlightElement(el, { language: el.classList[1] });
    } else {
        hljs.highlightElement(el);
    }
    el.classList.remove('hljs');
});
