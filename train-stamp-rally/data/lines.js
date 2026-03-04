// =============================================
// 路線と電車のデータ定義
// =============================================
// ここにアプリで使う「路線」と「電車」のデータをまとめています。
// 新しい路線や電車を追加したいときは、このファイルだけ編集すればOK！

const initialLines = [
  {
    id: "tokyu",       // 路線を区別するためのID（プログラム内部で使う）
    name: "とうきゅう",  // 画面に表示される路線名
    color: "#ee1133",   // 路線のテーマカラー（東急の赤）
    emoji: "🚃",        // 路線のアイコン絵文字
    trains: [
      // この路線に属する電車の一覧
      { id: "5050", name: "5050けい", ridden: false },
      // ridden: false → まだ乗っていない状態
      // ridden: true  → 「のった！」状態
      { id: "3020", name: "3020けい", ridden: false },
    ],
  },
  {
    id: "jr",
    name: "JR",
    color: "#008c3f",   // JRの緑
    emoji: "🚆",
    trains: [
      { id: "yamanote", name: "やまのてせん", ridden: false },
    ],
  },
];

export default initialLines;
