$(document).ready(function() {
  //

  $('form').on('submit', function(e) {
    e.preventDefault();

    var videolink = $('input[name=video]').val();
    let starttime;

    console.log(videolink);

    if(!videolink) {
      console.log("No video link!");
    }

    $.when(ytdl.getInfo(videolink)).then(function(data) {

      console.log("info callback then do smth");
      console.log(data);

      var video = ytdl(videolink, { filter: (format) => format.container === 'mp4' });

      video.pipe(fs.createWriteStream('downloads/'+data.video_id+'.mp4'));

      video.once('response', () => {
        starttime = Date.now();
      });

      video.on('progress', (chunkLength, downloaded, total) => {
        const floatDownloaded = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        readline.cursorTo(process.stdout, 0);

        console.log((floatDownloaded*100).toFixed(2) + '% downloaded!');
        console.log((downloaded / 1024 / 1024).toFixed(2) + 'MB of ' + (total / 1024 / 1024).toFixed(2) + 'MB ');
        var bar_value = floatDownloaded * 35;
        $('.progress-bar ').css({width: bar_value +"em"});
        //process.stdout.write(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
        //process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
        //process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
        //process.stdout.write(`, estimated time left: ${(downloadedMinutes / floatDownloaded - downloadedMinutes).toFixed(2)}minutes `);

        readline.moveCursor(process.stdout, 0, -1);
      });

      video.on('end', () => {
        $('#results').append("<li>"+data.title+" - <a href='downloads/"+data.video_id+".mp4' download>Save</a></li>");
        $('.progress-bar').css({width: '0em'});
        console.log('End of file write stream.');
      });

    });

  });

});
