const MODE = 'fivem';

const mockPlayers = [
    { id: 1, name: 'Alex_Reaper', job: 'Police', ping: 32, isCurrent: true },
    { id: 2, name: 'John_Wick', job: 'Mechanic', ping: 45, isCurrent: false },
    { id: 3, name: 'Sarah_Carter', job: 'EMS', ping: 28, isCurrent: false },
    { id: 4, name: 'Mike_Tyson', job: 'Gangster', ping: 67, isCurrent: false },
    { id: 6, name: 'Tony_Stark', job: 'Business', ping: 23, isCurrent: false },
    { id: 7, name: 'Bruce_Wayne', job: 'Judge', ping: 156, isCurrent: false },
    { id: 9, name: 'Diana_Prince', job: 'Police', ping: 34, isCurrent: false },
    { id: 10, name: 'Barry_Allen', job: 'EMS', ping: 18, isCurrent: false }
];

let players = [];
let searchQuery = '';
let uptimeInterval;
let startTime = Date.now();

class ScoreboardManager {
    constructor() {
        this.scoreboardElement = document.getElementById('scoreboard');
        this.isVisible = false;
        this.setupEventListeners();
        
        if (MODE === 'demo') {
            this.loadMockData();
        } else {
            this.loadFiveMData();
        }
        
        this.startUptimeCounter();
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F10') {
                e.preventDefault();
                this.toggle();
            }
        });
        
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            this.renderPlayers();
        });
    }
    
    toggle() {
        this.isVisible = !this.isVisible;
        if (this.isVisible) {
            this.scoreboardElement.classList.remove('hidden');
            if (MODE === 'fivem' && typeof window.SetCursorVisible === 'function') {
                window.SetCursorVisible(true);
            }
            this.renderPlayers();
        } else {
            this.scoreboardElement.classList.add('hidden');
            if (MODE === 'fivem' && typeof window.SetCursorVisible === 'function') {
                window.SetCursorVisible(false);
            }
        }
    }
    
    loadMockData() {
        players = mockPlayers;
        this.updatePlayerCount();
        this.renderPlayers();
    }
    
    loadFiveMData() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'updateScoreboard') {
                players = event.data.players;
                this.updatePlayerCount();
                this.renderPlayers();
            }
        });
        
        if (typeof window.SendNUIMessage === 'function') {
            window.SendNUIMessage({ type: 'requestPlayers' });
        }
    }
    
    updatePlayerCount() {
        const maxPlayers = 32;
        document.getElementById('playerCount').innerText = `${players.length}/${maxPlayers}`;
    }
    
    startUptimeCounter() {
        const updateUptime = () => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;
            document.getElementById('uptime').innerText = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };
        
        updateUptime();
        uptimeInterval = setInterval(updateUptime, 1000);
    }
    
    getFilteredPlayers() {
        let filtered = players;
        
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery) || 
                p.job.toLowerCase().includes(searchQuery)
            );
        }
        
        return filtered;
    }
    
    getAvatarInitial(name) {
        return name.charAt(0).toUpperCase();
    }
    
    getPingColor(ping) {
        if (ping < 50) return { class: 'ping-low', text: `${ping}ms` };
        if (ping < 100) return { class: 'ping-medium', text: `${ping}ms` };
        return { class: 'ping-high', text: `${ping}ms` };
    }
    
    renderPlayers() {
        const tbody = document.getElementById('playersList');
        const filteredPlayers = this.getFilteredPlayers();
        
        if (filteredPlayers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">
                        No players found
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = filteredPlayers.map(player => {
            const pingInfo = this.getPingColor(player.ping);
            return `
                <tr>
                    <td style="font-weight: 600; color: #dc2626;">${player.id}</td>
                    <td>
                        <div class="player-info">
                            <div class="player-avatar">${this.getAvatarInitial(player.name)}</div>
                            <div class="player-name ${player.isCurrent ? 'current-player' : ''}">
                                ${player.name}
                                ${player.isCurrent ? ' <span style="font-size: 10px;">(You)</span>' : ''}
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="job-badge">${player.job}</span>
                    </td>
                    <td>
                        <span class="${pingInfo.class}">${pingInfo.text}</span>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new ScoreboardManager();
});