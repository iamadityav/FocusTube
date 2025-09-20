// FocusTube Content Script - Runs on YouTube pages
console.log('FocusTube content script loaded');

// Configuration for elements to hide
const YOUTUBE_SELECTORS = {
    // Comments section
    comments: [
        '#comments',
        'ytd-comments',
        '#comments-section',
        'ytd-comments-section-renderer'
    ],
    
    // Sidebar and recommendations
    sidebar: [
        '#secondary',
        '#related',
        'ytd-watch-next-secondary-results-renderer',
        '#secondary-inner',
        'ytd-secondary-column-renderer'
    ],
    
    // End screen suggestions
    endScreen: [
        '.ytp-endscreen-content',
        '.ytp-ce-element',
        '.ytp-cards-teaser',
        'ytp-endscreen-element',
        '.ytp-suggestion-set'
    ],
    
    // Shorts section on homepage
    shorts: [
        'ytd-rich-section-renderer[is-shorts]',
        'ytd-reel-shelf-renderer',
        '#shorts-container',
        '[aria-label*="Shorts"]',
        'ytd-shorts-shelf-renderer'
    ],
    
    // Additional distracting elements
    extras: [
        '.ytp-suggested-action',
        '.ytp-cards-button',
        '#guide-button', // Sometimes hide navigation
        'ytd-notification-topbar-button-renderer'
    ]
};

// Current settings
let currentSettings = {
    focusMode: false,
    hideComments: true,
    hideSidebar: true,
    hideEndScreen: true,
    hideShorts: false
};

// CSS class names for hidden elements
const FOCUS_CLASS = 'focustube-hidden';
const FOCUS_CONTAINER_CLASS = 'focustube-active';

// Initialize when page loads
initialize();

async function initialize() {
    console.log('Initializing FocusTube...');
    
    // Load settings from storage
    await loadSettings();
    
    // Add custom CSS
    injectCustomCSS();
    
    // Apply focus mode if enabled
    if (currentSettings.focusMode) {
        applyFocusMode();
    }
    
    // Listen for YouTube navigation (SPA routing)
    setupNavigationListener();
    
    // Listen for messages from popup
    setupMessageListener();
    
    // Monitor for new elements (YouTube loads content dynamically)
    setupMutationObserver();
}

// Load settings from Chrome storage
async function loadSettings() {
    try {
        const result = await chrome.storage.sync.get(currentSettings);
        currentSettings = { ...currentSettings, ...result };
        console.log('Content script loaded settings:', currentSettings);
    } catch (error) {
        console.error('Error loading settings in content script:', error);
    }
}

// Listen for messages from popup
function setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'updateFocusMode') {
            console.log('Received settings update:', message.settings);
            currentSettings = message.settings;
            
            if (currentSettings.focusMode) {
                applyFocusMode();
            } else {
                removeFocusMode();
            }
            
            sendResponse({ success: true });
        }
    });
}

// Apply focus mode based on current settings
function applyFocusMode() {
    console.log('Applying focus mode...');
    
    // Add container class to body
    document.body.classList.add(FOCUS_CONTAINER_CLASS);
    
    // Hide elements based on settings
    if (currentSettings.hideComments) {
        hideElements(YOUTUBE_SELECTORS.comments);
    }
    
    if (currentSettings.hideSidebar) {
        hideElements(YOUTUBE_SELECTORS.sidebar);
    }
    
    if (currentSettings.hideEndScreen) {
        hideElements(YOUTUBE_SELECTORS.endScreen);
    }
    
    if (currentSettings.hideShorts) {
        hideElements(YOUTUBE_SELECTORS.shorts);
    }
    
    // Show focus indicator
    showFocusIndicator();
}

// Remove focus mode
function removeFocusMode() {
    console.log('Removing focus mode...');
    
    // Remove container class
    document.body.classList.remove(FOCUS_CONTAINER_CLASS);
    
    // Show all hidden elements
    showAllElements();
    
    // Remove focus indicator
    removeFocusIndicator();
}

// Hide specific elements
function hideElements(selectors) {
    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add(FOCUS_CLASS);
        });
    });
}

