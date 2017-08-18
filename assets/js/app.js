jQuery(document).ready(function($){
    var stocks = [];

    if(stocks.length==0){
      $('#stock-tiles').html('<p id="no-stocks">No Stocks yet!</p>');
    }
  
$('#add-symbol').click(function() {
        var symbol = $('input[id=symbol]').val().toUpperCase(); 
        var name = "",
            change ="",
            percentchange="",
            daysLow ="",
            daysHigh="",
            price ="";
        var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22' + symbol + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
        $.getJSON(url, function(data) {           
                var res = data.query.results.quote;

            if(res.Name==null||res.LastTradePriceOnly==null){
                alert(symbol+ " is not a valid symbol! Please check the value entered.");
                $('#symbol').val('');    
            }
            else{
                name = res.Name;
                change = parseFloat(res.Change).toFixed(2);
                percentchange = parseFloat(res.PercentChange).toFixed(2);
                daysHigh = parseFloat(res.DaysHigh).toFixed(2);
                daysLow = parseFloat(res.DaysLow).toFixed(2);
                price = parseFloat(res.LastTradePriceOnly).toFixed(2);
                
                if(jQuery.inArray(symbol,stocks)!==-1){
                    alert("Stock symbol already exists!");
                    $('#symbol').val('');
                }
                else{
                    $('#no-stocks').text('');
                   stocks.push(symbol);
            
                    var pointerpos = ((daysHigh - price) / (daysHigh - daysLow)) * 100 - 20;
                    var compName = $('<p class="cname">'+name+'</p> <p class="symbol">'+symbol+'</p>');
                    var changePerc= $('<p id="change-percent" class="change">'+ (change)+'('+percentchange+'%) </p>');
                    var tradePrice= $('<p class="price">$'+ price+'</p>');
                    var lowHigh = $('<div id="high-low" class = "trade-price"><div class="pointer" style="top:'+ pointerpos + 'px">&#9658;</div> <div class="price-scale"><div class="days-high "> $'+daysHigh+'</div><div class="days-low"> $'+daysLow+'</div></div></div>');
                    
                    var div = $("<div/>", { "class":"symb-details" })
                    .append(compName)
                    .append(changePerc)
                    .append(tradePrice);
            
                    $('#product'+symbol+' #high-low .pointer').attr('style', 'top:' + pointerpos + 'px');

                    var tiles = $("<div/>", { "class":"tiles", id:"product"+symbol })
                    .append(div)
                    .append(lowHigh);

                    $('#stock-tiles').append(tiles);
                    
                    if(percentchange<0){
                        $('#product'+symbol+' #change-percent').addClass('red');
                        $( '#product'+symbol+' #change-percent' ).prepend( '&#9660;');
                    }
                    else{
                        $('#product'+symbol+' #change-percent').addClass('green');
                        $( '#product'+symbol+' #change-percent' ).prepend( '&#9650;' );
                    }
         
                    $('#symbol').val('');
                }
            }
          
        });
    });
});

