(function() {
  var display_help, mark_safe;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  mark_safe = function(str) {
    var str2;
    str2 = new String(str);
    str2.allow_html = true;
    return str2;
  };
  display_help = function() {
    var assemble_line, el;
    assemble_line = function(el) {
      return '%%%%' + $(el).attr('cmd') + ' - ' + $.trim($(el).find('.help').html());
    };
    return "Type commands to learn more about DATA. For instance if you type \"whois\"\n(without the quotes) and press the enter key, you can read about the humans\nbehind DATA.\n\nThe available commands are:\n\n" + ((function() {
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
    var blink_cursor, console_el, el, nav, _i, _len, _ref;
    console_el = $("#console").console({
      promptLabel: "YES MASTER? ",
      commandValidate: true,
      autofocus: true,
      animateScroll: true,
      promptHistory: true,
      welcomeMessage: "Welcome to DATA::The Webpage. Ask me what to do and I will tell you\neverything!\n\nType \"help\" (without the quotes) and hit enter to get help or be a\nsissy and use the menu above :)",
      commandHandle: function(line) {
        var el, message, output;
        el = $("article section[cmd=\"" + line + "\"] .text");
        if (line === "help") {
          return [
            {
              msg: display_help(),
              className: "jquery-console-message-value"
            }
          ];
        } else if (line === "reset") {
          return console_el.reset();
        } else if (line === "toggle-menu") {
          nav.toggleClass("hidden");
          if (nav.hasClass("hidden")) {
            message = "Menu turned off. Good for you!";
            $('html').css('padding-top', 0);
          } else {
            message = "Menu turned back on. ZZZ.";
            $('html').css('padding-top', '40px');
          }
          return [
            {
              msg: message,
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
    blink_cursor = __bind(function() {
      return $('#console div.jquery-console-focus span.jquery-console-cursor').toggleClass("blink");
    }, this);
    setInterval(blink_cursor, 1000);
    _ref = $("article section");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      if (!$(el).hasClass("command-only")) {
        $('nav ul ').append("<li>" + $(el).attr('cmd') + "</li>");
      }
    }
    nav = $($('nav'));
    $('nav ul li').click(function() {
      var backspace, c, cmd, i, _fn, _j, _len2, _ref2, _ref3;
      backspace = function() {
        console_el.backDelete();
        return nav.dequeue("key");
      };
      cmd = $(this).text();
      console_el.disableInput();
      console_el.moveToEnd();
      for (i = 0, _ref2 = console_el.promptText().length; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
        nav.delay(Math.random() * 100 + 20, "key");
        nav.queue("key", backspace);
      }
      _ref3 = cmd.split("");
      _fn = function(c) {
        console.log(c);
        nav.delay(Math.random() * 100 + 20, "key");
        return nav.queue("key", __bind(function() {
          console_el.typer.consoleInsert(c);
          return nav.dequeue("key");
        }, this));
      };
      for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
        c = _ref3[_j];
        _fn(c);
      }
      nav.delay(Math.random() * 100 + 20, "key");
      nav.queue("key", __bind(function() {
        console_el.commandTrigger();
        return nav.dequeue("key");
      }, this));
      nav.dequeue("key");
      return null;
    });
    return null;
  });
}).call(this);
