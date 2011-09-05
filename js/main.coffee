mark_safe = (str) ->
  str2 = new String(str)
  str2.allow_html = true
  str2

display_help = ->
  assemble_line = (el) ->
    $(el).attr('cmd') + ' - ' + $.trim($(el).find('.help').html())
    
  "The available commands are: \n\n" +
  (assemble_line(el) for el in $("article section")).join("\n")

$ ->
  $("#console").console 
    promptLabel: "YES MASTER? "
    commandValidate: (line) -> line isnt ""
    autofocus: true
    animateScroll: true
    promptHistory: true

    commandHandle: (line) ->
      el = $("article section[cmd=#{ line }] .text")
      if line is "help"
        [
            msg: display_help()
            className: "jquery-console-message-value"
        ]
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
