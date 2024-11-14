async function fetchAndDisplayTimetable() {
    const dateInput = document.getElementById('date-input').value;
    if (!dateInput) {
        alert("날짜를 선택해주세요.");
        return;
    }

    const formattedDate = dateInput.replace(/-/g, ''); // 날짜 형식 변환 (yyyy-mm-dd → yyyymmdd)
    const apiUrl = `https://open.neis.go.kr/hub/hisTimetable?KEY=f58cfc7ae926420a90b6e3a0e2a1ac8e&Type=json&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530791&AY=2024&SEM=2&ALL_TI_YMD=${formattedDate}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 데이터가 없을 경우 처리
        if (!data.hisTimetable) {
            document.getElementById('timetable-container').innerHTML = `<div>선택한 날짜에 시간표 정보가 없습니다.</div>`;
            return;
        }

        const timetableRows = data.hisTimetable[1].row;
        displayTimetable(timetableRows);
    } catch (error) {
        console.error("API 요청 실패:", error);
        alert("시간표 정보를 가져오는 데 실패했습니다.");
    }
}

function displayTimetable(rows) {
    const container = document.getElementById('timetable-container');
    container.innerHTML = '';

    rows.forEach(row => {
        const period = row.PERIO; // 교시
        const subject = row.ITRT_CNTNT; // 과목명
        const teacher = row.TRTCR_NM || '미정'; // 선생님 이름

        const timetableItem = `
            <div class="timetable-item">
                <div>교시: ${period}</div>
                <div>과목: ${subject}</div>
                <div>선생님: ${teacher}</div>
            </div>`;
        container.innerHTML += timetableItem;
    });
}
