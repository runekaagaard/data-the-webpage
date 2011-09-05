(function() {
  var display_help, mark_safe;
  mark_safe = function(str) {
    var str2;
    str2 = new String(str);
    str2.allow_html = true;
    return str2;
  };
  display_help = function() {
    var assemble_line, el;
    assemble_line = function(el) {
      return $(el).attr('cmd') + ' - ' + $.trim($(el).find('.help').html());
    };
    return "The available commands are: \n\n" + ((function() {
      var _i, _len, _ref, _results;
      _ref = $("article section");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(assemble_line(el));
      }
      return _results;
    })()).join("\n");
  };
  $(function() {
    return $("#console").console({
      promptLabel: "YES MASTER? ",
      commandValidate: function(line) {
        return line !== "";
      },
      autofocus: true,
      animateScroll: true,
      promptHistory: true,
      commandHandle: function(line) {
        var el, output;
        el = $("article section[cmd=" + line + "] .text");
        if (line === "help") {
          return [
            {
              msg: display_help(),
              className: "jquery-console-message-value"
            }
          ];
        } else if (el.length) {
          output = $.trim(el.html());
          if ($(el).hasClass('safe')) {
            output = mark_safe(output);
          }
          return [
            {
              msg: output,
              className: "jquery-console-message-value"
            }
          ];
        } else {
          return [
            {
              msg: "Does not compute. Enter \"help\" for help.",
              className: "jquery-console-message-value"
            }
          ];
        }
      }
    });
  });
}).call(this);
