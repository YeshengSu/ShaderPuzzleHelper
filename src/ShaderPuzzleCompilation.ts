import * as vscode from 'vscode'; 
import * as Path from 'path';
import * as fs from 'fs';

var terminal: vscode.Terminal;
var memento: vscode.Memento;
var compiler: string|undefined;
var compiler_folder: string|undefined;

export var CreateCompilation = function(context: vscode.ExtensionContext){
    
    memento = context.globalState;
    compiler = memento.get('compiler', undefined);
    compiler_folder = memento.get('compiler_folder', undefined);

    // create terminal
    terminal = vscode.window.createTerminal(`Ext Terminal #Shader Puzzle Compiler`);

    context.subscriptions.push(vscode.commands.registerCommand('extension.Compilation.SetCompiler', async function (uri) {
        if (!uri) { return;}

        let options: vscode.OpenDialogOptions = {
            canSelectFiles: true,
            canSelectFolders: false,
            defaultUri: uri,
            canSelectMany: false,
        };

        const compiler_url = await vscode.window.showOpenDialog(options);
        if (compiler_url){
            let compiler_path = compiler_url[0].path.substr(1, compiler_url[0].path.length);
            let compiler_paths = compiler_path.split('/');
            compiler = compiler_paths.pop();
            compiler_folder = compiler_paths.join('/');
            memento.update('compiler', compiler);
            memento.update('compiler_folder', compiler_folder);
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('extension.Compilation.Compile', async function (uri) {
        if (!uri) { return;}

        let file_path = uri.path.substr(1, uri.path.length);

        let options: vscode.OpenDialogOptions = {
            canSelectFiles: true,
            canSelectFolders: false,
            defaultUri: uri,
            canSelectMany: false,
        };

        // choose complier
        if (!compiler_folder || !compiler){
            const compiler_url = await vscode.window.showOpenDialog(options);
            if (compiler_url){
                let compiler_path = compiler_url[0].path.substr(1, compiler_url[0].path.length);
                let compiler_paths = compiler_path.split('/');
                compiler = compiler_paths.pop();
                compiler_folder = compiler_paths.join('/');
                memento.update('compiler', compiler);
                memento.update('compiler_folder', compiler_folder);
            }
        }

        // start complier
        if (compiler_folder && compiler){
            vscode.window.showInformationMessage('shader puzzle is now compiled !');
            vscode.window.showInformationMessage(`file path ：${file_path}`);
            vscode.window.showInformationMessage(`compiler path ：${compiler_folder+compiler}`);
            
            // start compile
            terminal.show();
            terminal.sendText("'Start To Compiling ...'");
            terminal.sendText(`cd ${compiler_folder}`);
            terminal.sendText(`./${compiler} -i "${file_path}"`);
        }
        else{
            vscode.window.showInformationMessage('shader puzzle compiler is not found !');
        }
    }));
};