// Show all hidden elements
function showAllElements() {
    const hiddenElements = document.querySelectorAll(`.${FOCUS_CLASS}`);
    hiddenElements.forEach(element => {
        element.classList.remove(FOCUS_CLASS);
    });
}

// Inject custom CSS for smooth hiding/showing
function injectCustomCSS() {
    if (document.getElementById('focustube-styles')) return;
    
    const css = `
        /* FocusTube Styles */
        .${FOCUS_CLASS} {
            display: none !important;
            transition: opacity 0.3s ease;
        }
        
        /* Focus indicator */
        .focustube-indicator {
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            animation: focusIndicatorSlide 0.5s ease-out;
        }
        
        @keyframes focusIndicatorSlide {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Better focus for video when sidebar is hidden */
        .${FOCUS_CONTAINER_CLASS} #primary {
            max-width: none !important;
        }
        
        /* Smooth transitions */
        #secondary, #comments {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Clean up layout when sidebar hidden */
        .${FOCUS_CONTAINER_CLASS} ytd-watch-flexy[flexy] #primary {
            margin-right: 0 !important;
        }
        
        /* Hide video suggestions overlay */
        .${FOCUS_CLASS}.ytp-endscreen-content {
            opacity: 0 !important;
            pointer-events: none !important;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'focustube-styles';
    style.textContent = css;
    document.head.appendChild(style);
}

// Show focus mode indicator
function showFocusIndicator() {
    // Remove existing indicator
    removeFocusIndicator();
    
    const indicator = document.createElement('div');
    indicator.className = 'focustube-indicator';
    indicator.id = 'focustube-indicator';
    indicator.innerHTML = '🎯 Focus Mode ON';
    
    document.body.appendChild(indicator);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        const ind = document.getElementById('focustube-indicator');
        if (ind) {
            ind.style.opacity = '0';
            setTimeout(() => ind.remove(), 300);
        }
    }, 3000);
}

// Remove focus indicator
function removeFocusIndicator() {
    const indicator = document.getElementById('focustube-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Setup navigation listener for YouTube SPA routing
function setupNavigationListener() {
    // YouTube uses pushState for navigation
    let lastUrl = location.href;
    
    // Listen for URL changes
    const observer = new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            console.log('YouTube navigation detected:', currentUrl);
            
            // Reapply focus mode after navigation
            setTimeout(() => {
                if (currentSettings.focusMode) {
                    applyFocusMode();
                }
            }, 1000); // Wait for YouTube to load content
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Monitor for dynamically loaded content
function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
        if (!currentSettings.focusMode) return;
        
        let shouldReapply = false;
        
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if new elements match our selectors
                    const allSelectors = [
                        ...YOUTUBE_SELECTORS.comments,
                        ...YOUTUBE_SELECTORS.sidebar,
                        ...YOUTUBE_SELECTORS.endScreen,
                        ...YOUTUBE_SELECTORS.shorts
                    ];
                    
                    allSelectors.forEach(selector => {
                        try {
                            if (node.matches && node.matches(selector)) {
                                shouldReapply = true;
                            } else if (node.querySelector && node.querySelector(selector)) {
                                shouldReapply = true;
                            }
                        } catch (e) {
                            // Ignore invalid selectors
                        }
                    });
                }
            });
        });
        
        if (shouldReapply) {
            // Debounce reapplication
            clearTimeout(window.focustubeReapplyTimer);
            window.focustubeReapplyTimer = setTimeout(() => {
                console.log('Reapplying focus mode due to new content');
                applyFocusMode();
            }, 500);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Keyboard shortcut support (Ctrl+Shift+F)
document.addEventListener('keydown', async (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        
        // Toggle focus mode
        currentSettings.focusMode = !currentSettings.focusMode;
        
        // Save to storage
        await chrome.storage.sync.set({ focusMode: currentSettings.focusMode });
        
        // Apply changes
        if (currentSettings.focusMode) {
            applyFocusMode();
        } else {
            removeFocusMode();
        }
        
        console.log('Focus mode toggled via keyboard shortcut:', currentSettings.focusMode);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && currentSettings.focusMode) {
        // Reapply focus mode when returning to tab
        setTimeout(() => applyFocusMode(), 500);
    }
});

console.log('FocusTube content script initialized successfully');