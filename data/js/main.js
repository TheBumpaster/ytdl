$(document).ready(function() {
  //

  function download(url) {

    ytdl(url, { filter: (format) => format.container === 'mp3' })
  .pipe(fs.createWriteStream('video.mp3'));

  }

  $('form').on('submit', function(e) {
    e.preventDefault();
    var videolink = $('input[name=video]').val();
    console.log(videolink);
    
    if(!videolink) {
      console.log("No video link!");
    }

    ytdl.getInfo(videolink, function(err, info) {
      let starttime;

      if(err) {
        throw err;
      }

      $('#results').append("<li>"+info.title+" - <a href='/downloads/"+info.video_id+".mp4' download>Download </a></li>");

      var download = ytdl.downloadFromInfo(info, { filter: (format) => format.container === 'mp4' });

      download.pipe(fs.createWriteStream('downloads/'+info.video_id+'.mp4'));

      download.once('response', () => {
        starttime = Date.now();
      });

      download.on('progress', function(chunkLength, downloaded, total) {
        var floatDownloaded = downloaded/total;
        var downloadedMinutes = ( Date.now() - starttime ) / 1000 / 60;

        console.log(downloadedMinutes / floatDownloaded - downloadedMinutes)
      });

    });

  });

});
