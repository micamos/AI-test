// =============================================
// LineListScreen - 路線一覧画面
// =============================================
// アプリを開いたときに最初に表示される画面。
// すべての路線をカードで一覧表示します。
// カードをタップすると、その路線の電車一覧画面に遷移します。

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import LineCard from "../components/LineCard";

// ---- props ----
// navigation: react-navigation が自動で渡してくれる画面遷移用のオブジェクト
// route:      画面に渡されたパラメータ（この画面では route.params.lines を使う）
export default function LineListScreen({ navigation, route }) {
  // 親（App.js）から渡された路線データを取得
  const { lines } = route.params;

  return (
    <View style={styles.container}>
      {/* ヘッダー部分 */}
      <Text style={styles.title}>🚂 でんしゃスタンプラリー</Text>
      <Text style={styles.subtitle}>のりたいろせんをえらんでね！</Text>

      {/* FlatList: 大量のデータを効率よく表示するためのリスト */}
      {/* ScrollView でもいいが、データが多いときは FlatList の方が軽い */}
      <FlatList
        data={lines}
        // keyExtractor: 各アイテムを区別するためのキーを指定
        keyExtractor={(item) => item.id}
        // renderItem: 1つ1つのアイテムをどう表示するか
        renderItem={({ item }) => (
          <LineCard
            line={item}
            onPress={() => {
              // タップしたら電車一覧画面に遷移する
              // navigate("画面名", { 渡すデータ }) で画面遷移
              navigation.navigate("TrainList", { lineId: item.id });
            }}
          />
        )}
        // リストの上下に余白をつける
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // 画面全体を使う
    backgroundColor: "#f5f5f5", // 薄いグレーの背景
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginBottom: 8,
  },
  list: {
    padding: 16,
  },
});
