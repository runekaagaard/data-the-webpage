mark_safe = (str) ->
  str2 = new String(str)
  str2.allow_html = true
  str2

display_help = ->
  assemble_line = (el) ->
    '%%%%' + $(el).attr('cmd') + ' - ' + $.trim($(el).find('.help').html())
  
  """Type commands to learn more about DATA. For instance if you type "whois"
(without the quotes) and press the enter key, you can read about the humans
behind DATA.

The available commands are:


""" + (assemble_line(el) for el in $("article section")).join("\n")

$ ->
  console_el = $("#console").console 
    promptLabel: "YES MASTER? "
    commandValidate: true
    autofocus: true
    animateScroll: true
    promptHistory: true
    welcomeMessage: 
      """
      Welcome to DATA::The Webpage. Ask me what to do and I will tell you
      everything!
      
      Type "help" (without the quotes) and hit enter to get help or be a
      sissy and use the menu above :)"""

    commandHandle: (line) ->
      el = $("""article section[cmd="#{line}"] .text""")
      if line is "help"
        [
            msg: display_help()
            className: "jquery-console-message-value"
        ]
      else if line is "reset"
        console_el.reset()
      else if el.length
        output = $.trim(el.html())
        if $(el).hasClass('safe')
          output = mark_safe(output)
        [
            msg: output
            className: "jquery-console-message-value"
        ]
      else
        [ 
            msg: """Does not compute. Enter "help" for help."""
            className: "jquery-console-message-value"
        ]
  
  blink_cursor = =>
    console.log("cursor")
    $('#console div.jquery-console-focus span.jquery-console-cursor').toggleClass("blink")
  setInterval(blink_cursor, 1000)
