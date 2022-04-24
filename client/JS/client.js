const uuid = ('; '+document.cookie).split(`; uuid=`).pop().split(';')[0];
const socket = io('http://localhost:'+port);

socket.on('connect', function(){
    socket.emit('adduser', uuid);
});

socket.on('update', function (chatList){
    
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
