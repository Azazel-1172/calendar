document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  fetchData(FULL_URL).then((data) => {
    const events = data.table.rows.map((row) => {
      const start = new Date(
        eval("new " + row.c[4].v + ".getFullYear();"),
        eval("new " + row.c[4].v + ".getMonth();"),
        eval("new " + row.c[4].v + ".getDate();"),
        eval("new " + row.c[5].v + ".getHours();"),
        eval("new " + row.c[5].v + ".getMinutes()"),
        eval("new " + row.c[5].v + ".getSeconds()")
      );
      const end = new Date(
        eval("new " + row.c[9].v + ".getFullYear();"),
        eval("new " + row.c[9].v + ".getMonth();"),
        eval("new " + row.c[9].v + ".getDate();"),
        eval("new " + row.c[8].v + ".getHours();"),
        eval("new " + row.c[8].v + ".getMinutes()"),
        eval("new " + row.c[8].v + ".getSeconds()")
      );

      const link =
        row.c[7] === null
          ? "https://azazel-1172.github.io/calendar/404"
          : "https://" + row.c[7].v;

      return {
        title: row.c[1].v,
        start,
        end,
        url: link,
        location: row.c[6].v,
      };
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "zh-tw",
      headerToolbar: {
        left: "prev,today,next",
        center: "title",
        right: "timeGridWeek,timeGridDay,dayGridMonth",
      },
      events,
      eventClick: function (info) {
        info.jsEvent.preventDefault();
        const start = new Date(info.event.start);
        const end = new Date(info.event.end);

        Swal.fire({
          title: "活動名稱： " + info.event.title,
          html:
            `<div class="content"><p>開始時間<img width="24" height="24" src="https://img.icons8.com/dusk/64/alarm-clock--v1.png" alt="alarm-clock--v1"/>： ${start.getFullYear()}年${(
              start.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}月${start
              .getDate()
              .toString()
              .padStart(
                2,
                "0"
              )}日${start.getHours()}時${start.getMinutes()}分</p></div>` +
            `<div class="content"><p>結束時間<img width="24" height="24" src="https://img.icons8.com/dusk/64/stopwatch.png" alt="stopwatch"/>： ${end.getFullYear()}年${(
              end.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}月${end
              .getDate()
              .toString()
              .padStart(
                2,
                "0"
              )}日${end.getHours()}時${end.getMinutes()}分</p></div>` +
            `<div class="content"><p>活動地點<img width="24" height="24" src="https://img.icons8.com/arcade/64/000000/marker.png" alt="marker"/>： ${info.event._def.extendedProps.location}</p></div>` +
            `<div class="content">相關連結<img width="24" height="24" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-link-user-interface-wanicon-lineal-color-wanicon.png" alt="external-link-user-interface-wanicon-lineal-color-wanicon"/>： <a href="${info.event.url}">Links</a></div>`,
        });
        console.log(info.event.url);
      },
    });

    calendar.render();
  });
});
