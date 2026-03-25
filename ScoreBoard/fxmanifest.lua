fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Modern Scoreboard with Dark Red Theme'
version '1.0.0'

ui_page 'html/index.html'

client_scripts {
    'client.lua'
}

server_scripts {
    'server.lua'
}

files {
    'html/index.html',
    'html/style.css',
    'html/script.js'
}

-- پشتیبانی از فریمورک‌ها
shared_scripts {
    '@es_extended/imports.lua',
    '@qb-core/import.lua'
}

-- یا اگر از فریمورک خاصی استفاده می‌کنی:
-- dependencies {
--     'es_extended',
--     'qb-core'
-- }