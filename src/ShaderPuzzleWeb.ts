import * as vscode from 'vscode';

export var OpenShaderPuzzleWeb = function(context: vscode.ExtensionContext){
	context.subscriptions.push(vscode.commands.registerCommand('extension.OpenShaderPuzzleWeb', function () {

		const panel = vscode.window.createWebviewPanel(
			'Shader Puzzle Script Grammar', // viewType
			"WebView", 
			vscode.ViewColumn.One, 
			{
				enableScripts: true, 
				retainContextWhenHidden: true, 
			}
		);
		panel.webview.html = 
		`<html>
			<div class='fill-screen'>
				<object type="text/html" data="http://km.netease.com/wiki/show?page_id=7921" width=1600 height = 1200>
				</object>
			</div>
		</html>`
	}));
};