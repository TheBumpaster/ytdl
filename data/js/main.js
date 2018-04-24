$(document).ready(function() {
  //

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

      var download = ytdl.downloadFromInfo(info, { filter: (format) => format.container === 'mp4' });

      download.pipe(fs.createWriteStream('downloads/'+info.video_id+'.mp4'));

      download.on('finish', () => {
        console.log('All downloaded!');

        $('#results').append("<li>"+info.title+" - <a href='/downloads/"+info.video_id+".mp4' download>Download </a></li>");
      })

    });

  });

});
