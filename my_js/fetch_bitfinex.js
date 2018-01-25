//----------------html frontend method-------------------
var w  = new WebSocket('wss://api.bitfinex.com/ws/2');
var status_List = {};
var record_List = {};
var index_List = {};
var originalColor = 0;
//TODO combine these Lists

w.onopen = function() {
  //url: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tLTCUSD,tDSHUSD,tXRPUSD,tRRTUSD,tZECUSD,tXMRUSD,tBCCUSD,tETCUSD,tBCUUSD,tIOTUSD,tEOSUSD,tSANUSD,tOMGUSD,tBCHUSD,tNEOUSD,tETPUSD,tQTMUSD,tBT1USD,tBT2USD,tAVTUSD,tEDOUSD,tBTGUSD,tDATUSD,tQSHUSD,tYYWUSD",
  w.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "symbol":"tBTCUSD"}));
  w.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "symbol":"tETHUSD"}));
  w.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "symbol":"tLTCUSD"}));
  w.send(JSON.stringify({"event":"subscribe", "channel":"ticker", "symbol":"tXRPUSD"}));
};

w.onmessage = function(msg) {
  //-----Distinguish the pair ID-----//
  var res = msg.data;
  if(res.indexOf("channel") !== -1) { 
    var index_Data = JSON.parse(res);
    var symbol = index_Data.symbol.replace("t","").replace("USD","");
    var id = index_Data.chanId;
    index_List[id] = symbol;
    status_List[id] = 0; //0 == init, 1 == green, 2 == red 
    record_List[id] = 0; //0 == init
  }
  //-----Extract the numbers-----//
  else if(res.indexOf("event") === -1 && res.indexOf("hb") === -1) {  
    res = res.replace(/\[/g,'');
    res = res.replace(/\]/g,'');
    res = res.replace(/\"/g,'');
    var Nums = res.split(",");
    if(index_List[Nums[0]] !== undefined) {
      var id = Nums[0];
      var token = index_List[id];
      var change_per = Nums[6];

      document.getElementById(token+"_num").innerHTML = Math.round(Nums[7]*100)/100;
      document.getElementById(token+"_per").innerHTML = Math.round(Nums[6]*10000)/100 + "%";

      if(Nums[7] - record_List[id] > 0 && record_List[id] !== 0) {
        record_List[id] = Nums[7];
        flashing_color(token+"_num", "green");
      }
      else if(Nums[7] - record_List[id] < 0 && record_List[id] !== 0) {
        record_List[id] = Nums[7];
        flashing_color(token+"_num", "red");
      }
      else if(record_List[id] === 0) {
        record_List[id] = Nums[7];
        originalColor = document.getElementById(token+"_num").style.color;
      }

      if(change_per >= 0 && status_List[id] !== 1) {
        status_List[id] = 1;
        document.getElementById(token+"_per").style.color = "green";
      }
      else if(change_per < 0 && status_List[id] !== 2) {
        status_List[id] = 2;
        document.getElementById(token+"_per").style.color = "red";
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function flashing_color(id, color) {
  document.getElementById(id).style.color = color;
  //await sleep(200);
  sleep(750).then(() => {
    document.getElementById(id).style.color = originalColor;
  });
}
