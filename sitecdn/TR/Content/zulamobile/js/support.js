(function () {
    var searchTerm, panelContainerId, dataKeywords, words;
    // Create a new contains that is case insensitive
    $.expr[':'].containsCaseInsensitive = function (n, i, m) {
        return jQuery(n).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $('#txtSearch').on('change paste keyup', function () {
        $('.no-results').hide();
        if ($(this).val() === "") {
            $(".question").hide();
            $(".question").show();
            $(".sss-box-container.active a").click();
            return;
        }
        searchTerm = $("#txtSearch").val().replace(/\s*$/, "").toLowerCase();
        words = searchTerm.split(' ');
        var filteredPanels = new Array();

        $(".question").removeClass("hidden");

        $(".question").each(function () {
            panelContainerId = '#' + $(this).attr('id');

            dataKeywords = $(this).attr("data-keywords").toLowerCase().split(" ");
            keywordResult = dataKeywords.filter(f => words.includes(f));

            //Description alaný html olarak geliyor burada text bilgisini saðlýklý þekilde alýyoruz.
            var div = document.createElement("div");
            div.innerHTML = $(this).attr("data-description");
            var cleanText = div.innerText;
            dataDescriptions = cleanText.toLowerCase().split(" ");
            descriptionResult = dataDescriptions.filter(f => words.includes(f));

            dataTitles = $(this).attr("data-title").toLowerCase().split(" ");
            titleResult = dataTitles.filter(f => words.includes(f));

            if ($('#txtSearch').val() !== "" && (keywordResult.length || descriptionResult.length || titleResult.length)) {
                $(".question").hide();
                var question = { "id": panelContainerId, "rate": (keywordResult.length + descriptionResult.length + titleResult.length) };
                filteredPanels.push(question);
            }
            //else if (keywordResult.length <= 0 && descriptionResult.length <= 0 && titleResult.length <= 0) {
            //    $('.no-results').fadeIn();
            //}
            else if ($('#txtSearch').val() === "") {
                $(".question").show();
            }
        });

        //Geliþtirilecek silmeyiniz.
        //filteredPanels.sort(function (a, b) { return b.rate - a.rate });
        if (!filteredPanels.length) {
            $('.no-results').show();
        } else {
            $('.no-results').hide();
            for (var i = 0; i <= filteredPanels.length; i++) {
                if (filteredPanels[i] !== null) {
                    $(filteredPanels[i].id).show();
                }
            }
        }

    });
}());

$(".sss-box-link").each(function () {
    $(this).click(function (e) {
        e.preventDefault();
        var dataFaqType = $(this).attr("data-faqType");

        $('.sss-box-link').removeClass("active");
        $(this).addClass("active");

        $(".question").fadeOut();
        $("[data-faqType='" + dataFaqType + "']").removeClass("hidden").fadeIn();

        $('#txtSearch').val("");
    });
});