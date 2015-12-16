/**
 * Created by Chen on 2015-12-16.
 */

(function ($) {
    $.fn.initChat = function () {
        var input = $(this);
        var chatText = $("<div id='chatText'></div>").appendTo(input.parent());
        var hidden = true;
        var messageHistory = [];
        var messagePointer = -1;

        var closechat = function () {
            input.blur();
            hide();
            messagePointer = messageHistory.length;
            input.val('');
            chatText.text('');
            updateDimensions();
        };

        var updateDimensions = function () {
            chatText.text(input.val());
            var width = chatText.width() + 30;
            input.css({
                width: width,
                marginLeft: (width / 2) * -1
            });
        };

        var show = function(){
            hidden = false;
            input.css("opacity", "1");
            input.focus();
        };
        var hide = function(){
            hidden = true;
            input.css("opacity", "0");
        };

        input.keydown(function (e) {
            if (!hidden) {
                e.stopPropagation();
                updateDimensions();
                if (messageHistory.length > 0) {
                    if (e.keyCode == keys.up) {
                        if (messagePointer > 0) {
                            messagePointer--;
                            input.val(messageHistory[messagePointer]);
                        }
                    }
                    else if (e.keyCode == keys.down) {
                        if (messagePointer < messageHistory.length - 1) {
                            messagePointer++;
                            input.val(messageHistory[messagePointer]);
                        }
                        else {
                            closechat();
                            return;
                        }
                    }
                }
            }
        });
        input.keyup(function (e) {
            var k = e.keyCode;
            if (input.val().length >= 45) {
                input.val(input.val().substr(0, 45));
            }

            updateDimensions();
            if (!hidden) {
                if (k == keys.esc || (k == keys.enter && input.val().length > 0) || (k == keys.space && input.val().length > 35)) {
                    if (k != keys.esc && input.val().length > 0) {
                        messageHistory.push(input.val());
                        messagePointer = messageHistory.length;
                        //app.sendMessage(input.val());
                    }
                    closechat();
                }
                e.stopPropagation();
            }
        });

        input.onclick = function(e){e.preventDefault();return false;};

        $(document).keydown(function (e) {
            var k = e.keyCode;
            if (k == keys.enter) {
                show();
            }
        });
    };

    $(function () {
        $('#chat').initChat();
    });
})(jQuery);