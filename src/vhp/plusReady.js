/**
 * [plusReady]
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
export function plusReady(fn) {
    if (window.plus) {
        fn();
    } else {
        document.addEventListener("plusready", fn, false);
    }
    return this;
}