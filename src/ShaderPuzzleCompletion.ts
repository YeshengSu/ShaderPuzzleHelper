import * as vscode from 'vscode';
import { ParameterInformation, CompletionItemProvider, CompletionItem, CompletionItemKind, CancellationToken, TextDocument, Position, Range, TextEdit, workspace } from 'vscode';
import {spzsAttrTable} from './Spzs/SpzsAttrTable'
import {spzsCtrlTable} from './Spzs/SpzsCtrlTable'
import {spzsDescTable} from './Spzs/SpzsDescTable'
import {spzsFuncTable} from './Spzs/SpzsFuncTable'
import {spzsTagTable} from './Spzs/SpzsTagTable'
import {spzsTypeTable} from './Spzs/SpzsTypeTable'
import {spzsUnifTable} from './Spzs/SpzsUnifTable'
import {spzsVaryTable} from './Spzs/SpzsVaryTable'

export class IEntry { 
    description?: string;
    parameters?: ParameterInformation[];
}

 //TODO: support multiple entry per name
 export interface IEntries { [name: string]: IEntry; }

export class ShaderPuzzleCompletion{
	
	public getSpzsAttributeProvider(){
		let completionItemProvider = {provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
			var range = document.getWordRangeAtPosition(position);
			var prefix = range ? document.getText(range) : '';

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
						signature += name;
						signature += '(';
						if (entry.parameters && entry.parameters.length != 0) {
							let params = '';
							entry.parameters.forEach(p => params += p.label + ',');
							signature += params.slice(0, -1);
						}
						signature += ')';
						proposal.detail = signature;
					}
				}
				return proposal;
			};
	
			var matches = (name: string) => {
				return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
			};

			for (var name in spzsAttrTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsAttrTable[name], 'attribute'));
				}
			}
			for (var name in spzsCtrlTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Field, name, spzsCtrlTable[name], 'PipelineControl'));
				}
			}
			for (var name in spzsDescTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Keyword, name, spzsDescTable[name], 'Describe'));
				}
			}
			for (var name in spzsFuncTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Function, name, spzsFuncTable[name], 'IntrinsicFunction'));
				}
			}
			for (var name in spzsTagTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Keyword, name, spzsTagTable[name], 'Tag'));
				}
			}
			for (var name in spzsTypeTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.TypeParameter, name, spzsTypeTable[name], 'DataType'));
				}
			}
			for (var name in spzsUnifTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsUnifTable[name], 'Uniform'));
				}
			}
			for (var name in spzsVaryTable) {
				if (matches(name)){
					result.push(createNewProposal(CompletionItemKind.Property, name, spzsVaryTable[name], 'Varying'));
				}
			}
			
			return result;
		}};

		let attr_provider = vscode.languages.registerCompletionItemProvider('spzs', completionItemProvider, '.' );
		return attr_provider;
	}

	public getSpzsVecProvider() {
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
	}

	constructor(context: vscode.ExtensionContext){
		let attr_provider = this.getSpzsAttributeProvider();
		let vec_provider = this.getSpzsVecProvider();

		context.subscriptions.push(attr_provider);
		context.subscriptions.push(vec_provider);
	}
}
