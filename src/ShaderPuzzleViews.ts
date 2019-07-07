import * as vscode from 'vscode';

export class CreateViews {

	constructor(context: vscode.ExtensionContext) {
		const view = vscode.window.createTreeView('GlobalView', { treeDataProvider: new GlobalViewDataProvider('123'), showCollapseAll: true });
		vscode.commands.registerCommand('extension.GlobalView.reveal', async () => {
			const key = await vscode.window.showInputBox({ placeHolder: 'Type the label of the item to reveal' });
			if (key) {
				await view.reveal({ key }, { focus: true, select: false, expand: true });
			}
		});
	}
}

export class GlobalViewDataProvider implements vscode.TreeDataProvider<{ key: string }>{
	private _onDidChangeTreeData: vscode.EventEmitter<{ key: string } | undefined> = new vscode.EventEmitter<{ key: string } | undefined>();
	readonly onDidChangeTreeData: vscode.Event<{ key: string } | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {
	}

	public refresh(): void {
		console.log("refresh");
		this._onDidChangeTreeData.fire();
	}

	public getTreeItem(element: { key: string }): vscode.TreeItem {
		console.log('getTreeItem', element?element.key:'');
		return new vscode.TreeItem('label' + element.key);
	}

	public getChildren(element: { key: string }): { key: string }[] {
		console.log('getChildren', element?element.key:'');
		return element?[]:[getNode('1'),getNode('2'),getNode('3'),getNode('4')];
	}

	public getParent(element: { key: string }): { key: string } {
		console.log('getParent', element?element.key:'');
		return undefined;
	}
}

const tree = {
	'a': {
		'aa': {
			'aaa': {
				'aaaa': {
					'aaaaa': {
						'aaaaaa': {

						}
					}
				}
			}
		},
		'ab': {}
	},
	'b': {
		'ba': {},
		'bb': {}
	}
};
let nodes = {};

function aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{ key: string }> {
	return {
		getChildren: (element: { key: string }): { key: string }[] => {
			return getChildren(element ? element.key : undefined).map((key: string) => getNode(key));
		},
		getTreeItem: (element: { key: string }): vscode.TreeItem => {
			const treeItem = getTreeItem(element.key);
			treeItem.id = element.key;
			return treeItem;
		},
		getParent: ({ key }: { key: string }): { key: string } => {
			const parentKey = key.substring(0, key.length - 1);
			return parentKey ? new Key(parentKey) : void 0;
		}
	};
}

function getChildren(key: string): string[] {
	if (!key) {
		return Object.keys(tree);
	}
	let treeElement = getTreeElement(key);
	if (treeElement) {
		return Object.keys(treeElement);
	}
	return [];
}

function getTreeItem(key: string): vscode.TreeItem {
	const treeElement = getTreeElement(key);
	return {
		label: key,
		tooltip: `Tooltip for ${key}`,
		collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
	};
}

function getTreeElement(element): any {
	let parent = tree;
	for (let i = 0; i < element.length; i++) {
		parent = parent[element.substring(0, i + 1)];
		if (!parent) {
			return null;
		}
	}
	return parent;
}

function getNode(key: string): { key: string } {
	if (!nodes[key]) {
		nodes[key] = new Key(key);
	}
	return nodes[key];
}

class Key {
	constructor(readonly key: string) { }
}