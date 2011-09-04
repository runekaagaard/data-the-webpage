(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(__bind(function() {
    return $("#console").console({
      promptLabel: "YES MASTER? ",
      commandValidate: function(line) {
        return line !== "";
      },
      autofocus: true,
      animateScroll: true,
      promptHistory: true,
      commandHandle: function(line) {
        if (line === "whois") {
          return [
            {
              msg: "Mads A, Rune K og Jeppe T",
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
  }, this));
}).call(this);
