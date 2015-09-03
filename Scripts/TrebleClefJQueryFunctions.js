$(document).ready(function () {
    $("#btnHideSettings").click(function () {

        if ($("#divSettings").is(":visible"))
        {
            $("#btnHideSettings").html("Show");
            $("#divSettings").hide();
        }
        else
        {
            $("#btnHideSettings").html("Hide");
            $("#divSettings").show();
        }

    });
});
