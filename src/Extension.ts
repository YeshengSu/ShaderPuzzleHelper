
import * as vscode from 'vscode';
import {GetCurrentFilePath} from './getCurrentFilePath';
import {OpenShaderPuzzleWeb} from './shaderPuzzleWeb';
import {ShaderPuzzleCompletion} from './shaderPuzzleCompletion';
import {CreateViews} from './ShaderPuzzleViews'
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "shader-puzzle-plugins" is now active!');
	context.subscriptions.push(vscode.commands.registerCommand('extension.StartShaderPuzzleTool', function () {
		vscode.window.showInformationMessage('shader puzzle tool is now activated!');
	}));

	new GetCurrentFilePath(context); // get current file path
	new OpenShaderPuzzleWeb(context); // open shader puzzle web
	new ShaderPuzzleCompletion(context); // shader puzzle completion
	new CreateViews(context); // create shader puzzle views
}

// this method is called when your extension is deactivated
export function deactivate() {
	
}
