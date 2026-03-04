// =============================================
// App.js - アプリのエントリーポイント
// =============================================
// このファイルがアプリの「入口」です。
// 以下の3つの役割を持っています:
// 1. 路線・電車データの状態管理（useState）
// 2. 「のった！」の切り替え処理
// 3. 画面遷移の設定（react-navigation）

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 画面コンポーネント
import LineListScreen from "./screens/LineListScreen";
import TrainListScreen from "./screens/TrainListScreen";

// 初期データ
import initialLines from "./data/lines";

// ---- ナビゲーションのスタックを作成 ----
// Stack は「画面を積み重ねる」ナビゲーション
// 新しい画面が上に乗り、「戻る」で1つ前の画面に戻る仕組み
const Stack = createNativeStackNavigator();

export default function App() {
  // =============================================
  // 状態管理
  // =============================================
  // lines: 全路線データを useState で管理する
  // setLines: lines を更新するための関数
  // initialLines を初期値として渡している
  const [lines, setLines] = useState(initialLines);

  // =============================================
  // 電車の「のった/まだ」を切り替える関数
  // =============================================
  // lineId: どの路線か
  // trainId: どの電車か
  const toggleRidden = (lineId, trainId) => {
    // setLines に「更新関数」を渡すパターン
    // prevLines: 更新前のデータ
    setLines((prevLines) =>
      // map() で全路線をループし、該当する路線だけ更新する
      prevLines.map((line) => {
        // 対象の路線でなければそのまま返す
        if (line.id !== lineId) return line;

        // 対象の路線の trains を更新する
        return {
          ...line, // スプレッド構文: line の全プロパティをコピー
          trains: line.trains.map((train) => {
            // 対象の電車でなければそのまま返す
            if (train.id !== trainId) return train;

            // ridden を反転させる（true → false, false → true）
            return { ...train, ridden: !train.ridden };
          }),
        };
      })
    );
  };

  // =============================================
  // 画面構成
  // =============================================
  return (
    <NavigationContainer>
      {/* ステータスバーの設定 */}
      <StatusBar style="auto" />

      <Stack.Navigator
        // screenOptions: 全画面共通の設定
        screenOptions={{
          // ヘッダーの見た目を設定
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      >
        {/* ---- 路線一覧画面 ---- */}
        <Stack.Screen
          name="LineList"
          options={{
            title: "スタンプラリー",
            headerTitleAlign: "center",
          }}
        >
          {/* children で画面コンポーネントを渡す方法を使う */}
          {/* こうすると navigation と route の他に、自分のpropsも渡せる */}
          {(props) => <LineListScreen {...props} route={{ ...props.route, params: { ...props.route.params, lines } }} />}
        </Stack.Screen>

        {/* ---- 電車一覧画面 ---- */}
        <Stack.Screen
          name="TrainList"
          options={({ route }) => {
            // route.params.lineId から路線名を取得してヘッダーに表示
            const line = lines.find((l) => l.id === route.params.lineId);
            return {
              title: line ? `${line.emoji} ${line.name}` : "",
              headerTitleAlign: "center",
            };
          }}
        >
          {(props) => (
            <TrainListScreen
              {...props}
              route={{
                ...props.route,
                params: { ...props.route.params, lines },
              }}
              onToggle={toggleRidden}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
