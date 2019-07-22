"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
// アクティブテキストファイルの全内容を取得する
exports.getFullText = () => {
    return exports.getDocument().getText();
};
// アクティブテキストファイルの全内容を置き換える
exports.setFullText = (newText) => {
    const document = exports.getDocument();
    const invalidRange = new vscode.Range(0, 0, document.lineCount, 0);
    const fullRange = document.validateRange(invalidRange);
    const editor = exports.getEditor();
    editor.edit(builder => builder.replace(fullRange, newText));
    // 中途半端に選択された状態になるので、選択を解除する
    editor.selection = new vscode.Selection(0, 0, 0, 0);
};
// Unicode形式にエンコードする
exports.nativeToAscii = (text, lowerCase = true) => {
    return text.split('')
        .map(char => {
        if (char.charCodeAt(0) <= 127) {
            // 半角文字はそのまま
            return char;
        }
        const escaped = escape(char).replace('%', '\\');
        return lowerCase ? escaped.toLocaleLowerCase() : escaped;
    })
        .join('');
};
// Unicode形式からデコードする
exports.asciiToNative = (text) => {
    return unescape(text.split('\\').join('%'));
};
// アクティブテキストエディターを取得する
exports.getEditor = () => {
    if (vscode.window.activeTextEditor) {
        return vscode.window.activeTextEditor;
    }
    throw new Error('Text editor is not active.');
};
// アクティブテキストエディターのドキュメントを取得する
exports.getDocument = () => {
    const editor = exports.getEditor();
    if (editor.document) {
        return editor.document;
    }
    throw new Error('Text document is not active.');
};
// アクティブドキュメントの改行文字を取得する
exports.getEol = () => {
    return exports.getDocument().eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
};
// 設定パラメータを取得する
exports.getConfigParameters = (name) => {
    const config = vscode.workspace.getConfiguration('native-ascii-converter');
    return config.get(name);
};
//# sourceMappingURL=utils.js.map