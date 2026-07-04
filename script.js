// ==========================================
// Kuroco API設定
// ==========================================

// フォーム送信API
const API_URL = "https://achoes.g.kuroco.app/rcms-api/1/inquiry/3";

// フォーム要素
const form = document.getElementById("contactForm");
const resultMessage = document.getElementById("resultMessage");

// ==========================================
// フォーム送信
// ==========================================

form.addEventListener("submit", async (event) => {

    // ページ遷移を止める
    event.preventDefault();

    // メッセージ初期化
    resultMessage.innerHTML = "";
    resultMessage.className = "";

    // 入力値取得
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Kurocoへ送信するデータ
    const requestBody = {
        name,
        email,
        message
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            credentials: "include", // Cookie認証
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        // ==========================
        // 送信成功
        // ==========================
        if (response.ok) {

            resultMessage.className = "success";
            resultMessage.textContent = "お問い合わせを送信しました。";

            // 入力内容をリセット
            form.reset();

            console.log("送信成功", data);
            return;
        }

        // ==========================
        // バリデーションエラー
        // ==========================
        if (data.errors) {

            resultMessage.className = "error";

            const messages = data.errors.map(error => {
                return `・${error.message}`;
            });

            resultMessage.innerHTML = messages.join("<br>");

            console.error(data);
            return;
        }

        // ==========================
        // その他エラー
        // ==========================
        resultMessage.className = "error";
        resultMessage.textContent = "送信に失敗しました。";

        console.error(data);

    } catch (error) {

        console.error(error);

        resultMessage.className = "error";
        resultMessage.textContent = "通信エラーが発生しました。";
    }

});