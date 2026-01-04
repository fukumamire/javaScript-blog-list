async function fetchPosts() {
  const container = document.querySelector("#posts-container");

  // 通信前に「準備中...」と表示しておくと親切です
  container.textContent = "準備しています...";

  try {
    // 意図的に無効なURLを指定してエラーを発生させる
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/invalid-url"
    );

    // 💡 強化ポイント：HTTPエラー（404など）を具体的にキャッチする
    if (!response.ok) {
      // response.status（404や500など）を含めたエラーを投げる
      throw new Error(
        `データの取得に失敗しました (HTTPエラー: ${response.status})`
      );
    }

    const posts = await response.json();

    // 画面を一度空にしてからデータを表示する
    container.textContent = "";

    posts.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("post-card");

      const title = document.createElement("h2");
      title.textContent = post.title;

      const body = document.createElement("p");
      body.textContent = post.body;

      card.appendChild(title);
      card.appendChild(body);
      container.appendChild(card);
    });
  } catch (error) {
    // 💡 強化ポイント：画面にもエラーメッセージを表示する 
    console.error("データの取得に失敗しました:", error); 
    container.innerHTML = `
      <div style="color: #e74c3c; text-align: center; padding: 20px;">
        <h3>申し訳ありません</h3>
        <p>${error.message}</p>
        <button onclick="location.reload()">もう一度表示</button>
      </div>
    `;
  }
}

fetchPosts();