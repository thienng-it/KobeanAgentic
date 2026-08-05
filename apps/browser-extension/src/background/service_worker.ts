/**
 * Manifest V3 Service Worker managing WebSocket & API connection to Control Console.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'TRIGGER_PIPELINE') {
    fetch('http://localhost:3000/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issueId: `ISSUE-${Date.now().toString().slice(-4)}`,
        title: `Triggered from Browser Extension on ${request.url}`,
        description: 'Automated execution triggered directly from GitHub DOM action button.'
      })
    })
      .then((res) => res.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((err) => sendResponse({ success: false, error: err.message }));

    return true; // Keep message channel open for async response
  }
});
