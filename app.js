async function fetchPosts() {
  // ① カードを入れるための大きな箱（コンテナ）を取得 
  const container = document.querySelector("#posts-container");

  try {
    // ② APIから100件の投稿データを取ってくる 
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) throw new Error("データの取得に失敗しました"); // 失敗時の保険  

    const posts = await response.json(); // ③ データを読み解く 

    // ④ 100件分、一つずつカードを作って盛り付ける 
    posts.forEach((post) => {
      // (a) カード全体を囲む div を作る 
      const card = document.createElement("div");
      card.classList.add("post-card"); // CSS用のクラスをつける

      // (b) タイトル用の h2 を作る 
      const title = document.createElement("h2");
      title.textContent = post.title;

      // (c) 本文用の p を作る 
      const body = document.createElement("p");
      body.textContent = post.body;

      // (d) カードにタイトルと本文を合体させる 
      card.appendChild(title);
      card.appendChild(body);

      // (e) 最後に画面上のコンテナにカードを追加する
      container.appendChild(card);
    });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

// 最後に実行！
fetchPosts();
