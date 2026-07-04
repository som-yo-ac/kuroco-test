// =========================================
// Kuroco API設定
// =========================================

// お問い合わせAPI
const API_URL = "https://achoes.g.kuroco.app/rcms-api/1/inquiry/3?id=3";

// フォーム取得
const form = document.getElementById("contactForm");
const resultMessage = document.getElementById("resultMessage");

// =========================================
// フォーム送信
// =========================================

form.addEventListener("submit", async (event) => {

    // 通常の送信を止める
    event.preventDefault();

    // メッセージ初期化
    resultMessage.textContent = "";
    resultMessage.className = "";

    // 入力値取得
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {

        // Kurocoへ送信
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const data = await response.json();

        // -------------------------
        // 送信成功
        // -------------------------
        if (response.ok) {

            resultMessage.className = "success";
            resultMessage.textContent = "お問い合わせを送信しました。";

            // フォームを初期化
            form.reset();

            console.log(data);
            return;
        }

        // -------------------------
        // バリデーションエラー
        // -------------------------
        if (data.errors) {

            resultMessage.className = "error";

            resultMessage.innerHTML = data.errors
                .map(error => `・${error.message}`)
                .join("<br>");

            return;
        }

        // -------------------------
        // その他エラー
        // -------------------------
        resultMessage.className = "error";
        resultMessage.textContent = "送信に失敗しました。";

    } catch (error) {

        console.error(error);

        resultMessage.className = "error";
        resultMessage.textContent = "通信エラーが発生しました。";

    }

});