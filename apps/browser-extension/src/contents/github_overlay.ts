/**
 * GitHub & Jira DOM Overlay Content Script
 * Injects "🚀 Run AI Pipeline" and "⚡ AI Re-Fix" buttons into GitHub Issues & PR pages.
 */
function injectAIPipelineOverlay() {
  const targetHeader = document.querySelector('.gh-header-actions') || document.querySelector('#partial-discussion-header');
  if (!targetHeader || document.querySelector('#ai-pipeline-btn-group')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'ai-pipeline-btn-group';
  container.style.display = 'inline-flex';
  container.style.gap = '8px';
  container.style.marginLeft = '12px';

  const runBtn = document.createElement('button');
  runBtn.className = 'btn btn-sm btn-primary';
  runBtn.style.backgroundColor = '#6366f1';
  runBtn.style.borderColor = '#4f46e5';
  runBtn.innerHTML = '🚀 Run AI Pipeline';
  runBtn.onclick = () => {
    runBtn.disabled = true;
    runBtn.innerText = '⚡ Triggering Workflow...';
    
    // Dispatch message to background service worker
    chrome.runtime.sendMessage({ action: 'TRIGGER_PIPELINE', url: window.location.href }, (response) => {
      if (response && response.success) {
        runBtn.innerText = '✓ Workflow Dispatched!';
        runBtn.style.backgroundColor = '#10b981';
      } else {
        runBtn.innerText = '❌ Failed to Trigger';
        runBtn.style.backgroundColor = '#ef4444';
      }
    });
  };

  container.appendChild(runBtn);
  targetHeader.appendChild(container);
}

// Execute on initial page load and DOM mutations
injectAIPipelineOverlay();
const observer = new MutationObserver(() => injectAIPipelineOverlay());
observer.observe(document.body, { childList: true, subtree: true });
