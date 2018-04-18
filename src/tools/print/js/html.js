import { collectStyles, loopNodesCollectStyles, addWrapper, addHeader } from './functions'
import Print from './print'

import elements from "@/theme/element.js";
import theme from "@/theme/theme.js";
import base from "@/theme/base.js";

export default {
    print: (params, printFrame) => {
        var str = `${params.htmlStyle}`,
            styles = document.querySelectorAll("style,link");
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].innerHTML;
        }
        params.htmlStyle = str + elements + theme + base + (params.noPrint ? params.noPrint : ".no-print") + "{display:none;}";
        // console.log("====================", str);

        // Get HTML printable element
        let printElement = document.getElementById(params.printable)

        // Check if element exists
        if (!printElement) {
            window.console.error('Invalid HTML element id: ' + params.printable)

            return false
        }

        // Make a copy of the printElement to prevent DOM changes
        let printableElement = document.createElement('div')
        printableElement.appendChild(printElement.cloneNode(true))

        // Add cloned element to DOM, to have DOM element methods available. It will also be easier to colect styles
        printableElement.setAttribute('style', 'display:none;')
        printableElement.setAttribute('id', 'printJS-html')
        printElement.parentNode.appendChild(printableElement)

        // Update printableElement variable with newly created DOM element
        printableElement = document.getElementById('printJS-html')

        // Get main element styling
        printableElement.setAttribute('style', collectStyles(printableElement, params) + 'margin:0 !important;')

        // Get all children elements
        let elements = printableElement.children

        // Get styles for all children elements
        loopNodesCollectStyles(elements, params)

        // Add header if any
        if (params.header) {
            addHeader(printableElement, params.header, params.headerStyle)
        }

        // Remove DOM printableElement
        printableElement.parentNode.removeChild(printableElement)

        // Store html data
        params.htmlData = addWrapper(printableElement.innerHTML, params)

        // Print html element contents
        Print.send(params, printFrame)
    }
}