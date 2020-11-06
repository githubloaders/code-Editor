/*load css */
var cssPath = ["js/codemirror/lib/codemirror.css",
    "js/codemirror/theme/darcula.css",
    "js/codemirror/theme/blackboard.css",
    "js/codemirror/addon/scroll/simplescrollbars.css"];
cssPath.forEach(function (url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
})


/*load js */
requirejs.config({
    baseUrl: 'js/codemirror',
    paths: {
        app: '../app'
    }
});




/*base template */
// var EitorUI = `
// <textarea id="HTMLEditor"><p>HTML</p></textarea>
// <textarea id = "CSSEditor" > body{ background-color: red;}</textarea > 
// <textarea id = "JSEditor" > alert("hi")</textarea> 
// <div id="output">
//     <iframe id="editorResult" frameBorder="0"></iframe>
//   </div>
//   <button id="getresult">Result</button>`;




requirejs(['lib/codemirror', 'mode/xml/xml', 'addon/edit/closetag', 'addon/scroll/simplescrollbars', 'mode/javascript/javascript', 'mode/css/css'],
    function (CodeMirror, xml, closetag) {



        /*append require HTML */
        // document.querySelector("[BIEditor]").innerHTML = EitorUI;


        var HTML_Editor = CodeMirror.fromTextArea(document.getElementById("HTMLEditor"), {
            mode: "xml",
            theme: "darcula",
            lineNumbers: true,
            autoCloseTags: true,
            scrollbarStyle: "overlay",
        })

        HTML_Editor.on("change", function (cm, change) {
            if (document.getElementById("autoUpdate").checked)
                editorUpdate();
        })


        var CSS_Editor = CodeMirror.fromTextArea(document.getElementById("CSSEditor"), {
            mode: 'css',
            theme: "darcula",
            lineNumbers: true,
            scrollbarStyle: "overlay"
        })

        CSS_Editor.on("change", function (cm, change) {
            if (document.getElementById("autoUpdate").checked)
                editorUpdate();
        })


        var JS_Editor = CodeMirror.fromTextArea(document.getElementById("JSEditor"), {
            mode: 'javascript',
            theme: "darcula",
            lineNumbers: true,
            scrollbarStyle: "overlay"
        })

        JS_Editor.on("change", function (cm, change) {
            if (document.getElementById("autoUpdate").checked)
                editorUpdate();
        })



        function editorUpdate() {
            var res = document.getElementById("editorResult").contentWindow.document;
            res.open()
            res.write('<link rel="stylesheet" href="css/iframeStyle.css"></link>')
            res.write('<style>' + CSS_Editor.getValue() + '</style>')
            res.write('<script>' + JS_Editor.getValue() + '</script>')
            res.write(HTML_Editor.getValue())
            res.close();
        }


        //click on Result button
        document.getElementById("getresult").addEventListener("click", function () {
            editorUpdate();
        })

        editorUpdate();

    });