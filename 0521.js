let SHEET_ID = "1kgPFr1xCvP_QnKoeDCh2cYmyRWNHNxNS4YGnSfUyjkc";
let SHEET_TITLE = "表單回應 1";
let SHEET_RANGE = [];
let FULL_URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?sheet=" +
  SHEET_TITLE +
  "&range=" +
  SHEET_RANGE;

async function fetchData(FULL_URL) {
  try {
    const response = await fetch(FULL_URL);
    const text = await response.text();
    const data = JSON.parse(text.substr(47).slice(0, -2));
    return data;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  fetchData(FULL_URL).then((data) => {
    var events = [];
    var startTimeString, endTimeString;
    var startTime = [];
    var month;
    var date;
    var endTime = [];

    for (let i = 0; i < data.table.rows.length; i++) {
      if (data.table.rows[i].c[5].f[0] == "下") {
        start_hour = data.table.rows[i].c[5].v.slice(16, 18);
        if (Number(data.table.rows[i].c[5].f.slice(3, 5))) {
          startTimeString =
            start_hour +
            ":" +
            data.table.rows[i].c[5].f.slice(6, 8) +
            ":" +
            data.table.rows[i].c[5].f.slice(9, 11);
          // console.log(startTimeString);
        } else {
          startTimeString =
            start_hour +
            ":" +
            data.table.rows[i].c[5].f.slice(5, 7) +
            ":" +
            data.table.rows[i].c[5].f.slice(8, 10);
          // console.log(startTimeString);
        }
      } else {
        if (Number(data.table.rows[i].c[5].f.slice(3, 5))) {
          // 超過10點
          start_hour = data.table.rows[i].c[5].v.slice(16, 18);
          startTimeString =
            start_hour +
            ":" +
            data.table.rows[i].c[5].f.slice(6, 8) +
            ":" +
            data.table.rows[i].c[5].f.slice(9, 11);
          // console.log(startTimeString);
        } else {
          start_hour = data.table.rows[i].c[5].v.slice(16, 17);
          startTimeString =
            "0" +
            start_hour +
            ":" +
            data.table.rows[i].c[5].f.slice(5, 7) +
            ":" +
            data.table.rows[i].c[5].f.slice(8, 10);
          // console.log(startTimeString);
        }
      }

      if (data.table.rows[i].c[8].f[0] == "下") {
        end_hour = data.table.rows[i].c[8].v.slice(16, 18);
        if (Number(data.table.rows[i].c[8].f.slice(3, 5))) {
          endTimeString =
            end_hour +
            ":" +
            data.table.rows[i].c[8].f.slice(6, 8) +
            ":" +
            data.table.rows[i].c[8].f.slice(9, 11);
          // console.log(endTimeString);
        } else {
          endTimeString =
            end_hour +
            ":" +
            data.table.rows[i].c[8].f.slice(5, 7) +
            ":" +
            data.table.rows[i].c[8].f.slice(8, 10);
          // console.log(endTimeString);
        }
      } else {
        if (Number(data.table.rows[i].c[8].f.slice(3, 5))) {
          // 超過10點
          end_hour = data.table.rows[i].c[8].v.slice(16, 18);
          endTimeString =
            end_hour +
            ":" +
            data.table.rows[i].c[8].f.slice(6, 8) +
            ":" +
            data.table.rows[i].c[8].f.slice(9, 11);
          // console.log(endTimeString);
        } else {
          end_hour = data.table.rows[i].c[8].v.slice(16, 17);
          endTimeString =
            "0" +
            start_hour +
            ":" +
            data.table.rows[i].c[8].f.slice(5, 7) +
            ":" +
            data.table.rows[i].c[8].f.slice(8, 10);
          // console.log(endTimeString);
        }
      }

      month = Number(data.table.rows[i].c[4].f.split("/")[1]);
      date = Number(data.table.rows[i].c[4].f.split("/")[2]);

      if (month < 10) {
        month = "0" + JSON.stringify(month);
      }
      if (date < 10) {
        date = "0" + JSON.stringify(date);
      }

      startTime[i] =
        data.table.rows[i].c[4].f.split("/")[0] +
        "-" +
        month +
        "-" +
        date +
        "T" +
        startTimeString;
      // console.log(startTime);
      endTime[i] =
        data.table.rows[i].c[4].f.split("/")[0] +
        "-" +
        month +
        "-" +
        date +
        "T" +
        endTimeString;
      // console.log(endTime);
      events.push({
        title: data.table.rows[i].c[1].v,
        start: startTime[i],
        end: endTime[i],
      });
    }

    // console.log(events);
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "zh-tw",
      headerToolbar: {
        left: "prev,today,next",
        center: "title",
        right: "dayGridWeek,dayGridDay,dayGridMonth",
      },
      events: events,
      eventClick: function (info) {
        alert(
          "活動名稱: " +
            info.event.title +
            "\n" +
            "開始時間: " +
            new Date(info.event.start).getFullYear() +
            "年" +
            (new Date(info.event.start).getMonth() + 1)
              .toString()
              .padStart(2, "0") +
            "月" +
            new Date(info.event.start).getDate().toString().padStart(2, "0") +
            "日" +
            new Date(info.event.start).getHours() +
            "時" +
            new Date(info.event.start).getMinutes() +
            "分" +
            "\n" +
            "結束時間: " +
            new Date(info.event.end).getFullYear() +
            "年" +
            (new Date(info.event.end).getMonth() + 1)
              .toString()
              .padStart(2, "0") +
            "月" +
            new Date(info.event.end).getDate().toString().padStart(2, "0") +
            "日" +
            new Date(info.event.end).getHours() +
            "時" +
            new Date(info.event.end).getMinutes() +
            "分" +
            "\n"
        );

        console.log(info.event.start);
      },
    });

    calendar.render();
  });
});
