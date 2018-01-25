(function worker() {
  $.when(
    $.ajax({
      url: 'https://api.blockchain.info/stats',
      data: "cors=true",
      dataType: 'json',
      type: 'GET',
      success: function(res, status) {
        $("#hash_rate").text(res.hash_rate + " GH/s");
        $("#n_block").text(res.n_blocks_mined);
        $("#duration").text(res.minutes_between_blocks + " minutes");
        $("#size").text(res.blocks_size);
        $("#height").text(res.nextretarget);
        $("#revenue").text("$ " + res.miners_revenue_usd);
        $("#n_bitcoin").text(res.n_btc_mined);
        $("#difficulty").text(res.difficulty);
        $("#tx_fees").text(res.total_fees_btc/100000000 + " BTC");
        $("#n_tx").text(res.n_tx);
        $("#cost_tx").text("$ "+ Math.round((res.total_fees_btc/1000000)*(res.market_price_usd)/res.n_tx)/100);
        $("#fee_per").text(Math.round(res.total_fees_btc*res.market_price_usd/10000/res.miners_revenue_usd)/100 + " %");
      },
      error: function(err, status) {
        console.log(err);
      }
    }) 
  ).then( function() {
    setTimeout(worker, 60000);
  });
})();
