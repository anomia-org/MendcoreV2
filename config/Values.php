<?php

return [
    'name' => 'Netisu',
    'logo' => '/assets/img/logo.png',
    'icon' => '/assets/img/icon.png',
    'in_event' => true,
    'system_account_id' => 1,
    'in_testing_phase' => true,
    'loading_messages' => false,

    'frontend' => [
        'page_loader' => false,
        'sidebar_menu' => true,
        'search_bar' => true,
    ],
    
    'price' => [
        'username' => '250',
    ],
    
    'production' => [
        'domains' => [
            'main' => 'https://netisu-backup.test',
            'storage' => 'https://cdn.test',
            'api' => 'https://netisu-backup.test',
            'careers' => 'https://careers.netisu-backup.test',
        ],
    ],
    
    'shop' => [
        'previews_enabled' => true,
        'preview_types' => ['hat', 'addon', 'face', 'tool']
    ],

    'socials' => [
        'discord' => 'https://discord.gg/netisu',
        'twitter' => '',
        'twitch' => '',
        'tiktok' => '',
        'facebook' => ''
    ],
];
