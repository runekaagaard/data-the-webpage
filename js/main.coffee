$ ->
    $("#console").console 
        promptLabel: "YES MASTER? "
        commandValidate: (line) -> line != ""
        autofocus: true
        animateScroll: true
        promptHistory: true
    
        commandHandle: (line) ->
            if line == "whois"
                [ 
                    msg: "Mads A, Rune K og Jeppe T"
                    className: "jquery-console-message-value"
                ]
            else
                [ 
                    msg: """Does not compute. Enter "help" for help."""
                    className: "jquery-console-message-value"
                ]
