$(document).ready(function ($) {
    function wake_heroku() {
        var settings = {
            url: "https://eltrak.herokuapp.com/",
            method: "GET",
            timeout: 0,
        };
        $.ajax(settings);
    }
    wake_heroku();
});
