"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
function appendPunc(punctuation) {
    return __awaiter(this, void 0, void 0, function* () {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const cursors = editor.selections;
            for (const cursor of cursors) {
                const cursorPosition = cursor.active;
                const textLine = editor.document.lineAt(cursorPosition);
                const lineEndPosition = textLine.range.end;
                if (textLine.text.charAt(lineEndPosition.character - 1) !== punctuation) {
                    yield editor
                        .edit((builder) => {
                        builder.insert(lineEndPosition, punctuation);
                    })
                        .then(() => {
                        // 如果一开始光标就在行尾
                        if (lineEndPosition.character === cursorPosition.character) {
                            vscode_1.default.commands.executeCommand('cursorLeft');
                        }
                    });
                }
            }
        }
    });
}
exports.default = appendPunc;
