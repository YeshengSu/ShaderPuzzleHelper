import * as vscode from 'vscode';
import { ParameterInformation } from 'vscode';

export class IEntry { 
    description?: string;
    parameters?: ParameterInformation[];
}

 //TODO: support multiple entry per name
 export interface IEntries { [name: string]: IEntry; }

export class ShaderPuzzleCompletion{
	
	
	
	public getSpzsVecProvider() {
		let completionItemProvider = {provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
					let linePrefix = document.lineAt(position).text.substr(-2, position.character);
					if (!linePrefix.endsWith('.')) {
						return undefined;
					}

					return [
						new vscode.CompletionItem('x', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('y', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('z', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('w', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('r', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('g', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('b', vscode.CompletionItemKind.Value),
						new vscode.CompletionItem('a', vscode.CompletionItemKind.Value),
					];
				}};

		let vec_provider = vscode.languages.registerCompletionItemProvider('spzs', completionItemProvider, '.' );
		return vec_provider;
	}

	constructor(context: vscode.ExtensionContext){
		let vec_provider = this.getSpzsVecProvider();
	
		context.subscriptions.push(vec_provider);
	}
}
