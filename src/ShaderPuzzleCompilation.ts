import * as vscode from 'vscode'; 

export var CreateCompilation = function(context: vscode.ExtensionContext){
    context.subscriptions.push(vscode.commands.registerCommand('extension.Compilation.Compile', function () {
        vscode.window.showInformationMessage('shader puzzle is now compiled !');
    }));
};