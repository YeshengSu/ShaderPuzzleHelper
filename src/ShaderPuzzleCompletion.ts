import * as vscode from 'vscode';
import { ParameterInformation, CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace } from 'vscode';
import {spzsAttrTable} from './Spzs/SpzsAttrTable';
import {spzsCtrlTable} from './Spzs/SpzsCtrlTable';
import {spzsDescTable} from './Spzs/SpzsDescTable';
import {spzsFuncTable} from './Spzs/SpzsFuncTable';
import {spzsTagTable} from './Spzs/SpzsTagTable';
import {spzsTypeTable} from './Spzs/SpzsTypeTable';
import {spzsUnifTable} from './Spzs/SpzsUnifTable';
import {spzsVaryTable} from './Spzs/SpzsVaryTable';

export class IEntry { 
    description?: string;
    parameters?: ParameterInformation[];
}

 //TODO: support multiple entry per name
 export interface IEntries { [name: string]: IEntry; }

 export var ShaderPuzzleCompletion = function(context: vscode.ExtensionContext){
	let attr_provider = GetSpzsAttributeProvider();
	let vec_provider = GetSpzsVecProvider();

	context.subscriptions.push(attr_provider);
	context.subscriptions.push(vec_provider);
};

var GetSpzsAttributeProvider = function():vscode.Disposable {
	let completionItemProvider = {provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
		var range = document.getWordRangeAtPosition(position);
		var prefix = range ? document.getText(range) : '';
		
		let leftbracket = '>';
		let rightbracket = '<';
		let i;
		for(i = position.line-1; i >= 0; i--){
			if (document.lineAt(i).text.includes('<')){
				leftbracket = '<'; break;
			}
			if (document.lineAt(i).text.includes('>')){
				leftbracket = '>'; break;
			}
		}
		for(i = position.line+1; i < document.lineCount; i++){
			if (document.lineAt(i).text.includes('<')){
				rightbracket = '<'; break;
			}
			if (document.lineAt(i).text.includes('>')){
				rightbracket = '>'; break;
			}
		}
		let isWithinAngleBracket = leftbracket === '<' && rightbracket === '>';
		
		// create provider item function
		let result: CompletionItem[] = [];
		var createNewProposal = function (kind: CompletionItemKind, name: string, entry: IEntry, type?: string): CompletionItem {
			var proposal: CompletionItem = new CompletionItem(name);
			proposal.kind = kind;
			if (entry) {
				if (entry.description) {
					proposal.documentation = entry.description;
				}
				if (entry.parameters) {
					let signature = type ? '(' + type + ') ' : '';
					let param_expain = '';
					signature += name;
					signature += '(';
					// tslint:disable-next-line: triple-equals
					if (entry.parameters && entry.parameters.length != 0) {
						let params = '';
						entry.parameters.forEach(p => params += p.label + ',');
						entry.parameters.forEach(p => param_expain += p.label + ' : ' + p.documentation + '\n');
						signature += params.slice(0, -1);
					}
					signature += ')\n\n';
					signature += param_expain;
					
					proposal.detail = signature;
				}
			}
			return proposal;
		};

		var matches = (name: string) => {
			return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
		};
		// do with in angle bracket
		if (isWithinAngleBracket){
			for (var name in spzsTagTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Keyword, name, spzsTagTable[name], 'Tag'));
				}

			}
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsDescTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Keyword, name, spzsDescTable[name], 'Describe'));
				}
			}
		}
		

		// do within angle braket
		if (!isWithinAngleBracket){
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsAttrTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsAttrTable[name], 'attribute'));
				}
			}
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsUnifTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsUnifTable[name], 'Uniform'));
				}
			}
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsVaryTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsVaryTable[name], 'Varying'));
				}
			}
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsFuncTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Function, name, spzsFuncTable[name], 'IntrinsicFunction'));
				}
			}
			// tslint:disable-next-line: no-duplicate-variable
			for (var name in spzsTypeTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.TypeParameter, name, spzsTypeTable[name], 'DataType'));
				}
			}
		}

		// tslint:disable-next-line: no-duplicate-variable
		for (var name in spzsCtrlTable) {
			if (matches(name)){
				result.push(createNewProposal(CompletionItemKind.Field, name, spzsCtrlTable[name], 'PipelineControl'));
			}
		}
		
		return result;
	}};
	
	let attr_provider = vscode.languages.registerCompletionItemProvider('spzs', completionItemProvider, '.' );
	return attr_provider;
};

var GetSpzsVecProvider = function():vscode.Disposable {
	let completionItemProvider = {provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				let linePrefix = document.lineAt(position).text.charAt(position.character-1);

				if (!linePrefix.includes('.') ) {
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
};
