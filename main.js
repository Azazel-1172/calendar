document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  fetchData(FULL_URL).then((data) => {
    var events = [];
    var startTimeString, endTimeString;
    var startTime = [];
    var start_month;
    var end_month;
    var start_date;
    var end_date;
    var endTime = [];
    var link = [];

    if (data.table.cols[0].label == "") {
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "zh-tw",
        headerToolbar: {
          left: "prev,today,next",
          center: "title",
          right: "timeGridWeek,timeGridDay,dayGridMonth",
        },
      });

      calendar.render();
    } else {
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
              end_hour +
              ":" +
              data.table.rows[i].c[8].f.slice(5, 7) +
              ":" +
              data.table.rows[i].c[8].f.slice(8, 10);
            // console.log(endTimeString);
          }
        }

        start_month = Number(data.table.rows[i].c[4].f.split("/")[1]);
        start_date = Number(data.table.rows[i].c[4].f.split("/")[2]);
        end_month = Number(data.table.rows[i].c[9].f.split("/")[1]);
        end_date = Number(data.table.rows[i].c[9].f.split("/")[2]);

        if (start_month < 10) {
          start_month = "0" + JSON.stringify(start_month);
        }
        if (start_date < 10) {
          start_date = "0" + JSON.stringify(start_date);
        }
        if (end_month < 10) {
          end_month = "0" + JSON.stringify(end_month);
        }
        if (end_date < 10) {
          end_date = "0" + JSON.stringify(end_date);
        }

        startTime[i] =
          data.table.rows[i].c[4].f.split("/")[0] +
          "-" +
          start_month +
          "-" +
          start_date +
          "T" +
          startTimeString;
        // console.log(startTime);
        endTime[i] =
          data.table.rows[i].c[4].f.split("/")[0] +
          "-" +
          end_month +
          "-" +
          end_date +
          "T" +
          endTimeString;
        // console.log(endTime);

        for (let i = 0; i < data.table.rows.length; i++) {
          if (data.table.rows[i].c[7] === null) {
            link[i] = "https://azazel-1172.github.io/calendar/404page.html";
          } else {
            link[i] = data.table.rows[i].c[7].v;
          }
        }

        events.push({
          title: data.table.rows[i].c[1].v,
          start: startTime[i],
          end: endTime[i],
          url: link[i],
          location: data.table.rows[i].c[6].v,
        });
      }

      // console.log(events);
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "zh-tw",
        headerToolbar: {
          left: "prev,today,next",
          center: "title",
          right: "timeGridWeek,timeGridDay,dayGridMonth",
        },
        events: events,

        eventClick: function (info) {
          info.jsEvent.preventDefault();

          Swal.fire({
            title: "活動名稱： " + info.event.title,
            html:
              `<div class="content"><p>開始時間： ${new Date(
                info.event.start
              ).getFullYear()}年` +
              `${(new Date(info.event.start).getMonth() + 1)
                .toString()
                .padStart(2, "0")}月` +
              `${new Date(info.event.start)
                .getDate()
                .toString()
                .padStart(2, "0")}日` +
              new Date(info.event.start).getHours() +
              "時" +
              new Date(info.event.start).getMinutes() +
              "分" +
              `</p></div>` +
              `<div class="content"><p>結束時間： ${new Date(
                info.event.end
              ).getFullYear()}年` +
              `${(new Date(info.event.end).getMonth() + 1)
                .toString()
                .padStart(2, "0")}月` +
              `${new Date(info.event.end)
                .getDate()
                .toString()
                .padStart(2, "0")}日` +
              new Date(info.event.end).getHours() +
              "時" +
              new Date(info.event.end).getMinutes() +
              "分" +
              `</p></div>` +
              `<div class="content"><p>活動地點： ${info.event._def.extendedProps.location}</p></div>` +
              `<div class="content">其他資訊： <a href="https://${info.event.url}">Links</a></div>`,
          });
        },
      });

      calendar.render();
    }
  });
});
