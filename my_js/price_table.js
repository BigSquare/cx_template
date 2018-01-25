var db = firebase.database();
var market_rank = db.ref('/coinmarketcap');

market_rank.on('value', function(snapshot) {
  var table = jQuery('.js-dataTable-full-pagination').dataTable().api();
  var str = "";

  if(table.data().length !== 0) {table.clear(); console.log('table updated');}
  for(var i=0; i<100; i++) {
    var data = snapshot.child(i).val();
    str+='<tr><td class="text-center">'+(i+1)+"</td>";
    str+='<td class="font-w600"><h4><span><img src="assets/img/coin_icon/'+data.symbol+'.png" style="width: 20px" alt=""></span> ';
    str+=data.name+'</h4></td>';                      
    str+='<td>$'+addCommas(Math.round(Number(data.market_cap_usd)))+'</td>';   
    str+='<td><a href="#">$'+data.price_usd+'</a></td>';                
    str+='<td>$'+addCommas(Math.round(Number(data["24h_volume_usd"])))+'</td>';   
    str+='<td>'+data.available_supply+'</td>';  
    str+='<td class="text-center"><font color="'+(data.percent_change_24h>0?'green':'red')+'">'+data.percent_change_24h+'%</font></td></tr>';
    //table.row.add($(str)).draw();
  }
  table.rows.add($(str)).draw();
  //console.log(table.data()[0]); //count == cell num
});

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
