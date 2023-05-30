const SHEET_ID = "1kgPFr1xCvP_QnKoeDCh2cYmyRWNHNxNS4YGnSfUyjkc";
const SHEET_TITLE = "表單回應 1";
const SHEET_RANGE = "";
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

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
