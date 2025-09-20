// DOM elements
const focusModeToggle = document.getElementById('focusModeToggle');
const statusText = document.getElementById('statusText');
const hideCommentsCheckbox = document.getElementById('hideComments');
const hideSidebarCheckbox = document.getElementById('hideSidebar');
const hideEndScreenCheckbox = document.getElementById('hideEndScreen');
const hideShortsCheckbox = document.getElementById('hideShorts');

// Default settings
const defaultSettings = {
    focusMode: false,
    hideComments: true,
    hideSidebar: true,
    hideEndScreen: true,
    hideShorts: false
};

// Initialize popup when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('FocusTube popup loaded');
    
    // Load saved settings
    await loadSettings();
    
    // Add event listeners
    setupEventListeners();
});

// Load settings from Chrome storage
async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get(defaultSettings);
        
        // Update UI with saved settings
        focusModeToggle.checked = result.focusMode;
        hideCommentsCheckbox.checked = result.hideComments;
        hideSidebarCheckbox.checked = result.hideSidebar;
        hideEndScreenCheckbox.checked = result.hideEndScreen;
        hideShortsCheckbox.checked = result.hideShorts;
        
        // Update status text
        updateStatusText(result.focusMode);
        
        console.log('Settings loaded:', result);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to Chrome storage
async function saveSettings() {
    try {
        const settings = {
            focusMode: focusModeToggle.checked,
            hideComments: hideCommentsCheckbox.checked,
            hideSidebar: hideSidebarCheckbox.checked,
            hideEndScreen: hideEndScreenCheckbox.checked,
            hideShorts: hideShortsCheckbox.checked
        };
        
        await chrome.storage.sync.set(settings);
        console.log('Settings saved:', settings);
        
        // Send message to content script to update YouTube page
        await updateYouTubePage(settings);
        
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Main focus mode toggle
    focusModeToggle.addEventListener('change', async () => {
        updateStatusText(focusModeToggle.checked);
        await saveSettings();
        
        // Add visual feedback
        if (focusModeToggle.checked) {
            showNotification('Focus Mode ON 🎯');
        } else {
            showNotification('Focus Mode OFF');
        }
    });
    
    // Individual setting checkboxes
    hideCommentsCheckbox.addEventListener('change', saveSettings);
    hideSidebarCheckbox.addEventListener('change', saveSettings);
    hideEndScreenCheckbox.addEventListener('change', saveSettings);
    hideShortsCheckbox.addEventListener('change', saveSettings);
}

// Update status text based on focus mode state
function updateStatusText(isFocusModeOn) {
    if (isFocusModeOn) {
        statusText.textContent = 'Focus Mode is ON';
        statusText.style.color = '#4CAF50';
    } else {
        statusText.textContent = 'Focus Mode is OFF';
        statusText.style.color = 'rgba(255,255,255,0.8)';
    }
}

// Send message to content script to update YouTube page
async function updateYouTubePage(settings) {
    try {
        // Get current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        // Check if it's a YouTube page
        if (tab.url && (tab.url.includes('youtube.com'))) {
            // Send message to content script
            await chrome.tabs.sendMessage(tab.id, {
                action: 'updateFocusMode',
                settings: settings
            });
        }
    } catch (error) {
        console.error('Error updating YouTube page:', error);
        // This might happen if content script isn't loaded yet - that's okay
    }
}

// Show brief notification in popup
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

// Keyboard shortcuts (optional enhancement)
document.addEventListener('keydown', (e) => {
    // Toggle focus mode with spacebar
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        focusModeToggle.click();
    }
});

// Add smooth transitions when settings change
function addSettingTransition(element) {
    element.style.transition = 'all 0.2s ease';
}

// Initialize transitions
document.querySelectorAll('input[type="checkbox"]').forEach(addSettingTransition);