nunjucks.configure({
    autoescape: false,
    web: {
      async: false
    }
});

$(document).ready(function() {
  $.getJSON( "../mock/structure.json", function(data) {
    for (item in data.articles) {
          nunjucks.render('./partials/article.html', data.articles[item], function (err, res) {
                $('.js-articles').append(res);
            });
    }
  });
//   $("#phone").inputmask({
// "mask": "+9(999)999-99-99"
// });
});

