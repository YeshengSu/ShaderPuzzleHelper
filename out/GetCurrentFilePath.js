"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class GetCurrentFilePath {
    constructor(context) {
        context.subscriptions.push(vscode.commands.registerCommand('extension.GetCurrentFilePath', function (uri) {
            vscode.window.showInformationMessage(`file path ：${uri ? uri.path : 'None'}`);
        }));
    }
}
exports.GetCurrentFilePath = GetCurrentFilePath;
//# sourceMappingURL=getCurrentFilePath.js.map