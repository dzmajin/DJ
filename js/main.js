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

    // 챗봇 열기/닫기 기능
    function toggleChatbot() {
        const popup = document.getElementById("chatbot-popup");
        popup.style.display = popup.style.display === "flex" ? "none" : "flex";
    }

    document.getElementById("chatbot-button").addEventListener("click", toggleChatbot);
    document.querySelector(".cbclose").addEventListener("click", toggleChatbot);

    // 메시지 보내기 기능
    function sendMessage() {
        const input = document.getElementById("chat-input");
        const message = input.value.trim();
        if (message) {
            addMessage("user", message);
            input.value = "";

            // Simulate AI Response
            setTimeout(() => {
                addMessage("bot", "안녕하세요 대진 On 정보 챗봇입니다.");
            }, 500);
        }
    }

    // 메시지 추가
    function addMessage(sender, text) {
        const messagesDiv = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = sender;
        messageDiv.textContent = text;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // 챗봇 초기화
    const popup = document.getElementById("chatbot-popup");
    popup.style.display = "none";
    document.getElementById("chat-input").addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});
