"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const getCurrentFilePath_1 = require("./getCurrentFilePath");
const shaderPuzzleWeb_1 = require("./shaderPuzzleWeb");
const shaderPuzzleCompletion_1 = require("./shaderPuzzleCompletion");
function activate(context) {
    console.log('Congratulations, your extension "shader-puzzle-plugins" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('extension.StartShaderPuzzleTool', function () {
        vscode.window.showInformationMessage('shader puzzle tool is now activated!');
    }));
    new getCurrentFilePath_1.GetCurrentFilePath(context); // get current file path
    new shaderPuzzleWeb_1.OpenShaderPuzzleWeb(context); // open shader puzzle web
    new shaderPuzzleCompletion_1.ShaderPuzzleCompletion(context); // shader puzzle completion
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=Extension.js.map