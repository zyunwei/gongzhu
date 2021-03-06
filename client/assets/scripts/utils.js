const utils = {};

utils.cloneObj = function (obj) {
    let newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (let key in obj) {
        let val = obj[key];
        newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
};

utils.messageBox = function (title, text, callback) {
    let currentScene = cc.director.getScene();
    if (currentScene == null) {
        return;
    }
    let oldMsgBox = currentScene.getChildByName("messageBox");
    if (oldMsgBox != null) {
        let msgBox = oldMsgBox.getComponent("messageBox");
        msgBox.init(title, text, callback);
        return;
    }

    let resUrl = "prefabs/messageBox";
    cc.loader.loadRes(resUrl, function (err, prefab) {
        if (err) {
            return;
        }
        let msgBoxPrefab = cc.instantiate(prefab);
        let msgBox = msgBoxPrefab.getComponent("messageBox");
        msgBox.init(title, text, callback);
        try {
            currentScene.addChild(msgBoxPrefab);
        }
        catch (err) {
            msgBoxPrefab.destroy();
        }
    });
};

utils.resultBox = function (results, callback) {
    let currentScene = cc.director.getScene();
    if (currentScene == null) {
        return;
    }
    let oldMsgBox = currentScene.getChildByName("resultBox");
    if (oldMsgBox != null) {
        let resultBox = oldMsgBox.getComponent("resultBox");
        resultBox.init(results, callback);
        return;
    }

    let resUrl = "prefabs/resultBox";
    cc.loader.loadRes(resUrl, function (err, prefab) {
        if (err) {
            return;
        }
        let rstBoxPrefab = cc.instantiate(prefab);
        let rstBox = rstBoxPrefab.getComponent("resultBox");
        rstBox.init(results, callback);
        try {
            currentScene.addChild(rstBoxPrefab);
        }
        catch (err) {
            rstBoxPrefab.destroy();
        }
    });
};


export default utils;