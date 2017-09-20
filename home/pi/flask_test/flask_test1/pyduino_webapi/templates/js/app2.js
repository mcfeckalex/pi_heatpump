	console.log('Hello World!');

	// Short name for Nordic BLE library.
	var nordicble = evothings.nordicble;
 
	// Application object.
	var app = {};

	// Connected device.
	app.device = null;

	//Variable to store MAC-address
	var MAC;
	//Variable to store RSSI value
	var RSSI;
	//Variable ID for periodic read of RSSI 
	var intervalID;  
	
	var speedlimit=30;
	
	var speed;
	
	var VOLTAGE; 
	
	var state=-1;
	
	
	app.speedUp=function speed10up() 
	{
    document.getElementById("speedometer").stepUp(10);
	}
	
		app.speedDown=function speed10up() 
	{
    document.getElementById("speedometer").stepDown(10);
	}
	 
	 
	app.selectCallback = function() 
	{
		var id = document.getElementById("speedlimit"); 
		speedlimit = id.options[id.selectedIndex].value;
		var id1 = document.getElementById("speedometer");
		console.log(speedlimit);
		if (speedlimit==30)
		{
			id.style.backgroundImage="url(30.jpg)";  
			speedlimit=30;
			id1.max=speedlimit*1.5;
			
			
			
			
		}
		else if (speedlimit==50)
		{
			id.style.backgroundImage="url(50.png)"; 
			speedlimit=50;
			id1.max=speedlimit*1.5;
			//id1.min=speedlimit*1.5-45;
			
		}
		else if (speedlimit==70)
		{
			id.style.backgroundImage ="url(70.png)"; 
			speedlimit=70;
			id1.max=speedlimit*1.5;
			//id1.min=speedlimit*1.5-45;
		}
		else if (speedlimit==90)
		{
			id.style.backgroundImage = "url(90.png)"; 
			speedlimit=90;
			id1.max=speedlimit*1.5;
			//id1.min=speedlimit*1.5-45;
		}
	}
	
	
	app.setSpeed =function()
	{
		var id = document.getElementById("speedometer");
		id.value = "0";
		app.rangeHandler();
	}
	
	
	app.rangeHandler = function ()
	{
		var id = document.getElementById("speedometer");
		var id1 = document.getElementById("speed");
		
		speed=id.value;
		 
		//console.log(speed);
		console.log(speedlimit);
		
		console.log('state '+state);
		
		if (speed<=speedlimit)
		{
			$('#speed').html(speed+'km/h'); 
			id1.style.color = 'green'; 
			//console.log(speed);
			if (state!=0 && app.device!=null)
			{
				app.stateGreen(); 
				console.log('green');
				state=0; //green state
			}
			
		}
		
		else if (speed >speedlimit && speed <=speedlimit+5)
		{
			$('#speed').html(speed+'km/h'); 
			id1.style.color = 'rgb(253,216,0)';
			if (state!=1 && app.device!=null)
			{
				app.stateYellow();
				state=1; //yellow state
				console.log('YELLOW');
			}
			
		}
		
		else if (speed >speedlimit+5 && state!=0)
		{
			$('#speed').html(speed+'km/h'); 
			id1.style.color = 'red';
			if (state!=2 && app.device!=null)
			{
				app.stateRed();
				state=2; //red state
				console.log('RED');
			}
		}
	
	clearInterval(intervalID);  
	}

	
	
	//****************** Function to get RSSI value**********
	//Reads RSSI from characterisic and stores in varialbe RSSI
	app.getRSSI = function()
	{
		
	if (app.device != null)
		{	
		evothings.ble.rssi(
		app.device.deviceHandle,
		function(rssi)
		{
			RSSI = rssi;
			console.log(RSSI);
		},
		function(errorCode)
		{
			console.log('Error!');
			// RSSI errors may occur now and then, we just ignore them.
		});
		}
		else
		{
			clearInterval(intervalID);
			console.log('timer cleared!')
		}
		app.showRSSI();
	}
	
	//****************** Function write RSSI vaule to html document**********
	//writes RSSI from variable RSSI to any element in HTML document with ID "RSSI"
	//If RSSI is lower then 60dB color is set to red, otherwise green
	
	app.showRSSI = function()
	{		
	
		var div = document.getElementById("RSSI");  // Access all <H1> present in your body.
		
		if (RSSI < -60 && app.device!=null)
		{
			$('#RSSI').html('Device RSSI: '+RSSI);
			div.style.color = 'red';
		}
		
		else if (RSSI >= -60 && app.device!=null)
		{
			$('#RSSI').html('Device RSSI: '+RSSI); 
			div.style.color = 'green';
		}
		
	};
	 
	//****************** Function to set periodical call of a function**********
	//Runs getRSSI every 2.5 seconds
	app.setInterval = function()
	{
		intervalID=setInterval(app.rangeHandler(), 2000);  //
		console.log('interval');
	}	
	
	app.deviceLog= function()
	{
		console.log(app.device);
	};
	
	//****************** Function to set Green LED state**********
		
	app.stateGreen = function()
	{
		
		app.device && app.device.writeDataArray(new Uint8Array([0x00]));
	};	
	
	//****************** Function to set Yellow LED state**********
		
	app.stateYellow = function()
	{
		
		app.device && app.device.writeDataArray(new Uint8Array([0x01]));
	};	
		
	//****************** Function to set Red LED state**********
		
	app.stateRed = function()
	{
		
		app.device && app.device.writeDataArray(new Uint8Array([0x02]));
	};	
	
	//****************** Function to set Unknown LED state**********
		
	app.stateUnknown = function()
	{
		
		app.device && app.device.writeDataArray(new Uint8Array([0x03]));
	};	
		app.readCrypto = function()
	{
		app.device && app.device.readDataArray();
	};	
	
	
		app.readVoltage = function()
{
	function onDataReadSuccess(data)
	{
		var cryptoStr = "";
		var crypto = new Uint8Array(data);
		
		console.log(crypto[0].toString()); 
		
		for (var i = 0; i < crypto.length; i+=1)
		{
			
			cryptoStr=cryptoStr.concat(crypto[i].toString(16));
			//console.log(crypto[i].toString()); 
		}
		
		console.log('Device Crypto: ' + cryptoStr);
		document.getElementById('voltage').innerHTML = 'V: \n' +cryptoStr+'%'; 
		
		VOLTAGE = cryptoStr;
		
	}

	function onDataReadFailure(errorCode)
	{
		console.log('Failed to read crypto with error: ' + errorCode);
		app.disconnect();
	}

	app.device.readCharacteristic('00002A19-0000-1000-8000-00805F9B34FB', onDataReadSuccess, onDataReadFailure);
};
	1 
		
	
	app.showMessage = function(info)  
	{
		$('#info').html(info);
	};
	
	app.showLog = function(log)  
	{
		$('#log').html(log);
	};
	
	app.showConnected = function(info)  
	{
		$('#connected').html(info);
	};
	
	
	
	app.showName = function(name)
	{
		$('#Name').html(name);
	};
	
	app.showMAC = function(mac)
	{
		$('#MAC').html(mac);
	};

	app.showData = function(data)
	{
		$('#data').html(data);
	};
	
	// Called when BLE and other native functions are available.
	app.onDeviceReady = function()
	{
		app.showMessage('Press START CAR.');
		app.setSpeed();
		
	};
	
	// Called when BLE and other native functions are available.
	app.onDevicePause = function()
	{
		
		nordicble.close();
			app.device = null;
			app.showConnected('Disconnected.');
						
			$('#button-connect').html('START CAR');
			state=-1;
		
	};

	app.connectOrDisconnect = function()
	{
		if (app.device == null)
		{
			app.connect();
			$('#button-connect').html('STOP CAR');
			app.setInterval();
			
		} 
		else   
		{ 
			nordicble.close();
			app.device = null;
			app.showConnected('Disconnected.');
						
			$('#button-connect').html('START CAR');
			state=-1;
			
	
		}
	};

	app.connect = function()
	{
		//nordicble.close();
		//console.log(device.address)

		app.showMessage('Scanning...');

		nordicble.connect(
     		'Delfinen', // BLE name
			function(device)
			{
				app.device = device;
				console.log(app.device.name);
				app.showConnected('Connected!');
				console.log('found device: ' + device.name);
				app.showMessage('Press buttons to interact with delfinen');
				
				

				device.setNotification(function(data)
				{
					
				});
				
				app.device = device;
			},
			function(errorCode)
			{
				app.showMessage('Connect error: ' + errorCode + '.');
			});
			
			
	};

	document.addEventListener('deviceready', app.onDeviceReady, false);
	document.addEventListener("pause", app.onDevicePause, false);
	