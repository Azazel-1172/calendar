// let SHEET_ID = "1dr9W9R3zbh-UcnwjaeXxmwX5I2FD_ag1_jBK3bIIqDk"; 測試正常版
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

fetchData(FULL_URL).then((data) => {
  console.log(data.table.rows[0].c[1].v);
});

fetchData(FULL_URL).then((data) => {
  console.log(data.table.rows[0].c[4].f);
});

// fetch(FULL_URL)
//   .then((res) => res.text())
//   .then((rep) => {
//     let data = JSON.parse(rep.substr(47).slice(0, -2));
//   });

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "zh-tw",
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "dayGridWeek,dayGridDay,dayGridMonth", // user can switch between the two
    },

    events: [
      {
        title: fetchData(FULL_URL).then((data) => {
          data.table.rows[0].c[1].v;
        }),
        start: fetchData(FULL_URL).then((data) => {
          console.log(data.table.rows[0].c[4].v);
        }),
      },
      {
        title: "測試",
        start: "2023-05-21T14:30:00",
        end: "2023-05-21T18:30:00",
      },
      {
        title: "吃飯",
        start: "2023-05-22T14:30:00",
        end: "2023-05-22T18:30:00",
      },
    ],

    // events: [
    //   {
    //     title: "測試",
    //     start: "2023-05-21T14:30:00",
    //     end: "2023-05-21T18:30:00",
    //   },
    //   {
    //     title: "測試2",
    //     start: "2023-05-21",
    //     end: "2023-05-21",
    //     allday: true,
    //   },
    //   {
    //     title: "Meeting",
    //     start: "2023-05-12T10:30:00",
    //     end: "2023-05-12T12:30:00",
    //   },
    // ],

    // eventClick: function (info) {
    //   if (info.event.end) {
    //     alert(
    //       "Event: " +
    //         info.event.title +
    //         "\n" +
    //         "Start Time: " +
    //         info.event.start +
    //         "\n" +
    //         "End Time: " +
    //         info.event.end +
    //         "\n"
    //     );
    //   } else {
    //     alert(
    //       "Event: " +
    //         info.event.title +
    //         "\n" +
    //         "Start Time: " +
    //         info.event.start +
    //         "\n" +
    //         "End Time: " +
    //         info.event.start +
    //         "\n"
    //     );
    //   }
    //   console.log(events);
    // },
  });
  console.log(calendar.currentData.eventStore);
  calendar.render();
});
