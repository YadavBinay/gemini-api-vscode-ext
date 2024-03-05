// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

const path = require("path");
const fs = require("fs");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "first-extension" is now active!'
  );
  let gemini = vscode.commands.registerCommand("gemini.openWebview", () => {
    const panel = vscode.window.createWebviewPanel(
      "webviewInteract",
      "Gemini AI",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.file(context.extensionPath)],
      }
    );

    // Load HTML content from file
    const htmlPath = path.join(context.extensionPath, "index.html");
    const htmlContent = vscode.Uri.file(htmlPath).with({
      scheme: "vscode-resource",
    });
    panel.webview.html = fs.readFileSync(htmlContent.fsPath, "utf8");
  });

  context.subscriptions.push(gemini);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
