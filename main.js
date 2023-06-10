const base_url = "https://retoolapi.dev/O3mfHh/data";

$(function () {
    KiirViccek();

    $("#viccForm").submit(function (e) {
        e.preventDefault();
        const id = $("#viccID").val();
        const rate = $("#viccRate").val();
        const viccSzoveg = $("#viccInput").val();

        const viccek = {
            id: id,
            rate: rate,
            viccSzoveg: viccSzoveg
        }

        $.post(base_url, viccek,
            function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    $("#viccInput").val("");
                    KiirViccek();
                }
            },
            "json"
        );
    });
});

function KiirViccek() {
    $.get(base_url,
        function (data) {
            let html = "";
            data.forEach(viccek => {
                if (viccek.rate === 0 || viccek.rate === "") {
                    viccek.rate = 0;
                }
                html += `
                <div class="card w-25">
                    <div class="card-header d-flex justify-content-between align-items-right">
                        <p>${viccek.id}</p>
                        <i onclick="viccTorles(${viccek.id})" class="fa-solid fa-delete-left"></i>
                    </div>
                    <div class="card-body">
                        <p>${viccek.viccSzoveg}</p>
                    </div>
                    <div class="card-footer">
                        <p id="rateKiirt">${viccek.rate}</p>
                        <i onclick="LikeClick(${viccek.id})" class="fa-solid fa-heart"></i>
                    </div>
                </div>
                `
            })
            $("#viccek").html(html);
        },
        "json"
    );
}

function viccTorles(id) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${id}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                KiirViccek();
            };
        }
    });
}

function LikeClick(viccId) {
    readVicc(viccId);

    const id = $("#viccID").value();
    const rate = parseInt($("#viccRate").val()) + 1;
    const viccSzoveg = $("#szovegInput").val();

    const viccek = {
        id: id,
        rate: rate,
        viccSzoveg: viccSzoveg
    };

    $.ajax({
        type: "PUT",
        url: `${base_url}/${viccId}`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(viccek),
        success: function (vicc) {
            $("#rateKiirt").html(vicc.rate);
            KiirViccek();
        }
    });
}

function readVicc(viccId) {
    $.get(`${base_url}/${viccId}`,
        function (vicc, textStatus) {
            if (textStatus === "success") {
                $("#viccID").val(vicc.id);
                $("#viccRate").val(vicc.rate);
                $("#szovegInput").val(vicc.viccSzoveg);
            }
        },
        "json"
    );
}