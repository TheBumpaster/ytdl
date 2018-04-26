$(document).ready(function() {
  //

  $('form').on('submit', function(e) {
    e.preventDefault();

    var videolink = $('input[name=video]').val();
    var informat = $('select[name=format]').val();
    let starttime;

    console.log(videolink);
    console.log(informat);

    if(!videolink) {
      console.log("No video link!");
    }

    $.when(ytdl.getInfo(videolink)).then(function(data) {

      console.log("info callback then do smth");
      console.log(data);

      console.log("using filter format: " + informat );

      var video = ytdl(videolink, { filter: (format) => format.container === informat });

      video.pipe(fs.createWriteStream('downloads/'+data.video_id+'.'+informat));

      console.log('Output to: downloads/'+data.video_id+'.'+informat);

      video.once('response', () => {
        starttime = Date.now();
        console.log("Download started at: " + starttime);
      });

      video.on('progress', (chunkLength, downloaded, total) => {
        const floatDownloaded = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        readline.cursorTo(process.stdout, 0);

        console.log((floatDownloaded*100).toFixed(2) + '% downloaded!');
        console.log((downloaded / 1024 / 1024).toFixed(2) + 'MB of ' + (total / 1024 / 1024).toFixed(2) + 'MB ');
        console.log((downloadedMinutes/floatDownloaded - downloadedMinutes).toFixed(2) + "minutes");
        var bar_value = floatDownloaded * 35;
        $('.progress-bar ').css({width: bar_value +"em"});
        readline.moveCursor(process.stdout, 0, -1);
      });

      video.on('end', () => {
        $('#results').append("<li>"+data.title+" - <a href='downloads/"+data.video_id+"."+informat+"' download>Save</a></li>");
        $('.progress-bar').css({width: '0em'});
        console.log('End of file write stream.');
      });

    });

  });

});
