(function() {
    "use strict";
    
    var PLUGIN_ID = require("./package.json").name;
    var MENU_ID = "fp";

    var _generator = null;


    function init(generator) {
        _generator = generator;
        _generator.addMenuItem(MENU_ID, "はじめてのプラグイン", true, false);
        _generator.onPhotoshopEvent("generatorMenuChanged", onGeneratorMenuChanged);

        // レイヤーを選択した、レイヤーに変更を加えたなど主に加工に関わる操作をした際に発行される  
        _generator.onPhotoshopEvent("imageChanged", onImageChanged);

        // 主にツールパレットでツールを変更した際に発行される
        _generator.onPhotoshopEvent("toolChanged", onToolChanged);

        // 選択しているPSDを切り替えた際に発行される
        _generator.onPhotoshopEvent("currentDocumentChanged", onCurrentDocumentChanged);
    }

    function onGeneratorMenuChanged(event) {
        var changedMenu = event.generatorMenuChanged;
        if (changedMenu.name === MENU_ID) {
            var menuState = _generator.getMenuState(changedMenu.name);
            _generator.toggleMenu(MENU_ID, menuState.enabled, !menuState.checked);
        }
    }

    function onImageChanged(event) {
        console.log("イメージが変更されました。");

        //_generator.evaluateJSXFile(this._photoshop._applicationPath + "/Plug-ins/Generator/first-plugin/selectedLayer.jsx").then(
        _generator.evaluateJSXFile("../../plugin/first-plugin/selectedLayer.jsx").then(
            function(result) {
                console.log(result);
            },
            function(error) {
                console.error(error);
            }
        );
    }

    function onToolChanged(event) {
        console.log("ツールが変更されました。");
        console.log(stringify(event));
    }

    function onCurrentDocumentChanged(event) {
        console.log("現在のドキュメントが変更されました。");
        console.log(stringify(event));
    }

    function stringify(object) {
        try {
            return JSON.stringify(object, null, "    ");
        } catch (e) {
            console.error(e);
        }
        return String(object);
    }

    exports.init = init;
}());
