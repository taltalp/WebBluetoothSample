var ble_0 = new BlueJelly();
var ble_1 = new BlueJelly();

window.onload = function() {
    ble_0.setUUID("UUID0", parseInt("0x180D"), parseInt("0x2A37"));
    ble_1.setUUID("UUID1", parseInt("0x180D"), parseInt("0x2A37"));
}

ble_0.onRead = function(data, uuid){
    value = data.getInt8(1);
    console.log(value);
}

ble_1.onRead = function(data, uuid){
    value = data.getInt8(1);
    console.log(value);
}

document.getElementById('startNotifications0').addEventListener('click', function() {
    ble_0.startNotify('UUID0');
});

document.getElementById('startNotifications1').addEventListener('click', function() {
    ble_1.startNotify('UUID1');
});

document.getElementById('stopNotifications0').addEventListener('click', function() {
    ble_0.stopNotify('UUID0');
});

document.getElementById('stopNotifications1').addEventListener('click', function() {
    ble_1.stopNotify('UUID1');
});
