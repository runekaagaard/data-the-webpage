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
                    msg: "HELP"
                    className: "jquery-console-message-value"
                ]
            else if el.length
                [
                    msg: $.trim(el.html())
                    className: "jquery-console-message-value"
                ]
            else
                [ 
                    msg: """Does not compute. Enter "help" for help."""
                    className: "jquery-console-message-value"
                ]
