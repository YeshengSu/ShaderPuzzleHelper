
import * as vscode from 'vscode';
import {GetCurrentFilePath} from './getCurrentFilePath';
import {OpenShaderPuzzleWeb} from './shaderPuzzleWeb';
import {ShaderPuzzleCompletion} from './shaderPuzzleCompletion';
import {CreateViews} from './ShaderPuzzleViews';
import {CreateContentManager} from './ShaderPuzzleContentManager';
import {CreateDefinition } from './ShaderPuzzleDefinition';
import {CreateCompilation } from './ShaderPuzzleCompilation';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "shader-puzzle-plugins" is now active!');

	GetCurrentFilePath(context); // get current file path
	OpenShaderPuzzleWeb(context); // open shader puzzle web
	ShaderPuzzleCompletion(context); // shader puzzle completion
	CreateContentManager(context); // contentManager
	CreateViews(context); // create shader puzzle views
	CreateDefinition(context); // create shader puzzle definition
	CreateCompilation(context); // create shader puzzle compilation
}

// this method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('shader puzzle tool is deactivated!');
}
