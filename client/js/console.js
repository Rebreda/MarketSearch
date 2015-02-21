$(function () {
    var newUrl = "/json";

    function parser(newUrl) {
        $.ajax({
            dataType: "JSON",
            url: newUrl,
            success: function (data) {
                console.log(data);
            },
        });
    };
    parser(newUrl);
})