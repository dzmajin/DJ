document.addEventListener("DOMContentLoaded", () => {
    // Swiper 초기화
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });

    // 햄버거 메뉴 열기
    document.getElementById("menuToggle").addEventListener("click", function () {
        const mainsideContent = document.getElementById("mainsideContent").innerHTML;
        const slideMenu = document.getElementById("slideMenu");
        slideMenu.innerHTML = mainsideContent + '<button id="closeMenu" class="close-btn">닫기</button>';
        slideMenu.classList.add("active");

        // 닫기 버튼에 이벤트 리스너 추가
        document.getElementById("closeMenu").addEventListener("click", function () {
            slideMenu.classList.remove("active");
        });
    });

    // 서브 메뉴 토글
    document.querySelectorAll(".slide-menu .list-area ul > li > a").forEach(function (link) {
        link.addEventListener("click", function (e) {
            const subList = link.nextElementSibling;
            if (subList && subList.classList.contains("sub-list")) {
                e.preventDefault(); // 기본 링크 동작 방지
                subList.style.display = subList.style.display === "block" ? "none" : "block";
            }
        });
    });

});
