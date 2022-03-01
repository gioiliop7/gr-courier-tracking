$(document).ready(function ($) {
    function wake_heroku() {
        var settings = {
            url: "https://eltrak.devdd.xyz",
            method: "GET",
            timeout: 0,
        };
        $.ajax(settings);
    }
    wake_heroku();
});
