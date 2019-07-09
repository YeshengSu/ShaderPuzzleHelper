import * as vscode from 'vscode';
import {spzsTypeTable} from './Spzs/SpzsTypeTable';
import {spzsCtrlTable} from './Spzs/SpzsCtrlTable';

export var contentMgr: ContentManager;
export var data_type = ['attribute', 'varying', 'uniform', 'macro', 'function'];

export class CreateContentManager {
	constructor(context: vscode.ExtensionContext) {
		contentMgr = new ContentManager(data_type);
		contentMgr.ActiveEditorChanged();

		// emit when focus on a new file
		vscode.window.onDidChangeActiveTextEditor(() => contentMgr.ActiveEditorChanged());
		// when the text has been changed
		vscode.workspace.onDidChangeTextDocument(e => contentMgr.DocumentChanged(e));
	}
}

// tree item for global proporties views
export class ContentItem{
	constructor(public type:string, public proporty:string, public lineText:string, public lineNum:number, public lineRawText:string){

	}
}

// proporties content manager
export class ContentManager{
	constructor(private data_type:string[]) {
		this.treeData = {};
		this.lineData = {};
	}

	treeData: {};
	lineData: {};
	editor: vscode.TextEditor | undefined;
	
	public GetTreeData():any
	{
		return this.treeData;
	}

	public GetLineData(line: string):ContentItem|undefined
	{
		if (line in this.lineData)
			return (this.lineData as any)[line];
	}

	public GetWordProportyLocation(word: string):vscode.Position|undefined
	{
		for (const iterator in this.lineData) {
			let item = (this.lineData as any)[iterator];
			if (item.proporty === word)
			{
				return new vscode.Position(item.lineNum, item.lineRawText.length);
			}
		}
		return undefined;
	}

	public ResetData()
	{
		this.lineData = {};
		this.data_type.forEach((element) => {
			(this.treeData as any)[element] = {};
		});
	}

	// update all content of proporties of file
	public async UpdateContent()
	{	
		let getProporty = function(type:string, line: string, nextLine: string){
			if (type === 'function')
			{
				let words1 = line.split('(')[0];
				let words2 = line.split('(')[0];
				if (words1.includes(' in') || words2.includes(' in')) {
					return line.split(' ', 3)[1];
				}
				else {
					return null;
				}
			}
			else if (type === 'macro')
			{
				if (line.includes(' out') || nextLine.includes(' out')) {
					return null;
				}
				else {
					return line.replace('macro', '').replace(' ', '').replace('(', '').replace(')', '');
				}
			}
			else
			{
				let words = line.split(' ');
				for (var i = 0; i < words.length; i++){
					if (!spzsTypeTable.hasOwnProperty(words[i]) && 
						!spzsCtrlTable.hasOwnProperty(words[i]) &&
						!words[i].includes('[') && words[i].length)
					{
						return words[i].split(':')[0].replace(';', '');
					}
				}
			}
			return null;
		};

		this.ResetData();

		this.editor = vscode.window.activeTextEditor;
		if (this.editor && this.editor.document) {
			let document = this.editor.document;

			for	(var str_type in this.treeData){
				var newTreeData = {};
				for (var i = 0; i < document.lineCount-1; i++){
					let line = document.lineAt(i);
					let text = line.text.substr(line.firstNonWhitespaceCharacterIndex, line.text.length);
					let fistWord = text.split(" ", 2)[0];
					if (fistWord.includes(str_type) && !fistWord.includes('//') ){
						let nextLine = document.lineAt(i+1);
						let nextText = nextLine.text.substr(line.firstNonWhitespaceCharacterIndex, nextLine.text.length);
						let proporty = getProporty(str_type, text, nextText);
						// tslint:disable-next-line: triple-equals
						if (proporty != null){
							(this.lineData as any)[i.toString()] = new ContentItem(str_type, proporty, text, i, line.text);
							(newTreeData as any)[i.toString()] = {};
						}
					}
				}
				(this.treeData as any)[str_type] = newTreeData;
			}
		}
	}

	public async ActiveEditorChanged(){
		if (vscode.window.activeTextEditor) {
			if (vscode.window.activeTextEditor.document.uri.scheme === 'file') {
				const enabled = vscode.window.activeTextEditor.document.languageId === 'spzs';
				vscode.commands.executeCommand('setContext', 'GlobalProportiesEnabled', enabled);
				if (enabled) {
					await this.UpdateContent();
					vscode.commands.executeCommand('extension.GlobalView.RefreshTree');
				}
				else{
					contentMgr.ResetData()
				}
			}
		} else {
			vscode.commands.executeCommand('setContext', 'GlobalProportiesEnabled', false);
		}
	}

	public async DocumentChanged(changeEvent: vscode.TextDocumentChangeEvent){
		if (this.editor && changeEvent.document.uri.toString() === this.editor.document.uri.toString()) {
			await this.UpdateContent();
			vscode.commands.executeCommand('extension.GlobalView.RefreshTree');
		}
	} 

}
