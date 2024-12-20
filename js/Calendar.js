let competitionSchedule = []; 

document.addEventListener("DOMContentLoaded", async () => {
    const date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = document.querySelector('.current-date');
    const calendarBody = document.getElementById('calendar-body');
    const prevNextIcons = document.querySelectorAll('.nav .material-icons');

    // 공모전 일정 데이터 가져오기
    competitionSchedule = await fetchCompetitionSchedule(); 

    // 달력 렌더링 함수
    const renderCalendar = () => {
        currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
        
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        let tableRows = "";

        // 이전 달의 날짜 추가
        let row = "<tr>";
        for (let i = firstDayofMonth; i > 0; i--) {
            row += `<td class="inactive">${lastDateofLastMonth - i + 1}</td>`;
        }

        // 현재 달의 날짜 추가
        for (let i = 1; i <= lastDateofMonth; i++) {
            const isToday = 
                i === date.getDate() &&
                currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear() 
                ? 'today' 
                : '';

            const isCompetitionDay = competitionSchedule.some(event => {
                const startDate = new Date(event.sdate);
                const endDate = new Date(event.edate);

                return (
                    (startDate.getFullYear() === currYear && startDate.getMonth() === currMonth && startDate.getDate() === i) ||
                    (endDate && endDate.getFullYear() === currYear && endDate.getMonth() === currMonth && endDate.getDate() === i)
                );
            });

            row += `<td class="${isToday} ${isCompetitionDay ? 'highlight' : ''}" onclick="showPopup(${i}, ${currMonth}, ${currYear})" style="cursor: pointer;">${i}</td>`;

            if ((i + firstDayofMonth) % 7 === 0) { // 일주일 끝날 때 마다 줄 바꿈
                tableRows += row + "</tr>";
                row = "<tr>";
            }
        }

        // 다음 달의 날짜 추가
        for (let i = lastDayofMonth + 1; i <= 6; i++) {
            row += `<td class="inactive">${i - lastDayofMonth}</td>`;
        }
        tableRows += row + "</tr>";

        calendarBody.innerHTML = tableRows;

        // 현재 달에 해당하는 공모전 일정 표시
        displayContestSchedule(currYear, currMonth);
    };

    // 달력 - 이전/다음 버튼 클릭시
    prevNextIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if (currMonth < 0) {
                currMonth = 11;
                currYear--;
            }
            if (currMonth > 11) {
                currMonth = 0;
                currYear++;
            }

            renderCalendar();
        });
    });

    renderCalendar();
});

// 공모전 일정을 JSON 파일에서 가져오는 함수
async function fetchCompetitionSchedule() {
    try {
        // JSON 파일 경로
        const jsonFilePath = '../data/contests.json'; // JSON 파일 경로를 설정하세요
        const response = await fetch(jsonFilePath);

        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }

        const data = await response.json();
        console.log('불러온 공모전 데이터:', data); // 데이터 확인

        // JSON 데이터를 반환
        return data.map(event => ({
            contestName: event['공모전 제목'],
            organizer: event['주최자'],
            sdate: event['접수 기간'].split('~')[0].trim(),
            edate: event['접수 기간'].split('~')[1].trim()
        }));
    } catch (error) {
        console.error('Failed to fetch competition schedule from JSON:', error);
        return [];
    }
}

// D-DAY 계산, 색상 
function calculateDdayAndColor(sdate, edate) {
    const today = new Date();
    const endDate = new Date(edate);

    const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)); 
    let dDayText = '';
    let dDayColor = '';

    if (remainingDays > 0) {
        if (remainingDays <= 7) {
            dDayText = `D-${remainingDays}`;
            dDayColor = 'red'; // 마감 임박: 빨간색
        } else {
            dDayText = `D-${remainingDays}`;
            dDayColor = '#1F4E9C'; // 진행 중: 교색
        }
    } else {
        dDayText = '마감';
        dDayColor = 'black'; // 마감 완료: 검정색
    }

    return { dDayText, dDayColor };
}

// 팝업창 표시 함수
function showPopup(day, month, year) {
    const event = competitionSchedule.find(event => {
        const startDate = new Date(event.sdate);
        const endDate = new Date(event.edate);

        return (
            (startDate.getFullYear() === year && startDate.getMonth() === month && startDate.getDate() === day) ||
            (endDate && endDate.getFullYear() === year && endDate.getMonth() === month && endDate.getDate() === day)
        );
    });

    if (event) {
        const { dDayText, dDayColor } = calculateDdayAndColor(event.sdate, event.edate);

        //팝업 제목
        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popup-title');
        const popupDetails = document.getElementById('popup-details');

        // 팝업 내용 
        popupTitle.textContent = event.contestName;
        popupDetails.innerHTML = `
            <p><strong>주최:</strong> ${event.organizer}</p>
            <p><strong>접수 기간:</strong> ${event.sdate} - ${event.edate || 'N/A'}</p>
            <p><strong>D-DAY:</strong> <span style="color: ${dDayColor}; font-weight: bold;">${dDayText}</span></p>
        `;

        popup.style.display = 'block';

        // 닫기 버튼 클릭 
        document.querySelector('.close-btn').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
}

// 공모전일정 테이블 표시 함수
function displayContestSchedule(currYear, currMonth) {
    const contestTable = document.getElementById('contestTable').querySelector('tbody');
    contestTable.innerHTML = ''; 

    // "시작일"이 현재 달에 해당하는 일정만 필터링
    const filteredSchedule = competitionSchedule.filter(event => {
        const startDate = new Date(event.sdate);
        return startDate.getFullYear() === currYear && startDate.getMonth() === currMonth;
    });

    // 날짜 순 정렬
    filteredSchedule.sort((a, b) => new Date(a.sdate) - new Date(b.sdate));

    // 필터링된 일정 테이블에 표시
    filteredSchedule.forEach(event => {
        const { dDayText, dDayColor } = calculateDdayAndColor(event.sdate, event.edate);

        // 테이블 행 생성
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.contestName}</td>
            <td>${event.organizer}</td>
            <td>${event.sdate} ~ ${event.edate || 'N/A'}</td>
            <td style="color: ${dDayColor}; font-weight: bold;">${dDayText}</td>
        `;
        contestTable.appendChild(row);
    });
}






