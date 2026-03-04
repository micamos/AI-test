// =============================================
// TrainCard - 電車カードコンポーネント
// =============================================
// 電車一覧画面で「1つの電車」を表示するカードです。
// タップすると「のった！」状態になります。

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// ---- props ----
// train:    電車データ（name, ridden など）
// color:    路線のテーマカラー
// onToggle: タップされたときに呼ばれる関数
export default function TrainCard({ train, color, onToggle }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        // 乗った電車はカラーの背景色にする
        train.ridden && { backgroundColor: color },
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      {/* 電車アイコン: 乗ったら大きい電車、まだなら四角 */}
      <Text style={styles.icon}>{train.ridden ? "🚃" : "⬜"}</Text>

      {/* 電車名 */}
      <Text
        style={[
          styles.name,
          // 乗った電車は白い文字にする
          train.ridden && styles.nameRidden,
        ]}
      >
        {train.name}
      </Text>

      {/* 右側のステータス表示 */}
      <View style={styles.status}>
        {train.ridden ? (
          // 乗った状態
          <Text style={styles.riddenText}>のった！</Text>
        ) : (
          // まだ乗っていない状態
          <Text style={styles.notYetText}>タップしてね</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 36,
    marginRight: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    color: "#333",
  },
  nameRidden: {
    color: "#fff",       // 乗った電車は白文字
  },
  status: {
    marginLeft: 8,
  },
  riddenText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  notYetText: {
    fontSize: 14,
    color: "#999",
  },
});
