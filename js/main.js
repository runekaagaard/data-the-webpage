(function() {
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
        var el;
        el = $("article section[cmd=" + line + "] .text");
        if (line === "help") {
          return [
            {
              msg: "HELP",
              className: "jquery-console-message-value"
            }
          ];
        } else if (el.length) {
          return [
            {
              msg: $.trim(el.html()),
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
