/* @Print.js
options.style
 */

import elements from '@/theme/element.js'
import theme from "@/theme/theme.js";
import base from "@/theme/base.js";
var Print = function(dom, options) {
    if (!(this instanceof Print)) return new Print(dom, options);
    this.options = this.extend({
        'noPrint': '.no-print'
    }, options);
    if ((typeof dom) === "string") {
        this.dom = document.querySelector(dom);
    } else {
        this.dom = dom;
    }
    this.init(options);
};

function addWrapper(htmlData, params) {
    let bodyStyle = 'font-family:' + params.font + ' !important; font-size: ' + params.font_size + ' !important; width:100%;'
    return '<div style="' + bodyStyle + '">' + htmlData + '</div>'
}

Print.prototype = {
    init: function(options) {
        let params = {
            printable: null,
            fallbackPrintable: null,
            type: "pdf",
            header: null,
            headerStyle: "font-weight: 300;",
            maxWidth: 800,
            font: "TimesNewRoman",
            font_size: "12pt",
            honorMarginPadding: true,
            honorColor: false,
            properties: null,
            gridHeaderStyle: "font-weight: bold;",
            gridStyle: "border: 1px solid lightgray; margin-bottom: -1px;",
            showModal: false,
            onLoadingStart: function() {},
            onLoadingEnd: function() {},
            modalMessage: "Retrieving Document...",
            frameId: "printJS",
            htmlData: "",
            htmlStyle: "",
            noPrint: "",
            documentTitle: "Document",
            ...options
        };
        var content = this.getStyle() + this.getHtml();
        this.writeIframe(content);
    },
    extend: function(obj, obj2) {
        for (var k in obj2) {
            obj[k] = obj2[k];
        }
        return obj;
    },

    getStyle: function() {
        var str = '',
            styles = document.querySelectorAll("style,link");
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].innerHTML;
        }
        str =
            "<style>" +
            str +
            elements +
            theme +
            base +
            (this.options.noPrint ? this.options.noPrint : ".no-print") +
            "{display:none;} </style>";

        return str;
    },

    getHtml: function() {
        return this.dom.innerHTML;
    },

    writeIframe: function(content) {
        var ifrm = document.getElementById('myIframe');
        if (ifrm) {
            document.body.removeChild(ifrm);
        }
        var w,
            doc,
            iframe = document.createElement("iframe"),
            f = document.body.appendChild(iframe);
        iframe.id = "myIframe";
        iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";

        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
        this.toPrint(w);

        // setTimeout(function() {
        //     document.body.removeChild(iframe);
        // }, 500);
    },

    toPrint: function(frameWindow) {
        try {
            setTimeout(function() {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand("print", false, null)) {
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        } catch (err) {
            console.log("err", err);
        }
    }
};
export default Print