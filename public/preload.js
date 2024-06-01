const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // No specific APIs exposed in this example
});
