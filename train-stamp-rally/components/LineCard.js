// =============================================
// LineCard - 路線カードコンポーネント
// =============================================
// 路線一覧画面で「1つの路線」を表示するカードです。
// 路線名、進捗バー、コンプリート率を表示します。

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// ---- props（親コンポーネントから受け取るデータ） ----
// line:    路線データ（name, color, emoji, trains など）
// onPress: カードがタップされたときに呼ばれる関数
export default function LineCard({ line, onPress }) {
  // 乗った電車の数を計算する
  // filter() で ridden === true のものだけ抽出し、その個数を数える
  const riddenCount = line.trains.filter((t) => t.ridden).length;
  const totalCount = line.trains.length;

  // コンプリート率を計算（0〜100の整数）
  // Math.round() で小数点以下を四捨五入
  const percent = Math.round((riddenCount / totalCount) * 100);

  // 全部乗ったかどうか（コンプリート判定）
  const isComplete = riddenCount === totalCount;

  return (
    // TouchableOpacity: タップすると少し透明になるボタン
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: line.color }]}
      onPress={onPress}
      // activeOpacity: タップ時の透明度（0〜1）
      activeOpacity={0.7}
    >
      {/* 左側: 絵文字アイコン */}
      <Text style={styles.emoji}>{line.emoji}</Text>

      {/* 中央: 路線名と進捗バー */}
      <View style={styles.info}>
        <Text style={styles.name}>{line.name}</Text>

        {/* 進捗バーの外枠 */}
        <View style={styles.progressBar}>
          {/* 進捗バーの塗りつぶし部分 */}
          {/* width を「〇%」にすることで進捗を表現 */}
          <View
            style={[
              styles.progressFill,
              {
                width: `${percent}%`,
                backgroundColor: line.color,
              },
            ]}
          />
        </View>
      </View>

      {/* 右側: コンプリート率の数字 */}
      <View style={styles.percentArea}>
        {isComplete ? (
          // コンプリートしていたら星マーク
          <Text style={styles.completeStar}>⭐</Text>
        ) : (
          // まだなら「〇%」と表示
          <Text style={styles.percent}>{percent}%</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ---- スタイル定義 ----
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",     // 横並びに配置
    alignItems: "center",     // 縦方向の中央揃え
    backgroundColor: "#fff",
    borderRadius: 16,          // 角を丸くする
    padding: 16,
    marginBottom: 16,
    // 左側に路線カラーの太い線を表示
    borderLeftWidth: 6,
    // 影をつけてカードっぽくする
    elevation: 3,              // Android用の影
    shadowColor: "#000",       // iOS用の影
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 40,              // 子供が見やすい大きめサイズ
    marginRight: 12,
  },
  info: {
    flex: 1,                   // 残りのスペースを全部使う
  },
  name: {
    fontSize: 24,              // 大きめの文字
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: "#e0e0e0", // 進捗バーの背景（グレー）
    borderRadius: 6,
    overflow: "hidden",         // はみ出た部分を隠す
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  percentArea: {
    marginLeft: 12,
    width: 50,
    alignItems: "center",
  },
  percent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
  },
  completeStar: {
    fontSize: 32,
  },
});
