local playersData = {}
local updateInterval = 1000
local maxPlayers = 32

function GetPlayerData(source)
    local player = {
        id = source,
        name = GetPlayerName(source),
        job = "Unemployed",
        jobLabel = "Unemployed",
        ping = GetPlayerPing(source),
        isCurrent = false
    }
    
    if exports.esx then
        local xPlayer = exports.esx:GetPlayerFromId(source)
        if xPlayer then
            local job = xPlayer.job
            player.job = job.name or "unemployed"
            player.jobLabel = job.label or "unemployed"
        end
    end
    
    if exports.qbCore then
        local QBCore = exports.qbCore:GetCoreObject()
        local Player = QBCore.Functions.GetPlayer(source)
        if Player then
            local job = Player.PlayerData.job
            player.job = job.name or "unemployed"
            player.jobLabel = job.label or "unemployed"
        end
    end
    
    return player
end

function UpdateScoreboardData()
    local players = {}
    local playersList = GetPlayers()
    
    for _, source in ipairs(playersList) do
        local playerData = GetPlayerData(source)
        table.insert(players, playerData)
    end
    
    for _, source in ipairs(playersList) do
        local playerDataForClient = {}
        for _, player in ipairs(players) do
            local playerCopy = table.copy(player)
            playerCopy.isCurrent = (player.id == source)
            table.insert(playerDataForClient, playerCopy)
        end
        
        TriggerClientEvent('scoreboard:updateData', source, playerDataForClient)
    end
end

function table.copy(t)
    local copy = {}
    for k, v in pairs(t) do
        copy[k] = v
    end
    return copy
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(updateInterval)
        UpdateScoreboardData()
    end
end)

RegisterCommand('scoreboard', function(source)
    TriggerClientEvent('scoreboard:toggle', source)
end, false)

RegisterNetEvent('scoreboard:requestData')
AddEventHandler('scoreboard:requestData', function()
    local source = source
    local players = {}
    local playersList = GetPlayers()
    
    for _, playerSource in ipairs(playersList) do
        local playerData = GetPlayerData(playerSource)
        playerData.isCurrent = (playerSource == source)
        table.insert(players, playerData)
    end
    
    TriggerClientEvent('scoreboard:updateData', source, players)
end)

local serverStartTime = os.time()
exports('GetServerUptime', function()
    return os.time() - serverStartTime
end)

print("^2[Scoreboard] Server script loaded successfully!^7")