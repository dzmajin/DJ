function fncSearch() {
    const searchType = document.getElementById('searchtype').value;
    const searchText = document.getElementById('searchtxt').value.toLowerCase();

    // 게시물 목록 예시. 실제로는 서버에서 받아올 것입니다.
    const posts = [
        { title: "첫 번째 게시물", content: "이것은 첫 번째 게시물의 내용입니다." },
        { title: "두 번째 게시물", content: "두 번째 게시물 내용이 여기에 있습니다." },
        { title: "세 번째 게시물", content: "세 번째 게시물의 내용입니다." },
    ];

    // 결과를 저장할 배열
    let results = [];

    // 게시물 검색
    posts.forEach(post => {
        if (searchType === "TITLE" && post.title.toLowerCase().includes(searchText)) {
            results.push(post);
        } else if (searchType === "CONTENT" && post.content.toLowerCase().includes(searchText)) {
            results.push(post);
        } else if (searchType === "CONTENT_TITLE" && (post.title.toLowerCase().includes(searchText) || post.content.toLowerCase().includes(searchText))) {
            results.push(post);
        }
    });

    // 결과를 표시하는 함수를 호출
    displayResults(results);

    // 폼 제출 방지
    return false;
}

// 검색 결과를 표시하는 함수
function displayResults(results) {
    const boardList = document.querySelector('.board-list tbody');
    boardList.innerHTML = ''; // 기존 내용을 비우기

    if (results.length === 0) {
        const noResultsRow = document.createElement('tr');
        noResultsRow.innerHTML = '<td colspan="3">검색 결과가 없습니다.</td>';
        boardList.appendChild(noResultsRow);
    } else {
        results.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="list-num">1</td>
                <td class="list-tit">${post.title}</td>
                <td class="list-date">${new Date().toLocaleDateString()}</td>
            `;
            boardList.appendChild(row);
        });
    }
}
