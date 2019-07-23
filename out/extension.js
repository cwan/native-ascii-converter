"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils = require("./utils");
const DISPLAY_NAME = 'Native-ASCII Converter';
const COMMENT_PREFIX = '#';
const FILE_EXTENSION = '.properties';
function activate(context) {
    // テキストエディターを開いてるときときに実行可能なコマンドを登録
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.convertNativeToAscii', decorate(convertNativeToAscii)));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.convertAsciiToNative', decorate(convertAsciiToNative)));
    registerListeners();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
// アクティブドキュメントの内容をUnicodeエンコード変換する
const convertNativeToAscii = () => {
    const lowerCase = utils.getConfigParameters('letter-case') === 'Lower case';
    const commentConversion = utils.getConfigParameters('comment-conversion');
    const newText = utils.getFullText()
        .split(/\r?\n/g)
        .map(line => {
        if (!commentConversion && line.startsWith(COMMENT_PREFIX)) {
            return line;
        }
        else {
            return utils.nativeToAscii(line, lowerCase);
        }
    })
        .join(utils.getEol());
    utils.setFullText(newText);
};
// アクティブドキュメントの内容をUnicodeデコード変換する
const convertAsciiToNative = () => {
    const newText = utils.asciiToNative(utils.getFullText());
    utils.setFullText(newText);
};
// 変換処理関数をラップして、エラーハンドリングを行う
const decorate = (func) => {
    return () => {
        try {
            func();
        }
        catch (e) {
            console.error(DISPLAY_NAME, e);
            if (e.message) {
                vscode.window.showErrorMessage(`[${DISPLAY_NAME}] ${e.message}`);
            }
        }
    };
};
// テキストファイルイベントのリスナー登録
const registerListeners = () => {
    // 保存時の自動変換
    if (utils.getConfigParameters('auto-conversion-on-save')) {
        vscode.workspace.onWillSaveTextDocument(event => {
            if (event.document.fileName.endsWith(FILE_EXTENSION)) {
                decorate(convertNativeToAscii)();
            }
        });
    }
    // アクティブ時の自動変換
    if (utils.getConfigParameters('auto-conversion-on-activate')) {
        vscode.window.onDidChangeActiveTextEditor(textEditor => {
            if (vscode.window.activeTextEditor && utils.getDocument().fileName.endsWith(FILE_EXTENSION)) {
                decorate(convertAsciiToNative)();
            }
        });
    }
};
//# sourceMappingURL=extension.js.map