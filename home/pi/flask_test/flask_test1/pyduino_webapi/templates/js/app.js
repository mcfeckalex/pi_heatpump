var app = {isCordova: typeof cordova !== 'undefined',
messages: {
title: "Delfin",
order: "Order"
}}

app.initialize = function(){
console.log('app initializing');
app.delfinView.initialize();
}
app.bindEvents =  function() {
if(app.isCordova){
document.addEventListener('deviceready', app.onDeviceReady, false);
}
}

app.onDeviceReady = function() {
console.log('deviceready');
FastClick.attach(document.body);
}
app.delfinView = new delfinView() ;
