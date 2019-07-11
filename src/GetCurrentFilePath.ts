import * as vscode from 'vscode';

export var GetCurrentFilePath = function(context: vscode.ExtensionContext){
	context.subscriptions.push(vscode.commands.registerCommand('extension.GetCurrentFilePath', function (uri) {
		vscode.window.showInformationMessage(`file path ：${uri ? uri.path : 'None'}`);
	}));
};

