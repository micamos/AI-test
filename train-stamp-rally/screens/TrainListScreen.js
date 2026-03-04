// =============================================
// TrainListScreen - 電車一覧画面
// =============================================
// 路線をタップしたあとに表示される画面。
// その路線に属する電車の一覧を表示します。
// 電車をタップすると「のった！」状態になります。
// 全部乗ると「コンプリート！」のアニメーションが表示されます。

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TrainCard from "../components/TrainCard";
import CompleteAnimation from "../components/CompleteAnimation";

// ---- props ----
// route:     route.params.lineId で「どの路線か」を受け取る
//            route.params.lines  で全路線データを受け取る
// onToggle:  電車の「のった/まだ」を切り替える関数（App.jsから渡される）
export default function TrainListScreen({ route, onToggle }) {
  // route.params から必要なデータを取り出す
  const { lineId, lines } = route.params;

  // 現在表示している路線のデータを探す
  // find() で id が一致する路線を取得
  const line = lines.find((l) => l.id === lineId);

  // 乗った電車の数を計算
  const riddenCount = line.trains.filter((t) => t.ridden).length;
  const totalCount = line.trains.length;

  // コンプリート判定
  const isComplete = riddenCount === totalCount;

  return (
    <View style={styles.container}>
      {/* ヘッダー: 路線名と進捗 */}
      <View style={[styles.header, { backgroundColor: line.color }]}>
        <Text style={styles.headerEmoji}>{line.emoji}</Text>
        <Text style={styles.headerTitle}>{line.name}</Text>
        <Text style={styles.headerCount}>
          {riddenCount} / {totalCount} だい
        </Text>
      </View>

      {/* コンプリートアニメーション（全部乗ったときだけ表示） */}
      <CompleteAnimation visible={isComplete} />

      {/* 電車一覧 */}
      <FlatList
        data={line.trains}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrainCard
            train={item}
            color={line.color}
            onToggle={() => {
              // 電車がタップされたら onToggle を呼ぶ
              // 路線IDと電車IDを渡して、どの電車が押されたかを伝える
              onToggle(lineId, item.id);
            }}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerEmoji: {
    fontSize: 48,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
  },
  headerCount: {
    fontSize: 20,
    color: "#ffffffcc",  // 白の80%透明度
    marginTop: 4,
  },
  list: {
    padding: 16,
  },
});
