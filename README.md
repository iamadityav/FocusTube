# 🎯 FocusTube - YouTube Focus Mode Chrome Extension

<div align="center">

<img width="1024" height="1024" alt="ChatGPT Image Sep 20, 2025, 01_24_09 PM" src="https://github.com/user-attachments/assets/6868cccd-ed26-4ad6-8df6-6d76080f6c35" />


**Transform YouTube into a distraction-free learning environment**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-brightgreen)](https://chrome.google.com/webstore)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)](https://github.com/yourusername/focustube)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-orange)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<img width="329" height="613" alt="Screenshot 2025-09-20 at 4 42 05 PM" src="https://github.com/user-attachments/assets/2b2c4463-526f-41d8-9cd6-1e162652ee1e" />


</div>

---

## ✨ Overview

FocusTube is a minimalist Chrome extension that helps you focus on YouTube videos by removing distracting elements like comments, sidebar recommendations, and end-screen suggestions. With a sleek glassmorphism design and intuitive controls, it transforms YouTube into a clean, distraction-free learning environment.

> **Perfect for students, professionals, and anyone who wants to focus on content without getting sidetracked by YouTube's algorithm.**

## 🚀 Features

### 🎭 **Distraction-Free Mode**
- ✅ Hide comments section
- ✅ Remove sidebar recommendations  
- ✅ Block end-screen suggestions
- ✅ Optional Shorts section hiding
- ✅ Clean, focused video viewing

### 🎨 **Beautiful Interface**
- 🖤 Minimalist black & white design
- 🔮 iOS-inspired glassmorphism UI
- 📱 Responsive and intuitive controls
- ✨ Smooth animations and transitions

### ⚡ **Smart Functionality**  
- 🔄 Real-time element hiding/showing
- 💾 Settings sync across devices
- ⌨️ Keyboard shortcut (Ctrl+Shift+F)
- 🧠 Remembers your preferences
- 🎯 Works across all YouTube pages

### 🛡️ **Privacy & Performance**
- 🔒 No data collection
- 🪶 Lightweight and fast
- 🚫 No server communication
- ⚡ Instant activation
- 🎪 Non-intrusive operation

## 📸 Screenshots

<div align="center">

### Extension Popup
![Popup Interface](screenshots/popup.png)

### Before vs After
| Distracted YouTube | Focused YouTube |
|:--:|:--:|
| ![Before](screenshots/before.png) | ![After](screenshots/after.png) |

</div>

## 📦 Installation

### Method 1: Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (link pending)
2. Click "Add to Chrome"
3. Click "Add Extension" in the popup
4. Start focusing! 🎯

### Method 2: Manual Installation (Development)
1. **Download the extension:**
   ```bash
   git clone https://github.com/yourusername/focustube.git
   cd focustube
   ```

2. **Load in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `focustube` folder

3. **You're ready!** The extension icon will appear in your toolbar.

## 🎮 Usage

### Quick Start
1. **Navigate to YouTube** - any video, homepage, or channel
2. **Click the FocusTube icon** in your Chrome toolbar
3. **Toggle Focus Mode ON** - watch distractions disappear instantly!
4. **Customize settings** - choose which elements to hide

### Keyboard Shortcuts
- `Ctrl + Shift + F` - Toggle Focus Mode on/off

### Settings Options
- **Comments** - Hide the entire comments section
- **Sidebar & Recommendations** - Remove related videos and recommendations
- **End Screen Suggestions** - Block video suggestions at the end
- **Shorts (Homepage)** - Hide Shorts shelf from homepage

## 🏗️ Technical Details

### Built With
- **JavaScript (Vanilla)** - Core functionality
- **Chrome Manifest V3** - Latest extension standards  
- **HTML5 & CSS3** - Modern UI/UX
- **Chrome APIs** - Storage, scripting, and tabs management

### Architecture
```
focusTube/
├── manifest.json        # Extension configuration
├── background.js        # Service worker
├── content.js          # YouTube page manipulation
├── popup.html          # Extension popup UI
├── popup.js           # Popup functionality
├── popup.css          # Glassmorphism styling
├── styles.css         # YouTube page styles
└── icons/            # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Key Technologies
- **DOM Manipulation** - Dynamic element hiding/showing
- **MutationObserver** - Handles YouTube's dynamic content loading
- **Chrome Storage API** - Syncs settings across devices
- **CSS Backdrop Filter** - Modern glassmorphism effects

## 🛠️ Development

### Prerequisites
- Chrome Browser (version 88+)
- Basic knowledge of JavaScript and Chrome Extensions

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/yourusername/focustube.git
cd focustube

# Load extension in development mode
# Go to chrome://extensions/
# Enable "Developer mode"
# Click "Load unpacked" and select the folder
```

### File Structure Explained
- **`manifest.json`** - Extension metadata and permissions
- **`background.js`** - Service worker for extension lifecycle
- **`content.js`** - Injected into YouTube pages for DOM manipulation
- **`popup.html/js/css`** - Extension popup interface
- **`styles.css`** - CSS injected into YouTube pages

### Testing
1. Load the extension in development mode
2. Navigate to YouTube
3. Test all features:
   - Toggle Focus Mode on/off
   - Check each hiding option
   - Test keyboard shortcuts
   - Verify settings persistence

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the [Issues](https://github.com/yourusername/focustube/issues) tab
- Include Chrome version, OS, and steps to reproduce
- Screenshots are helpful!

### 💡 Feature Requests  
- Check existing issues first
- Describe the feature and use case
- Consider implementation complexity

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request with clear description

### 📋 Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on different YouTube page types
- Ensure responsive design
- Maintain performance standards

## 🗺️ Roadmap

### Version 1.1 (Coming Soon)
- [ ] Dark mode toggle for popup
- [ ] Custom keyboard shortcuts
- [ ] Time tracking analytics
- [ ] Export/import settings

### Version 1.2 (Future)
- [ ] Whitelist/blacklist channels
- [ ] "Study Mode" - hide everything except video
- [ ] Playlist focus mode
- [ ] Custom CSS injection

### Version 2.0 (Long-term)
- [ ] Firefox support
- [ ] Advanced filtering options
- [ ] Focus session statistics
- [ ] Integration with study apps

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourtwitter](https://twitter.com/yourtwitter)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Thanks to the Chrome Extensions team for excellent documentation
- Inspired by the need for distraction-free learning
- UI design influenced by Apple's iOS glassmorphism
- Community feedback and feature suggestions

## ⭐ Support the Project

If FocusTube helps you focus better, please:
- ⭐ Star this repository
- 🐛 Report bugs and suggest features
- 🔗 Share with friends and colleagues
- ✍️ Leave a review on the Chrome Web Store

---

<div align="center">

**Made with ❤️ for focused learning**

[⬆ Back to top](#-focustube---youtube-focus-mode-chrome-extension)

</div>
