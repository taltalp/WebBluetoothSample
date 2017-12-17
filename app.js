const SERVICE_UUID = "000b0001-0010-0080-0000-8-5f9b34fb00";
const CHARACTERISTIC_UUID = "000b0002-0010-0080-0000-8-5f9b34fb00";

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
