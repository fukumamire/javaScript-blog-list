// 各UI要素のリモコン（取得）
const container = document.querySelector("#posts-container");
const loading = document.querySelector("#loading");
const errorArea = document.querySelector("#error");
const errorMsg = document.querySelector("#error-message");
const empty = document.querySelector("#empty");

// 表示・非表示を切り替えるヘルパー関数
function show(el) {
  el.style.display = "block";
}
function hide(el) {
  el.style.display = "none";
}

async function fetchPosts() {
  // --- 1. ローディング状態（準備開始！） ---
  show(loading);
  hide(container);
  hide(errorArea);
  hide(empty);

  try {
    // 意図的にエラーを起こす場合は URL を "/invalid-url" にします
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error(`データの取得に失敗しました (HTTP: ${response.status})`);
    }

    const posts = await response.json();

    // --- 2. 成功時の処理（幕を下ろす） ---
    hide(loading);

    if (posts.length === 0) {
      // 投稿が0件だった場合
      show(empty);
    } else {
      // 投稿が1件以上ある場合
      show(container);
      container.innerHTML = ""; // 一旦空にする

      posts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("post-card");
        card.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
        container.appendChild(card);
      });
    }
  } catch (error) {
    // --- 3. エラー状態（救急対応！） ---
    hide(loading);
    show(errorArea);
    errorMsg.textContent = error.message; // エラー内容を書き換える
    console.error("Fetch error:", error);
  }
}

// 実行！
fetchPosts();
