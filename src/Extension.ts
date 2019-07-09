
import * as vscode from 'vscode';
import {GetCurrentFilePath} from './getCurrentFilePath';
import {OpenShaderPuzzleWeb} from './shaderPuzzleWeb';
import {ShaderPuzzleCompletion} from './shaderPuzzleCompletion';
import {CreateViews} from './ShaderPuzzleViews';
import {CreateContentManager} from './ShaderPuzzleContentManager'
import { CreatePuzzleDefinition } from './ShaderPuzzleDefinition';
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "shader-puzzle-plugins" is now active!');
	context.subscriptions.push(vscode.commands.registerCommand('extension.StartShaderPuzzleTool', function () {
		vscode.window.showInformationMessage('shader puzzle tool is now activated!');
	}));

	new GetCurrentFilePath(context); // get current file path
	new OpenShaderPuzzleWeb(context); // open shader puzzle web
	new ShaderPuzzleCompletion(context); // shader puzzle completion
	new CreateContentManager(context); // contentManager
	new CreateViews(context); // create shader puzzle views
	new CreatePuzzleDefinition(context); // create shader puzzle definition
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('shader puzzle tool is deactivated!');
}
