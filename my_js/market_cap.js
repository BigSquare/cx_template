var db = firebase.database();
var market_rank = db.ref('/coinmarketcap');

market_rank.on('value', function(snapshot) {

  var total_vol = Number(snapshot.child('global').val().total_24h_volume_usd);
  var total_cap = Number(snapshot.child('global').val().total_market_cap_usd);
  var btc_percent = snapshot.child('global').val().bitcoin_percentage_of_market_cap;
  total_vol = Math.round(total_vol / 10000000) / 100; //billion
  total_cap = Math.round(total_cap / 10000000) / 100;
  document.getElementById('total_vol').innerHTML = '$' + total_vol.toString() + 'B';
  document.getElementById('total_cap').innerHTML = '$' + total_cap.toString() + 'B';
  document.getElementById('btc_cap_per').innerHTML = btc_percent + '%';

  var table = document.getElementById('market_ranking').getElementsByTagName('tbody')[0];

  //Initialize the table with 16 rows 
  if(table.rows.length === 0) {
    for(var i=0; i<16; i++) {
      var row = table.insertRow(i); //<tr>
      var cap = '$' + addCommas(Math.round(Number(snapshot.child(i).val().market_cap_usd)/1000000)) +'M';  //million
      var vol = '$' + addCommas(Math.round(Number(snapshot.child(i).val()["24h_volume_usd"])/1000000)) + 'M'; 
      var  id = snapshot.child(i).val().name;
      var content = [id, cap, vol];
      var _class   = ['font-w600', 'hidden-xs text-left', 'font-w600 text-success text-center'];

      for(var j=0; j<3; j++) {
        var cell = row.insertCell(j); //<td>
        if(j === 0)
          cell.innerHTML = '<a href="javascript:void(0)">' + content[j] + '</a>';
        else
          cell.innerHTML = content[j];
        cell.className = _class[j];
      }
    }
  }
  //Update the inserted data
  else {
    var rows_num = table.rows.length;
    for(var i=0; i<rows_num; i++) {
      var cap = '$' + addCommas(Math.round(Number(snapshot.child(i).val().market_cap_usd)/1000000)) +'M';  //million
      var vol = '$' + addCommas(Math.round(Number(snapshot.child(i).val()["24h_volume_usd"])/1000000)) + 'M'; 
      var  id = snapshot.child(i).val().name;
      var content = [id, cap, vol];

      for(var j=0; j<3; j++) {
        if( j === 0)
          table.rows[i].cells[j].innerHTML = '<a href="javascript:void(0)">' + content[j] + '</a>';
        else
          table.rows[i].cells[j].innerHTML = content[j];
      }
    }
  }
});

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
