function GP_UUID(shortId : string) : string {
    return `b5f9${shortId}-aa8d-11e3-9046-0002a5d5c51b`
}
  
const GPBLE_CONSTANTS = {
    COMPANY_IDENTIFIER : 0x02F2,

    WIFI_AP_SERVICE : GP_UUID('0001'),
    WIFI_AP_SSID_CHARACTERISTIC : GP_UUID('0002'),
    WIFI_AP_PASSWORD_CHARACTERISTIC : GP_UUID('0003'),
    WIFI_AP_POWER_WRITE_CHARACTERISTIC : GP_UUID('0004'),
    WIFI_AP_STATE_CHARACTERISTIC : GP_UUID('0005'),

    CAMERA_MANAGEMENT_SERVICE : GP_UUID('0090'),
    NETWORK_MANAGEMENT_COMMAND : GP_UUID('0091'),
    NETWORK_MANAGEMENT_RESPONSE : GP_UUID('0092'),

    CONTROL_QUERY_SERVICE : '0000fea6-0000-1000-8000-00805f9b34fb',

    COMMAND : GP_UUID('0072'),
    COMMAND_RESPONSE : GP_UUID('0073'),
    SETTINGS : GP_UUID('0074'),
    SETTINGS_RESPONSE : GP_UUID('0075'),
    QUERY : GP_UUID('0076'),
    QUERY_RESPONSE : GP_UUID('0077'),

    //////
    COMMAND_AP_OFF : new Uint8Array([0x03, 0x17, 0x01, 0x00]),
    COMMAND_AP_ON  : new Uint8Array([0x03, 0x17, 0x01, 0x01]),
    COMMAND_GET_CAMERA_INFO :  new Uint8Array([0x01, 0x3C])
    
}

export { GP_UUID, GPBLE_CONSTANTS }