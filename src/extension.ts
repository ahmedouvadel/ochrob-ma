import * as vscode from 'vscode';

let intervalTimer: ReturnType<typeof setInterval> | undefined;

export function activate(context: vscode.ExtensionContext) {
  const now = new Date();
  const hour = now.getHours();
  const ramadanStart = new Date('2025-03-10');
  const ramadanEnd = new Date('2025-04-10');

  if (now >= ramadanStart && now <= ramadanEnd && (hour >= 19 || hour < 5)) {
    showPopup(context);

    // Rappel toutes les 30 min
    intervalTimer = setInterval(() => {
      const h = new Date().getHours();
      if (h >= 19 || h < 5) {
        showPopup(context);
      }
    }, 30 * 60 * 1000);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('ochrob-ma-bro.reminder', () => {
      showPopup(context);
    })
  );
}

function showPopup(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'ochrobMaBroPopup',
    'Ochrob Ma Bro 💧',
    vscode.ViewColumn.Beside,
    { enableScripts: true }
  );

  const imageUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'media', 'water.jpg')
  );

  panel.webview.html = getPopupHtml(imageUri.toString());

  // Fermer automatiquement après 15 secondes
  setTimeout(() => {
    panel.dispose();
  }, 15000);
}

function getPopupHtml(imageUrl: string): string {
  return `
    <html>
      <body style="display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:sans-serif; padding:1em;">
        <h1 style="font-size: 2em; color: #007acc;">💧 Ochrob lme arank 36acht 😄😄</h1>
        <img src="${imageUrl}" style="max-width: 200px; margin-top: 1em;" />
      </body>
    </html>
  `;
}

export function deactivate() {
  if (intervalTimer) {
    clearInterval(intervalTimer);
  }
}
