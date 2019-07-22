"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
exports.getFullText = () => {
    return exports.getDocument().getText();
};
exports.setFullText = (newText) => {
    const document = exports.getDocument();
    const invalidRange = new vscode.Range(0, 0, document.lineCount, 0);
    const fullRange = document.validateRange(invalidRange);
    const editor = exports.getEditor();
    editor.edit(builder => builder.replace(fullRange, newText));
    // deselection
    editor.selection = new vscode.Selection(0, 0, 0, 0);
};
exports.nativeToAscii = (text, lowerCase = true) => {
    return text.split('')
        .map(char => {
        if (char.charCodeAt(0) <= 127) {
            return char;
        }
        const escaped = escape(char).replace('%', '\\');
        return lowerCase ? escaped.toLocaleLowerCase() : escaped;
    })
        .join('');
};
exports.asciiToNative = (text) => {
    return unescape(text.split('\\').join('%'));
};
exports.getEditor = () => {
    if (vscode.window.activeTextEditor) {
        return vscode.window.activeTextEditor;
    }
    throw new Error('Text editor is not active.');
};
exports.getDocument = () => {
    const editor = exports.getEditor();
    if (editor.document) {
        return editor.document;
    }
    throw new Error('Text document is not active.');
};
exports.getEol = () => {
    return exports.getDocument().eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
};
exports.getConfigParameters = (name) => {
    const config = vscode.workspace.getConfiguration('native-ascii-converter');
    return config.get(name);
};
//# sourceMappingURL=functions.js.map