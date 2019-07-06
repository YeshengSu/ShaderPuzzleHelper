"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const SpzsAttrTable_1 = require("./Spzs/SpzsAttrTable");
const SpzsCtrlTable_1 = require("./Spzs/SpzsCtrlTable");
const SpzsDescTable_1 = require("./Spzs/SpzsDescTable");
const SpzsFuncTable_1 = require("./Spzs/SpzsFuncTable");
const SpzsTagTable_1 = require("./Spzs/SpzsTagTable");
const SpzsTypeTable_1 = require("./Spzs/SpzsTypeTable");
const SpzsUnifTable_1 = require("./Spzs/SpzsUnifTable");
const SpzsVaryTable_1 = require("./Spzs/SpzsVaryTable");
class IEntry {
}
exports.IEntry = IEntry;
class ShaderPuzzleCompletion {
    constructor(context) {
        this.added = {};
        let attr_provider = this.getSpzsAttributeProvider();
        let vec_provider = this.getSpzsVecProvider();
        context.subscriptions.push(attr_provider);
        context.subscriptions.push(vec_provider);
    }
    createNewProposal(kind, name, entry, type) {
        var proposal = new vscode_1.CompletionItem(name);
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
    }
    ;
    getSpzsAttributeProvider() {
        let completionItemProvider = { provideCompletionItems(document, position) {
                var range = document.getWordRangeAtPosition(position);
                var prefix = range ? document.getText(range) : '';
                let result = [];
                var createNewProposal = function (kind, name, entry, type) {
                    var proposal = new vscode_1.CompletionItem(name);
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
                var matches = (name) => {
                    return prefix.length === 0 || name.length >= prefix.length && name.substr(0, prefix.length) === prefix;
                };
                for (var name in SpzsAttrTable_1.spzsAttrTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Property, name, SpzsAttrTable_1.spzsAttrTable[name], 'attribute'));
                    }
                }
                for (var name in SpzsCtrlTable_1.spzsCtrlTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Field, name, SpzsCtrlTable_1.spzsCtrlTable[name], 'PipelineControl'));
                    }
                }
                for (var name in SpzsDescTable_1.spzsDescTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Keyword, name, SpzsDescTable_1.spzsDescTable[name], 'Describe'));
                    }
                }
                for (var name in SpzsFuncTable_1.spzsFuncTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Function, name, SpzsFuncTable_1.spzsFuncTable[name], 'IntrinsicFunction'));
                    }
                }
                for (var name in SpzsTagTable_1.spzsTagTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Keyword, name, SpzsTagTable_1.spzsTagTable[name], 'Tag'));
                    }
                }
                for (var name in SpzsTypeTable_1.spzsTypeTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.TypeParameter, name, SpzsTypeTable_1.spzsTypeTable[name], 'DataType'));
                    }
                }
                for (var name in SpzsUnifTable_1.spzsUnifTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Property, name, SpzsUnifTable_1.spzsUnifTable[name], 'Uniform'));
                    }
                }
                for (var name in SpzsVaryTable_1.spzsVaryTable) {
                    if (matches(name)) {
                        result.push(createNewProposal(vscode_1.CompletionItemKind.Property, name, SpzsVaryTable_1.spzsVaryTable[name], 'Varying'));
                    }
                }
                return result;
            } };
        let attr_provider = vscode.languages.registerCompletionItemProvider('spzs', completionItemProvider, '.');
        return attr_provider;
    }
    getSpzsVecProvider() {
        let completionItemProvider = { provideCompletionItems(document, position) {
                let linePrefix = document.lineAt(position).text.charAt(position.character - 1);
                if (!linePrefix.includes('.')) {
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
}
exports.ShaderPuzzleCompletion = ShaderPuzzleCompletion;
//# sourceMappingURL=shaderPuzzleCompletion.js.map