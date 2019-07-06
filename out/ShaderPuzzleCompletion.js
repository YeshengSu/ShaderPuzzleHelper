"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class IEntry {
}
exports.IEntry = IEntry;
class ShaderPuzzleCompletion {
    getSpzsVecProvider() {
        let completionItemProvider = { provideCompletionItems(document, position) {
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
            } };
        let vec_provider = vscode.languages.registerCompletionItemProvider('spzs', completionItemProvider, '.');
        return vec_provider;
    }
    constructor(context) {
        let vec_provider = this.getSpzsVecProvider();
        context.subscriptions.push(vec_provider);
    }
}
exports.ShaderPuzzleCompletion = ShaderPuzzleCompletion;
//# sourceMappingURL=shaderPuzzleCompletion.js.map