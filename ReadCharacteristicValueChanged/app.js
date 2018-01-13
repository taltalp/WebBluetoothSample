const SERVICE_UUID = parseInt("0x180D");
const CHARACTERISTIC_UUID = parseInt("0x2A37");

function connectBLE(){
	console.log("Start setting connection with ble...");
	navigator.bluetooth.requestDevice({filters: [{services: [SERVICE_UUID]}]})
	.then(device => {
		return device.gatt.connect();
	})
	.then(server => {
		return server.getPrimaryService(SERVICE_UUID);
	})
	.then(service => {
		return service.getCharacteristic(CHARACTERISTIC_UUID);
	})
	.then(characteristic => {
		return characteristic.startNotifications()
		.then(char => {
			characteristic.addEventListener('characteristicvaluechanged', onValueChanged);
		});
	
	})
	.catch(error => {
		console.log("Error : " + error);
	});
}

function onValueChanged(event) {
	console.log('onValueChanged');
	let value = event.target.value.getInt8(1);
	console.log(value);
}
