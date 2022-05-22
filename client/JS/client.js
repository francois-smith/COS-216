const uuid = ('; '+document.cookie).split(`; uuid=`).pop().split(';')[0];
const socket = io('http://localhost:'+port);

socket.on('connect', function(){
    socket.emit('adduser', uuid);
});

socket.on('update', function (messages){
    let messageContainer = document.querySelector("#message-container");
    messageContainer.innerHTML = "";

    let i = 0;
    for(let message of messages){
        if(i == 20){
            return;
        }

        let newMessage = document.createElement("div");
        newMessage.classList.add("message");

        let messageId = document.createElement("span");
        messageId.innerHTML = message.id;
        messageId.classList.add("message_id");
        messageId.style.display = "none";
        newMessage.appendChild(messageId);

        if(message.is_reply == 1){
            let replyMessage;
            for(let msg of messages){
                if(msg.id == message.reply_id){
                    replyMessage = msg;
                    break;
                }
            }
            let replyContainer = document.createElement("div");
            replyContainer.innerHTML = '<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12l-9-8v6h-15v4h15v6z"/></svg><span class="reply-message">Reply To: '+replyMessage.name+' '+replyMessage.surname+'</span>';
            replyContainer.classList.add("reply-container");
            newMessage.appendChild(replyContainer);
        }   
        
        let userContainer = document.createElement("div");
        userContainer.innerHTML = "<span class='user-name'>"+message.name+' '+message.surname+"</span>\
        <span class='time-posted'>"+message.time+"</span>"
        userContainer.classList.add("user-time-container");
        newMessage.appendChild(userContainer);

        let messageContents = document.createElement("span");
        messageContents.innerHTML = message.message_contents;
        userContainer.classList.add("message-contents");
        newMessage.appendChild(messageContents);

        let replyButton = document.createElement("div");
        replyButton.innerHTML = '<img class="reply-button" onclick="toggleReply(this)" src="IMG/reply.svg">';
        replyButton.classList.add("reply-button-container");
        newMessage.appendChild(replyButton);

        messageContainer.appendChild(newMessage);

        i++;
    }
});

socket.on('disconnect', function(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    toastr["warning"]("You have been disconnected from server.", "Warning");
});
