function memo() {
  // 投稿するボタンの情報をidから取得する
  const submit = document.getElementById("submit");
  // クリックしたときのイベントを定義
  submit.addEventListener("click", (e) => {
    // フォームに入力された値を取得するためのオブジェクトの生成
    const formData = new FormData(document.getElementById("form"));
    // XMLHttpRequestの定義
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestの初期化の記述
    XHR.open("POST", "/posts", true);
    // レスポンスの形式を定義
    XHR.responseType = "json";
    // リクエストの送信の記述
    XHR.send(formData);
    // レスポンスがあった場合の処理の記述
    XHR.onload = () => {
      //レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示させる
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // レスポンスとして返されたメモのレコードデータを取得している
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に死闘する「描画する親要素」のlistの要素を取得している
      const list = document.getElementById("list");
      // メモの入力フォームを取得
      const formText = document.getElementById("content");
      // メモとして描画するHTMLを生成する記述
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
        // 生成したHTMLをどの位置に描画するかの記述
      list.insertAdjacentHTML("afterend", HTML);
      // 描画完了後に、入力フォームの値を空に書き換える記述
      formText.value = "";
    };
    // 標準設定されている処理を止める記述(重複を防ぐ)
    e.preventDefault();
  }); 
}
window.addEventListener("load", memo);