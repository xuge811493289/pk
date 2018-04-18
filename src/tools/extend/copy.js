export default (dom, type) => {
    const range = document.createRange();
    if (type == 'text') {
        range.toString(dom);
    } else {
        range.selectNode(dom);
    }
    const selection = window.getSelection();
    if (selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
}