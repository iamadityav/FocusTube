// FocusTube Background Service Worker
console.log('FocusTube background script loaded');

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
    console.log('FocusTube installed/updated:', details.reason);
    
    if (details.reason === 'install') {
        // First time installation
        console.log('Welcome to FocusTube! 🎯');
        
        // Set default settings
        const defaultSettings = {
            focusMode: false,
            hideComments: true,
            hideSidebar: true,
            hideEndScreen: true,
            hideShorts: false
        };
        
        chrome.storage.sync.set(defaultSettings, () => {
            console.log('Default settings initialized');
        });
        
        // Optional: Open welcome/instructions page
        // chrome.tabs.create({ url: 'https://youtube.com' });
        
    } else if (details.reason === 'update') {
        // Extension updated
        console.log('FocusTube updated to version:', chrome.runtime.getManifest().version);
    }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('FocusTube started with browser');
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received message:', message);
    
    switch (message.action) {
        case 'getSettings':
            // Send current settings to requesting script
            chrome.storage.sync.get(null, (settings) => {
                sendResponse({ settings: settings });
            });
            return true; // Keep channel open for async response
            
        case 'logActivity':
            // Optional: Log user activity for analytics
            console.log('User activity:', message.data);
            break;
            
        case 'toggleFocusMode':
            // Handle focus mode toggle from keyboard shortcut
            handleFocusModeToggle();
            break;
            
        default:
            console.log('Unknown message action:', message.action);
    }
});

// Handle focus mode toggle
async function handleFocusModeToggle() {
    try {
        // Get current settings
        const result = await chrome.storage.sync.get({ focusMode: false });
        const newFocusMode = !result.focusMode;
        
        // Save new state
        await chrome.storage.sync.set({ focusMode: newFocusMode });
        
        // Update all YouTube tabs
        const tabs = await chrome.tabs.query({ url: '*://*.youtube.com/*' });
        
        for (const tab of tabs) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: 'updateFocusMode',
                    settings: await chrome.storage.sync.get(null)
                });
            } catch (error) {
                console.log('Could not update tab:', tab.id, error.message);
            }
        }
        
        console.log('Focus mode toggled to:', newFocusMode);
        
    } catch (error) {
        console.error('Error toggling focus mode:', error);
    }
}

// Handle tab updates (when user navigates to YouTube)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Only act when page is completely loaded
    if (changeInfo.status !== 'complete') return;
    
    // Check if it's a YouTube page
    if (tab.url && tab.url.includes('youtube.com')) {
        console.log('YouTube page loaded in tab:', tabId);
        
        try {
            // Get current settings
            const settings = await chrome.storage.sync.get(null);
            
            // Send settings to content script if focus mode is enabled
            if (settings.focusMode) {
                // Small delay to ensure content script is loaded
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabId, {
                        action: 'updateFocusMode',
                        settings: settings
                    }).catch(() => {
                        // Content script might not be ready yet, that's OK
                        console.log('Content script not ready for tab:', tabId);
                    });
                }, 1000);
            }
            
        } catch (error) {
            console.error('Error handling tab update:', error);
        }
    }
});

if (chrome.commands && chrome.commands.onCommand) {
    chrome.commands.onCommand.addListener(async (command) => {
        console.log('Command triggered:', command);
        
        if (command === 'toggle-focus-mode') {
            await handleFocusModeToggle();
        }
    });
}


// Storage change listener (for debugging)
chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log('Storage changed in namespace:', namespace);
    for (let key in changes) {
        console.log(`Setting "${key}" changed:`, {
            oldValue: changes[key].oldValue,
            newValue: changes[key].newValue
        });
    }
});

// Cleanup on extension suspend/uninstall
chrome.runtime.onSuspend.addListener(() => {
    console.log('FocusTube background script suspending');
});

// Keep service worker alive (optional - for debugging)
// Uncomment if you notice the service worker going to sleep too often
/*
setInterval(() => {
    console.log('FocusTube keepalive ping');
}, 30000); // Every 30 seconds
*/

// Error handler
self.addEventListener('error', (error) => {
    console.error('Background script error:', error);
});

console.log('FocusTube background script initialized successfully');