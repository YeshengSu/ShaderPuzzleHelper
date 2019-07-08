import * as vscode from 'vscode';
import * as path from 'path';
import { stringify } from 'querystring';
import {spzsTypeTable} from './Spzs/SpzsTypeTable';
import {spzsCtrlTable} from './Spzs/SpzsCtrlTable';

export class CreateViews {
	constructor(context: vscode.ExtensionContext) {
		var globalViewDataProvider = new GlobalViewDataProvider();
		const view = vscode.window.createTreeView('GlobalView', { treeDataProvider: globalViewDataProvider, showCollapseAll: true });
		vscode.commands.registerCommand('extension.GlobalView.refreshTree', async () => {globalViewDataProvider.refreshTree();});
		vscode.commands.registerCommand('extension.GlobalView.Selection', (line:number, length:number) => globalViewDataProvider.SelectItem(line, length));
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
		this.UpdateContent();
	}

	treeData: {};
	lineData: {};
	editor: vscode.TextEditor | undefined;
	
	public GetTreeData():any
	{
		return this.treeData;
	}

	public GetLineData(line: string):ContentItem
	{
		return (this.lineData as any)[line];
	}

	public ResetData()
	{
		this.lineData = {};
		this.data_type.forEach((element) => {
			(this.treeData as any)[element] = {};
		});
	}

	// update all content of proporties of file
	public UpdateContent()
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
}

export class GlobalViewDataProvider implements vscode.TreeDataProvider<string>{
	private _onDidChangeTreeData: vscode.EventEmitter<string | undefined> = new vscode.EventEmitter<string | undefined>();
	readonly onDidChangeTreeData: vscode.Event<string  | undefined> = this._onDidChangeTreeData.event;
	
	constructor() {
		this.contentMgr = new ContentManager(this.data_type);
	}

	contentMgr: ContentManager;
	data_type = ['attribute', 'varying', 'uniform', 'macro', 'function'];

	public refreshTree(): void {
		console.log("refresh");
		this.contentMgr.UpdateContent();
		this._onDidChangeTreeData.fire();
	}

	public SelectItem(line:number, length: number){
		let editor = vscode.window.activeTextEditor;
		if (editor && editor.document)
		{
			let newRange = new vscode.Range(new vscode.Position(line,0 ), new vscode.Position(line,length));
			editor.revealRange(newRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
			editor.selection = new vscode.Selection(new vscode.Position(line,0 ), new vscode.Position(line,length));
		}
	}

	public getTreeItem(element: string ): vscode.TreeItem {
		let treeData = this.contentMgr.GetTreeData();
		// when element is type data node
		if (element in treeData)
		{
			let label = element;
			let collapsible = vscode.TreeItemCollapsibleState.Collapsed;
			return new vscode.TreeItem(label, collapsible);
		}
		// when element is line data node
		else
		{
			let lineData = this.contentMgr.GetLineData(element);
			let type = lineData.type;
			let label = lineData.proporty;
			let content = lineData.lineText;
			let lineNum = lineData.lineNum;
			let collapsible = vscode.TreeItemCollapsibleState.None;
			let command = {
				command: 'extension.GlobalView.Selection',
				title:'',
				arguments: [lineNum, lineData.lineRawText.length-1]
			};
			return new GlobalViewTreeItem(lineNum, label, content, collapsible, type, command);
		}
	}

	public getChildren(element: string ): string [] {
		let treeData = this.contentMgr.GetTreeData();
		if (element){
			if (element in treeData){
				// line data node (i.e. uniform position)
				return Object.keys(treeData[element]);
			}
			else{
				// no node
				return [];
			}
		}else{
			// type data node (i.e. uniform)
			return Object.keys(treeData);
		}
	}

}

class GlobalViewTreeItem extends vscode.TreeItem{
	constructor(
		private line:number,
		public readonly label: string,
		private content: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly iconName: string,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return `${this.label} : ${this.content}`;
	}

	get description(): string {
		return ' - ' + (this.line+1).toString();
	}
	
	get iconPath(): any{
		return {
			light: path.join(__filename, '..', '..', 'images', 'resources', 'light', this.iconName+'.svg'),
			dark: path.join(__filename, '..', '..', 'images', 'resources', 'dark', this.iconName+'.svg')
		};
	}

}
