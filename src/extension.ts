import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const hour = new Date().getHours();
  const now = new Date();
  const ramadanStart = new Date('2025-03-10');
  const ramadanEnd = new Date('2025-04-10');

  if (now >= ramadanStart && now <= ramadanEnd && (hour >= 19 || hour < 5)) {
    const panel = vscode.window.createWebviewPanel(
      'ochrobMaBro',
      'Ochrob Ma Bro 💧',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
      }
    );

    const imageUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, 'media', 'water.jpg')
    );

    panel.webview.html = getWebviewContent(imageUri.toString());
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('ochrob-ma-bro.reminder', () => {
      vscode.window.showInformationMessage("Ochrob Ma Bro 💧 Pense à boire un peu d'eau !");
    })
  );
}

function getWebviewContent(imageUrl: string): string {
  return `
    <html>
      <body style="text-align: center; font-family: sans-serif; padding: 2em;">
        <h1>Ochrob Ma Bro 💧</h1>
        <img src="${imageUrl}" width="200" />
        <p style="font-size: 1.2em;">C'est l'heure de boire de l’eau !</p>
        <p style="color: gray;">Entre 19h et 5h pendant Ramadan 🌙</p>
      </body>
    </html>
  `;
}

export function deactivate() {}
