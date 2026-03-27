# 🎯 FiveM Scoreboard

> **Modern FiveM Scoreboard with Dark Red Glassmorphism Theme**  
> A sleek, real-time scoreboard for FiveM roleplay servers displaying online players with job information, ping status, and search functionality

[![Version](https://img.shields.io/badge/version-1.0.0-red?style=for-the-badge&logo=git&logoColor=white)](https://github.com/aradashkan/FiveM-Scoreboard)
[![FiveM](https://img.shields.io/badge/FiveM-Compatible-FF6B35?style=for-the-badge&logo=fivem&logoColor=white)](https://fivem.net/)
[![License](https://img.shields.io/badge/License-MIT-4CAF50?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![ESX](https://img.shields.io/badge/ESX-Supported-2196F3?style=for-the-badge&logo=javascript&logoColor=white)](https://esx-framework.org/)
[![QBCore](https://img.shields.io/badge/QBCore-Supported-9C27B0?style=for-the-badge&logo=javascript&logoColor=white)](https://qbcore.net/)

---

## ✨ Features

| 🎨 Feature | Description |
|------------|-------------|
| 🌑 **Dark Red Theme** | Stunning glassmorphism design with dark red accents and blur effects |
| 👥 **Online Players Only** | Displays only currently connected players with real-time updates |
| 💼 **Job Display** | Shows player jobs from ESX/QBCore frameworks with custom badges |
| 🔍 **Smart Search** | Real-time search through player names and jobs |
| 📊 **Real-time Stats** | Live player count and server uptime tracking |
| 📡 **Ping Indicators** | Color-coded ping status (Green <50ms, Yellow <100ms, Red >100ms) |
| ⌨️ **F10 Toggle** | Quick keyboard toggle with smooth animations |
| 🖱️ **Mouse Control** | Full mouse interaction when scoreboard is active |
| 📱 **Responsive Design** | Adapts beautifully to different screen sizes |
| 🔧 **Framework Support** | Native support for ESX, QBCore, and standalone modes |
| 🔄 **Auto Refresh** | Automatic data updates every second |

---

## 👀 Preview

<img width="1920" height="945" alt="Demo" src="https://github.com/user-attachments/assets/8adc6871-a716-4fc6-a750-4d32038ae553" />

---

## 📋 Requirements

- ✅ **FiveM Server** (Artemis or higher recommended)
- ✅ **MySQL** (if using framework job data)
- ✅ **ESX Framework** or **QBCore Framework** (optional, standalone mode available)
- ✅ **Basic HTML/CSS/JS knowledge** (for customization)

---

## 🚀 Installation Guide

### Step 1: Download & Extract
Download the latest release from GitHub and extract to your `resources` folder:

```
resources/
└── [standalone]/          # or [esx]/[qbcore] depending on your setup
    └── ScoreBoard/
        ├── client.lua
        ├── server.lua
        ├── fxmanifest.lua
        └── html/
            ├── index.html
            ├── style.css
            └── script.js
```

### Step 2: Configure Mode
Open `html/script.js` and set your preferred mode:

```javascript
// For FiveM server with framework
const MODE = 'fivem';

// For standalone/demo mode
const MODE = 'demo';
```

### Step 3: Add to Server Config
Add the following to your `server.cfg`:

```cfg
# For ESX servers
ensure es_extended
ensure ScoreBoard

# For QBCore servers
ensure qb-core
ensure ScoreBoard

# For standalone servers
ensure ScoreBoard
```

### Step 4: Start Resource
Restart your server or use the console:

```bash
refresh
start ScoreBoard
```

---

## 🎮 Usage

| Control | Action | Description |
|---------|--------|-------------|
| `F10` | Toggle Scoreboard | Opens/closes the scoreboard interface |
| `Mouse` | Navigate | Click and scroll when scoreboard is active |
| `ESC` | Close | Alternative close method |

### Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/scoreboard` | None | Manually toggle scoreboard for testing |

---

## ⚙️ Configuration Options

### Change Toggle Key
Edit `client.lua` line 32:

```lua
if IsControlJustPressed(0, 121) then -- F10 (121)
    -- Change 121 to your desired key code
    -- Common codes: F1=288, F2=289, TAB=37, etc.
```

### Adjust Max Players
Modify `server.lua` line 3:

```lua
local maxPlayers = 32  -- Change to your server slot count
```

### Update Interval
Customize refresh rate in `server.lua` line 2:

```lua
local updateInterval = 1000  -- Milliseconds (1000 = 1 second)
```

### Customize Colors
Edit `html/style.css` for theme changes:

```css
/* Change primary color from red to blue */
:root {
    --primary-color: #2563eb; /* Blue instead of #dc2626 */
    --primary-dark: #1d4ed8;  /* Darker blue */
}
```

### Glassmorphism Effect
Adjust blur intensity in `style.css`:

```css
.scoreboard-container {
    backdrop-filter: blur(20px); /* Increase for more blur */
}
```

---

## 🔗 Framework Integration

### ESX Framework
Automatic job detection from ESX jobs table:

```lua
-- server.lua automatically detects:
local xPlayer = exports.esx:GetPlayerFromId(source)
player.job = xPlayer.job.name
player.jobLabel = xPlayer.job.label
```

### QBCore Framework
Native QBCore job integration:

```lua
-- server.lua automatically detects:
local Player = QBCore.Functions.GetPlayer(source)
player.job = Player.PlayerData.job.name
player.jobLabel = Player.PlayerData.job.label
```

### Standalone Mode
Works without any framework - shows "Unemployed" for all players:

```lua
-- No framework dependencies required
player.job = "Unemployed"
player.jobLabel = "Unemployed"
```

---

## 🔌 API & Events

### Server Events

```lua
-- Request scoreboard data
TriggerEvent('scoreboard:requestData')

-- Get server uptime
local uptime = exports['ScoreBoard']:GetServerUptime()
```

### Client Events

```lua
-- Toggle scoreboard
TriggerEvent('scoreboard:toggle')

-- Update scoreboard data
TriggerEvent('scoreboard:updateData', playersData)
```

### NUI Callbacks

```javascript
// Request player data
SendNUIMessage({ type: 'requestPlayers' });

// Close scoreboard
SendNUIMessage({ type: 'close' });

// Update scoreboard
SendNUIMessage({
    type: 'updateScoreboard',
    players: playerArray
});
```

---

## 📁 File Structure

```
ScoreBoard/
├── 📄 fxmanifest.lua          # Resource manifest
├── 📄 client.lua              # Client-side logic
├── 📄 server.lua              # Server-side logic
└── 🌐 html/
    ├── 📄 index.html          # Main UI structure
    ├── 🎨 style.css           # Glassmorphism styling
    └── ⚙️ script.js           # Frontend logic
```

---

## 🔧 Troubleshooting

### ⚠️ Scoreboard doesn't open
**Solution:** Check console for errors and ensure NUI focus is working:
```lua
-- Test in F8 console
TriggerEvent('scoreboard:toggle')
```

### 🔧 Jobs not showing
**Solution:** Verify framework is loaded before scoreboard:
```cfg
# Ensure framework loads first
ensure es_extended
ensure ScoreBoard
```

### 💡 No players appearing
**Solution:** Check server permissions and player data:
```lua
-- Debug player count
print("Online players: " .. #GetPlayers())
```

### 🎨 CSS not updating
**Solution:** Clear cache and restart resource:
```bash
refresh
stop ScoreBoard
start ScoreBoard
```

---

## 🎨 Customization Examples

### Example 1: Blue Theme
Change the entire color scheme to blue:

```css
/* style.css */
:root {
    --primary-color: #3b82f6;
    --primary-dark: #1d4ed8;
    --glass-bg: rgba(59, 130, 246, 0.1);
}

/* Update gradients */
.logo-text h2 {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}
```

### Example 2: Add Money Display
Add player money to the scoreboard:

```lua
-- server.lua (in GetPlayerData function)
if exports.esx then
    player.money = xPlayer.getMoney()
elseif exports.qbCore then
    player.money = Player.PlayerData.money.cash
end

-- Then in script.js renderPlayers()
<td>$${player.money.toLocaleString()}</td>
```

### Example 3: Custom Table Columns
Add a "Level" column:

```html
<!-- index.html -->
<th>Level</th>

<!-- script.js -->
<td>
    <span class="level-badge">${player.level || 1}</span>
</td>
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Feel free to use, modify, and distribute!
Just keep the original copyright notice intact.
```

---

### Credits
- 🎨 **Design:** Inspired by modern glassmorphism trends
- 🔧 **Development:** Built with ❤️ for the FiveM community
- 🙏 **Contributors:** Thanks to all beta testers and feedback providers

---

## 📋 Version History

### v1.0.0 (Current)
- ✨ Initial release with full framework support
- 🎨 Dark red glassmorphism theme
- 👥 Real-time player tracking
- 🔍 Advanced search functionality
- 📊 Ping indicators and uptime display
- 📱 Responsive design for all devices
- 🔧 Easy configuration options

---

## 🚀 Future Updates

- [ ] 🌟 **Multi-language Support** - Localization for different regions
- [ ] 🎯 **Admin Panel** - In-game admin controls and player management
- [ ] 📈 **Statistics** - Detailed server analytics and player metrics
- [ ] 🎨 **Theme Editor** - Live theme customization interface
- [ ] 🔊 **Sound Effects** - Audio feedback for interactions
- [ ] 📱 **Mobile App** - Companion app for server monitoring
- [ ] 🤖 **Discord Integration** - Automatic Discord rich presence
- [ ] 📊 **Database Logging** - Persistent statistics and player history

---

## ⚡ Quick Start

For experienced users:

1. **Download** → Extract to `resources/[standalone]/ScoreBoard/`
2. **Configure** → Set `MODE = 'fivem'` in `script.js`
3. **Install** → Add `ensure ScoreBoard` to `server.cfg`
4. **Start** → `refresh && start ScoreBoard`
5. **Test** → Press `F10` in-game!

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/yourusername/ScoreBoard.git
cd ScoreBoard
# Make your changes
# Test thoroughly
# Submit PR
```

---

<div align="center">

**Made with ❤️ for the FiveM Community**

[⬆️ Back to Top](#-ScoreBoard)

</div>
