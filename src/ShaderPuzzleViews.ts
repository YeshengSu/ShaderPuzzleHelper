import * as vscode from 'vscode';
import * as path from 'path';
import {ContentItem, ContentManager, contentMgr} from './ShaderPuzzleContentManager';

export class CreateViews {
	constructor(context: vscode.ExtensionContext) {

		var globalViewDataProvider = new GlobalViewDataProvider();
		const view = vscode.window.createTreeView('GlobalView', { treeDataProvider: globalViewDataProvider, showCollapseAll: true });

		// select tree item
		vscode.commands.registerCommand('extension.GlobalView.Reveal', async (key:string) => {
			if (key) {
				await view.reveal(key , { focus: false, select: true, expand: true });
			}
		});

		// refresh Tree
		vscode.commands.registerCommand('extension.ContentManager.Refresh', async () => {globalViewDataProvider.RefreshTree();});
		vscode.commands.registerCommand('extension.GlobalView.RefreshTree', async () => {globalViewDataProvider.RefreshTree();});

		// select a tree node
		vscode.commands.registerCommand('extension.GlobalView.Selection', (line:number, length:number) => globalViewDataProvider.SelectItem(line, length));

	}
}

export class GlobalViewDataProvider implements vscode.TreeDataProvider<string>{
	private _onDidChangeTreeData: vscode.EventEmitter<string | undefined> = new vscode.EventEmitter<string | undefined>();
	readonly onDidChangeTreeData: vscode.Event<string  | undefined> = this._onDidChangeTreeData.event;
	private editor: vscode.TextEditor | undefined;

	constructor() {
		vscode.commands.executeCommand('setContext', 'GlobalProportiesEnabled', true);
		this.editor = vscode.window.activeTextEditor;
	}


	public async RefreshTree(offset?: string): Promise<void> {
		console.log('refresh Tree');
		this.editor = vscode.window.activeTextEditor;
		if (offset){
			this._onDidChangeTreeData.fire(offset);
		}
		else{
			this._onDidChangeTreeData.fire();
		}
	}

	public SelectItem(line:number, length: number){
		let editor = this.editor;
		if (editor && editor.document)
		{
			let newRange = new vscode.Range(new vscode.Position(line,0 ), new vscode.Position(line,length));
			editor.revealRange(newRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
			editor.selection = new vscode.Selection(new vscode.Position(line,0 ), new vscode.Position(line,length));
		}
	}

	public getTreeItem(element: string ): vscode.TreeItem {
		let treeData = contentMgr.GetTreeData();
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
			let lineData = contentMgr.GetLineData(element);
			if (lineData){
				let type = lineData.type;
				let label = lineData.proporty;
				let content = lineData.lineText;
				let lineNum = lineData.lineNum;
				let collapsible = vscode.TreeItemCollapsibleState.None;
				let command = {
					command: 'extension.GlobalView.Selection',
					title:'',
					arguments: [lineNum, lineData.lineRawText.length]
				};
				return new GlobalViewTreeItem(lineNum, label, content, collapsible, type, command);
			}
			else{
				return new vscode.TreeItem("Null");
			}
		}
	}

	public getChildren(element: string ): string [] {
		let treeData = contentMgr.GetTreeData();
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

	public getParent(element: string): string|undefined{
		let item = contentMgr.GetLineData(element);
		if (item){
			return item.type;
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
