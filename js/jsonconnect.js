// jsonconnect live event
$.getJSON('https://blacktvreborn.my.id/database/liveevent/liveevent.json', 
function(result) {
  let event = result.event;
  //console.log(event);

  $.each(event, function(i, result) {
    $('#liveevent').append('<div onclick="' + result.url + '()" class="live-event_item"><img src="' + result.poster + '" class="live-event_image" /><h3><span>' + result.tanggal + '</span></h3><h4><span>' + result.jam + '</span></h4></div>');
  });
});

// jsonconnect Popular tv
$.getJSON('https://dl.dropbox.com/scl/fi/d0jg026d18u3yey8gzv0n/acarafavorit.json?rlkey=a5jvkpmpvh0kmt19g8mkq3vrk&dl=0', 
function(result) {
  let acara = result.acara;
  //console.log(event);

  $.each(acara, function(i, result) {
    $('#acara').append('<div onclick="' + result.url + '()" class="acaratv_item"><img src="' + result.poster + '" class="acaratv_image" /><h3><span>' + result.tanggal + '</span></h3><h4><span>' + result.jam + '</span></h4></div>');
  });
});

// jsonconnect thai tv
$.getJSON('https://dl.dropbox.com/scl/fi/wphga1pv9havwzy80bd7t/thaitv.json?rlkey=wy5n0qswebv9tetq2uapvea0t&dl=0', 
function(result) {
  let thaitv= result.thaitv;
  //console.log(event);

  $.each(thaitv, function(i, result) {
    $('#thaitv').append('<div onclick="' + result.url + '()" class="thaitv_item"><img src="' + result.poster + '" class="thaitv_image" /><h3><span>' + result.ch + '</span></h3><h4><span>' + result.jam + '</span></h4></div>');
  });
});

// jsonconnect sportlist
$.getJSON('', 
function(result) {
  let sportlist = result.sportlist;
  //console.log(sportlist);

  $.each(sportlist, function(i, result) {

    $('#sportlist').append('<div class="sportlist_item"><a href="go:' + result.url + '" class="stretched-link"><img src="' + result.poster + '" class="sportlist_image" /></a></div>');

  });
});

// jsonconnect ustv
// $.getJSON('https://dl.dropbox.com/scl/fi/g8db829526qxyh4y8s85c/thaitv.js?rlkey=vbxfi8216adp5x3eeepw7a9zx&dl=0', 
// function(result) {
//   let ustv = result.ustv;
//   console.log(ustv);

//   let kategory = 'popular';
//   $.each(ustv, function(i, result) {
//     if (kategory = result.kategori) {
//       $('#ustv').append('<div id="' + result.id + '" class="sportlist_item"><img src="' + result.logo + '" class="tv_image"></div>');
//       $('#' + result.id + '').click(function() {
//         document.getElementById("objek").innerHTML = '<iframe src="intent://' + result.url + '?|referer=' + result.ref + '&User-Agent=' + result.useragent + '#Intent;scheme=' + result.protokol + ';type=video/*;package=com.genuine.leone;S.browser_fallback_url=market://details?id=com.genuine.leone.ad;S.title=NGTV;end" height="0" width="0" style="border:none;display:none;" title="SS Sport"></iframe>'
//       });
//     }

//   });
// });

//json connect movies
$.getJSON('https://dl.dropbox.com/scl/fi/l9b2qmwg4v8y1nv1xoehp/movies.json?rlkey=952a2wcj2im3k8jwnil99c0nt&dl=0', function(result) {
  let movies = result.movies;
  //console.log(movies);

  let conten = '';

  $.each(movies, function(i, result) {
    if (i > 15) {
      return;
    }

    $('#movies').append('<div id="' + result.kode + '" class="movies_item"><img src="' + result.poster + '" class="movies_image"></div>');
    //conten += '<div id="' + result.kode + '" class="item"><img src="' + result.poster + '"></div>'
    $('#' + result.kode + '').click(function() {
      document.getElementById("objek").innerHTML = '<iframe src="' + result.url + '" height="0" width="0" style="border:none;display:none;" title="SS Sport"></iframe>'
    });

  });
});

//json connect series
$.getJSON('https://dl.dropbox.com/scl/fi/iddno638uv8ls9iwrrkk3/series.json?rlkey=g5jnkuh18qsjmxvp72oma0kgx&dl=0', function(result) {
  let series = result.series;
  //console.log(series);

  let conten = '';

  $.each(series, function(i, result) {
    if (i > 8) {
      return;
    }

    $('#series').append('<div id="' + result.kode + '" class="movies_item"><img src="' + result.poster + '" class="movies_image"></div>');
    //conten += '<div id="' + result.kode + '" class="item"><img src="' + result.poster + '"></div>'
    $('#' + result.kode + '').click(function() {
      location.href = 'go:' + result.url + '';
    });

  });
});

//jsonconnect indonesia movies
let kategori = 'indonesia';
$.getJSON('https://dl.dropbox.com/scl/fi/l9b2qmwg4v8y1nv1xoehp/movies.json?rlkey=952a2wcj2im3k8jwnil99c0nt&dl=0', function(result) {
  let movies = result.movies;
  let conten = '';
  let j = 0;
  //console.log(result);
  $.each(movies, function(i, result) {
    if (result.kategori == kategori) {
      if (j > 9) {
        return;
      }
      j++;
      //console.log(result.kode);
      $('#indonesia').append('<div id="' + result.kode + '" class="movies_item"><img src="' + result.poster + '" class="movies_image"></div>');
      //conten += '<div id="' + result.kode + '" class="item"><img src="' + result.poster + '"></div>'
      $('#' + result.kode + '').click(function() {
        document.getElementById("objek").innerHTML = '<iframe src="' + result.url + '" height="0" width="0" style="border:none;display:none;" title="SS Sport"></iframe>'
      });
    }
  });
});
