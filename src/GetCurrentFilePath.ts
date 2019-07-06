import * as vscode from 'vscode';

export class GetCurrentFilePath{
	
	constructor(context: vscode.ExtensionContext){
		context.subscriptions.push(vscode.commands.registerCommand('extension.GetCurrentFilePath', function (uri) {
			vscode.window.showInformationMessage(`file path ：${uri ? uri.path : 'None'}`);
		}));
	}
}

