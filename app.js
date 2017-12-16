const SERVICE_UUID = "";
const CHARACTERISTIC_UUID = "";

function connectBLE(){
	console.log("Start setting connection with ble...");
	navigator.bluetooth.requestDevice({
		acceptAllDevices:true, optionalServices:[SERVICE_UUID]})
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
			characteristic.addEventListner('characteristicvaluechanged', onValueChanged);
		});
	
	})
	.catch(error => {
		console.log("Error : " + error);
	});
}

function onValueChanged(event) {
	console.log('onValueChanged');
	let value = String.fromCharCode(event.target.value.getInt8(0));
	console.log(value);
}
