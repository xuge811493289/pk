##Using Print.js

There are four print document types available: 'pdf', 'html', 'image' and 'json'.

The default type is 'pdf'.

It's basic usage is to call printJS() and just pass in a PDF document url: 
# printJS('docs/PrintJS.pdf').

For image files, the idea is the same, but you need to pass a second argument: 
#printJS('images/PrintJS.jpg', 'image').

To print HTML elements, in a similar way, pass in the element id and type: 
#printJS('myElementId', 'html').

When printing JSON data, pass in the data, type and the data properties that you want to print: 
# printJS({printable: myData, type: 'json', properties: ['prop1', 'prop2', 'prop3']});

#Configuration

Print.js will accept an object as argument, where you can configure some options:

Argument | Default Value | Description

printable | null | Document source: pdf or image url, html element id or json data object.

type 'pdf' Document type.
header null Optional header to be used with HTML, Image or JSON printing. It will be placed on the top of the page.
headerStyle 'font-weight: 300;' Optional header style to be applied to the header text.
maxWidth 800 Max document width in pixels. Many people would recommend this to be around 600px. We tested many prints with 800 and it fits well for us. Change this as you need.
font 'TimesNewRoman' Typeface used when printing HTML or JSON.
font_size '12pt' Font size used when printing HTML or JSON.
honorMarginPadding true This is used to keep or remove padding and margin from elements that are being printed. Sometimes these styling settings are great on screen but it                             looks pretty bad when printing. You can remove it by setting this to false.
honorColor false To print text in color, set this property to true. By default all text will be printed in black.
properties null Used when printing JSON. These are the object property names.
gridHeaderStyle 'font-weight: bold;' Optional style for the grid header when printing JSON data.
gridStyle 'border: 1px solid lightgray; margin-bottom: -1px;' Optional style for the grid rows when printing JSON data.
showModal null Enable this option to show user feedback when retrieving or processing large PDF files.
modalMessage 'Retrieving Document...' Message displayed to users when showModal is set to true.
onLoadingStart function(){} Function to be executed when PDF is being loaded
onLoadingEnd function(){} Function to be executed after PDF has loaded
documentTitle 'Document' When printing html, image or json, this will be shown as the document title. It will also be the name of the document, if the user tries to save the                               print job to a pdf file.