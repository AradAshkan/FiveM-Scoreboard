local isScoreboardOpen = false
local nuiReady = false

function SendDataToNUI(players)
    SendNUIMessage({
        type = 'updateScoreboard',
        players = players
    })
end

RegisterNetEvent('scoreboard:updateData')
AddEventHandler('scoreboard:updateData', function(players)
    SendDataToNUI(players)
end)

RegisterNetEvent('scoreboard:toggle')
AddEventHandler('scoreboard:toggle', function()
    if isScoreboardOpen then
        SendNUIMessage({ type = 'close' })
        SetNuiFocus(false, false)
        isScoreboardOpen = false
    else
        SendNUIMessage({ type = 'open' })
        SetNuiFocus(true, true)
        isScoreboardOpen = true
        
        TriggerServerEvent('scoreboard:requestData')
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if IsControlJustPressed(0, 121) then -- F10
            TriggerEvent('scoreboard:toggle')
        end
    end
end)

RegisterNUICallback('requestPlayers', function(data, cb)
    TriggerServerEvent('scoreboard:requestData')
    cb('ok')
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
    isScoreboardOpen = false
    cb('ok')
end)

RegisterNUICallback('nuiReady', function(data, cb)
    nuiReady = true
    cb('ok')
end)

print("^2[Scoreboard] Client script loaded! Press F10 to open scoreboard^7")