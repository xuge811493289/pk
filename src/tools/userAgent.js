
import { MessageBox } from "element-ui";
export default ()=> {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    } //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
    ) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion < 9.0) {
            let h = new Vue().$createElement;
            MessageBox({
                title: "温馨提示",
                message: h("div", {
                    style: {
                        color: "#666",
                        fontSize: "12px",
                        cursor: "pointer",
                        "text-decoration": "underline"
                    },
                    domProps: {
                        innerHTML: "请使用IE 9.0及以上版本运行！推荐使用Chrome浏览器,点击下载"
                    },
                    on: {
                        click: () => {
                            window.open(
                                "https://www.baidu.com/link?url=kl85CNxIUaz2BTwYkr69U1fhq4OtmLFs3hw5LE_WywlQR6jmtxbGJ9MAQXMG06vj9QwYUITH1gDEYf-vEZJbHdzV83XFViEjB4t9I7wZZKW&wd=&eqid=a715fd21000235a900000005599a5811"
                            );
                        }
                    }
                }),
                beforeClose: (action, instance, done) => {
                    done();
                    MessageBox.close();
                    if (instance.$el) {
                        $(instance.$el)
                            .prev(".v-modal")
                            .hide()
                            .end()
                            .next(".v-modal")
                            .hide();
                    }
                },
                customClass: "sy-login-box",
                showConfirmButton: false,
                showCancelButton: false,
                closeOnPressEscape: false,
                closeOnClickModal: false
            }).then(action => { });
        }
        return "IE";
    }
}