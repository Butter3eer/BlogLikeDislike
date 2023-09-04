const base_url = "https://retoolapi.dev/O3mfHh/data";
var id = 0;
var rate = 0;

$(function () {
    KiirViccek();

    $("#jokeForm").submit(function (e) {
        e.preventDefault();
        const viccSzoveg = $("#jokeInput").val();

        const viccek = {
            id: id,
            viccSzoveg: viccSzoveg,
            rate: rate
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
        id += 1;
    });
});

function KiirViccek() {
    $.get(base_url,
        function (data) {
            let html = "";
            console.log(data);
            data.forEach(jokes => {
                html += `
                <div class="card w-25">
                    <div class="card-header d-flex justify-content-between align-items-right">
                        <p id="jokeId">${jokes.id}</p>
                        <i onclick="viccTorles(${jokes.id})" class="fa-solid fa-delete-left"></i>
                        <i onclick="readJokes(${jokes.id})" class="fa-solid fa-arrows-rotate"></i>
                    </div>
                    <div class="card-body">
                        <p id="jokeText">${jokes.viccSzoveg}</p>
                    </div>
                    <div class="card-footer">
                        <p id="jokeRate">${jokes.rate}</p>
                        <i onclick="LikeClick('${jokes.id}', '${jokes.viccSzoveg}', ${jokes.rate})" class="fa-solid fa-heart"></i>
                    </div>
                </div>
                `;
            })
            $("#jokePlace").html(html);
        },
        "json"
    );
}

function viccTorles(szoveg) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${szoveg}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                KiirViccek();
            };
        }
    });
}

function LikeClick(viccId, viccSzoveg, rate) {
    const viccek = {
        id: viccId,
        viccSzoveg: viccSzoveg,
        rate: rate + 1
    };

    $.ajax({
        type: "PUT",
        url: `${base_url}/${viccId}`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(viccek),
        success: function (vicc) {
            KiirViccek();
        }
    });
}

function readJokes(jokesId) {
    $.get(`${base_url}/${jokesId}`,
        function (data, textStatus) {
            console.log(textStatus);
            $("#jokeIdInput").val(data.id);
            $("#jokeTextInput").val(data.viccSzoveg);
            $("#jokeRateInput").val(data.rate);
        },
        "json"
    );
}