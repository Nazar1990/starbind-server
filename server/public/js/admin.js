(function() {

  $(document).ready(function() {
    var logEl, modsEl, updateLogs, updateMods;
    $("#startServerBtn").click(function() {
      $(this).prop("disabled", true);
      return $.get('/admin/server/start').done(function() {
        return location.reload();
      }).fail(function() {
        $("#status #info").html("<div class=\"fail\">Failed to start server.<div>");
        return $("#startServerBtn").prop("disabled", false);
      });
    });
    $("#stopServerBtn").click(function() {
      $(this).prop("disabled", true);
      return $.get('/admin/server/stop').done(function() {
        return location.reload();
      }).fail(function() {
        $("#status #info").html("<div class=\"fail\">Failed to stop server.<div>");
        return $("#stopServerBtn").prop("disabled", false);
      });
    });
    logEl = $("#log");
    updateLogs = function() {
      return $.get('/admin/server/logs').done(function(data) {
        var div, log, _i, _len, _results;
        logEl.html("");
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          log = data[_i];
          console.log(log.message);
          div = $('<div>').addClass('logmessage');
          if (log.type === 'err') div.addClass('err');
          div.text(log.message);
          _results.push(logEl.append(div));
        }
        return _results;
      });
    };
    setInterval(updateLogs, 2000);
    modsEl = $("#mods");
    updateMods = function() {
      return $.get('/admin/mods/index').done(function(data) {
        var author, div, file, metadata, name, version, _results;
        console.log(data);
        modsEl.html("");
        _results = [];
        for (file in data) {
          metadata = data[file];
          div = $("<div>").addClass("modentry");
          name = metadata.name || file;
          author = metadata.author || "Unknown";
          if (author !== 'Unknown') author = 'by ' + author;
          version = metadata.version || "Unknown";
          $("<div>").addClass('name').text(name).appendTo(div);
          $("<div>").addClass('version').text("Version: " + version).appendTo(div);
          $('<div>').addClass('author').text(author).appendTo(div);
          _results.push(modsEl.append(div));
        }
        return _results;
      });
    };
    return updateMods();
  });

}).call(this);
