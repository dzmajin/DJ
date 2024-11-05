document.addEventListener("DOMContentLoaded", async () => {
    const date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = document.querySelector('.current-date');
    const daysTag = document.querySelector('.days');
    const prevNextIcons = document.querySelectorAll('.nav .material-icons');

    // 공모전 일정 데이터 가져오기
    const competitionSchedule = await fetchCompetitionSchedule();

    // 달력 렌더링 함수
    const renderCalendar = () => {
        currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
        
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
        let liTag = "";
    
        // 이전 달의 날짜 추가
        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
    
        // 현재 달의 날짜 추가
        for (let i = 1; i <= lastDateofMonth; i++) {
            const isToday = 
                i === date.getDate() &&
                currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear() 
                ? 'active' 
                : '';
    
            // 현재 달력의 날짜 객체 생성
            const currentDate = new Date(currYear, currMonth, i);
    
            // 현재 달의 날짜가 공모전 일정에 속하는지 확인
            const isCompetitionDay = competitionSchedule.some(event => {
                const startDate = new Date(event.sdate);
                const endDate = new Date(event.edate);
    
                // 공모전 일정의 시작일 또는 종료일이 현재 달에 있는지 확인
                return (
                    startDate.getFullYear() === currYear &&
                    startDate.getMonth() === currMonth &&
                    startDate.getDate() === i
                ) || (
                    endDate.getFullYear() === currYear &&
                    endDate.getMonth() === currMonth &&
                    endDate.getDate() === i
                );
            });
    
            liTag += `<li class="${isToday} ${isCompetitionDay ? 'highlight' : ''}">${i}</li>`;
        }
    
        // 다음 달의 날짜 추가
        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }
    
        daysTag.innerHTML = liTag;
    };
    
    // 이전/다음 버튼 클릭 이벤트
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


// 공모전 일정을 API에서 가져오는 함수
async function fetchCompetitionSchedule(numOfRows = 10, pageNo = 1) {
    try {
        const apiUrl = `http://localhost:3000/api/contest?numOfRows=${numOfRows}&pageNo=${pageNo}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // JSON 형식으로 파싱
        const data = await response.json();

        // 배열로 반환될 경우 첫 번째 요소에 접근
        const responseData = Array.isArray(data) ? data[0] : data;

        // 응답 데이터 전체 출력 (디버깅용)
        console.log('API response data:', responseData);

        // resultCode 확인 (예: 09가 성공 코드일 경우)
        if (responseData.resultCode !== '09') {
            console.warn('API returned an error:', responseData.resultMsg || 'Unknown error');
            return [];
        }

        // items 필드가 빈 배열인 경우 처리
        if (!responseData.items || responseData.items.length === 0) {
            console.warn('No items in response data:', responseData);
            return [];
        }

        // 각 공모전에서 시작일(sdate)과 종료일(edate)을 추출
        const schedules = [];
        responseData.items.forEach(item => {
            item.schedules.forEach(schedule => {
                schedules.push({
                    contestName: item.contestNm,        // 공모전 이름
                    scheduleName: schedule.contestSchedule, // 일정 이름 (예: 작품접수)
                    sdate: schedule.sdate,             // 시작일자
                    edate: schedule.edate              // 종료일자
                });
            });
        });

        return schedules;
    } catch (error) {
        console.error('Failed to fetch competition schedule:', error);
        return [];
    }
}


