var date = null;
var zone = "Asia/Taipei";

(function (jQuery) {
  var datetime = null;

  var update = function () {
    date = moment.tz(new Date(), zone);

    datetime.html(date.format('HH:mm'));
    datetime4.html(date.format('ss'));
    //datetime2.html(date.format('dddd, MMMM Do YYYY'));
    datetime2.html(date.format('dddd, MMMM Do'));
  };

  $(document).ready(function () {
    datetime = $('.time h1');
    datetime4 = $('.time h3');
    datetime2 = $('.time p');
    update();
    setInterval(update, 1000);
  });
})(jQuery);
function toTimeZone(new_zone) {
  zone = new_zone;
}
