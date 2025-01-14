<?php

use App\Models\Item;
use App\Models\CrateItem;
use App\Models\Inventory;
use App\Models\SiteSettings;
use Illuminate\Support\Facades\Cache;

function translations($json)
{
    if (!file_exists($json)) {
        return [];
    }

    return json_decode(file_get_contents($json), true);
}

function crateRarity($data, $rarity)
{
    switch ($data) {
        case 'rank':
            return CrateItem::rarityRank($rarity);
        case 'name':
            return CrateItem::rarityName($rarity);
    }
}

function pluralization($type, $plural = false)
{
    // Get item types configuration (consider error handling if not defined)
    $types = config('PermittedItemTypes');

    // Validate type and plural flag (optional)
    if (!is_string($type) || !is_bool($plural)) {
        throw new InvalidArgumentException('Invalid arguments for itemType');
    }

    $type = array_key_exists($type, $types) ? $types[$type][$plural ? 1 : 0] : ucfirst($type);

    // Handle missing plural form (optional)
    if (!$plural && !isset($types[$type][1])) {
        $type .= 's'; // Generic pluralization
    }

    return $type;
}


function customRaritySort($a, $b)
{
    $key = 'rarity';

    if ($a[$key] < $b[$key])
        return 1;
    else if ($a[$key] > $b[$key])
        return -1;

    return 0;
}

function site_setting($key)
{
    // Check if the app is in production environment
    $isProduction = app()->environment('production');

    if (!$isProduction) {
        // Check if the settings are cached
        $settings = Cache::remember('site_settings', now()->addMinutes(30), function () {
            return SiteSettings::find(1); // Change to use the find() method instead of where() + first()
        });
    } else {
        // If not in production, retrieve settings without caching
        $settings = SiteSettings::find(1);
    }

    // If settings are not found, return a default value or handle the error
    if (!$settings) {
        return null; // or return a default value or throw an exception
    }

    // Use optional chaining to access the property safely
    return optional($settings)->$key;
}

function getItemHash($itemID): ?string
{
    // Assuming your actual primary key column name is 'id'
    $item = Item::where('id', '=', $itemID)->firstOrFail();

    return $item->hash;
}

function remote_file_exists($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); # handles 301/2 redirects
    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($httpCode == 200) {
        return true;
    } else {
        return false;
    }
}
function shortNum($num) {
    if ($num < 999) {
        return $num;
    }
    else if ($num > 999 && $num <= 9999) {
        $new_num = substr($num, 0, 1);
        return $new_num.'K+';
    }
    else if ($num > 9999 && $num <= 99999) {
        $new_num = substr($num, 0, 2);
        return $new_num.'K+';
    }
    else if ($num > 99999 && $num <= 999999) {
        $new_num = substr($num, 0, 3);
        return $new_num.'K+';
    }
    else if ($num > 999999 && $num <= 9999999) {
        $new_num = substr($num, 0, 1);
        return $new_num.'M+';
    }
    else if ($num > 9999999 && $num <= 99999999) {
        $new_num = substr($num, 0, 2);
        return $new_num.'M+';
    }
    else if ($num > 99999999 && $num <= 999999999) {
        $new_num = substr($num, 0, 3);
        return $new_num.'M+';
    }
    else {
        return $num;
    }
}
function Version()
{
    $rev = exec('git rev-parse --short HEAD');
    return $rev;
      
}
