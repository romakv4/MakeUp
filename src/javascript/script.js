nunjucks.configure({
    autoescape: false,
    web: {
      async: false
    }
});

$(document).ready(function() {
console.log(5*9);
  $.getJSON( "../mock/structure.json", function(data) {
    console.log(5*6);
    for (item in data.articles) {
          nunjucks.render('./partials/article.html', data.articles[item], function (err, res) {
                $('.js-articles').append(res);
            });
    }
  });

});