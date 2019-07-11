import * as vscode from 'vscode'; 
import { contentMgr } from './ShaderPuzzleContentManager'; 

export var CreateDefinition = function(context: vscode.ExtensionContext) { 
 
	let MyDef = { 
		provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):vscode.ProviderResult<vscode.Definition | vscode.DefinitionLink[]>|undefined { 
			const word        = document.getText(document.getWordRangeAtPosition(position)); 
			const line        = document.lineAt(position); 
			if (vscode.window.activeTextEditor) { 
				if (vscode.window.activeTextEditor.document.uri.scheme === 'file') { 
					const enabled = vscode.window.activeTextEditor.document.languageId === 'spzs'; 
					if (enabled) 
					{ 
						var location = contentMgr.GetWordProportyLocation(word);
						if (location) 
						{ 
							vscode.commands.executeCommand('extension.GlobalView.Reveal', location.line.toString()); 
							return new vscode.Location(vscode.window.activeTextEditor.document.uri, location);	 
						} 
					} 
				} 
			} 
		} 
	};

	//temporary shader puzzle definition 
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(['spzs'], MyDef)); 
};