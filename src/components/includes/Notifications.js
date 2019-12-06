import $ from 'jquery'
require('bootstrap-notify')

export const showNotification = (message, type, delay = 3000) => {

    var content = {
        message,
        icon: 'fa fa-bell',
        title: 'Notification:'
    };

    $.notify(content, {
        type,
        animate: {
            enter: 'animated slideInUp',
            exit: ''
        },
        placement: {
            from: 'bottom',
            align: 'right'
        },
        delay
    });
}