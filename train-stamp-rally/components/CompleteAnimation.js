// =============================================
// CompleteAnimation - コンプリートアニメーション
// =============================================
// 路線の電車を全部乗ったときに表示されるお祝いアニメーション。
// React Native 標準の Animated API だけで実装しています。

import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

// ---- props ----
// visible: true のときアニメーションを表示する
export default function CompleteAnimation({ visible }) {
  // ---- useRef でアニメーション用の値を作る ----
  // Animated.Value は「動く数字」のようなもの。
  // この数字を時間とともに変化させてアニメーションを実現する。

  // スケール（大きさ）: 0 → 1.2 → 1 と変化させる
  const scaleAnim = useRef(new Animated.Value(0)).current;
  // 不透明度: 0（透明）→ 1（不透明）と変化させる
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // ---- visible が true になったらアニメーション開始 ----
  useEffect(() => {
    if (visible) {
      // アニメーションの値をリセット
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);

      // Animated.parallel: 複数のアニメーションを同時に実行
      Animated.parallel([
        // spring: バネのように弾むアニメーション
        Animated.spring(scaleAnim, {
          toValue: 1,           // 最終的な大きさ
          friction: 4,          // 摩擦（小さいほど弾む）
          tension: 60,          // 張力（大きいほど速い）
          useNativeDriver: true, // ネイティブ側で処理（高速）
        }),
        // timing: 一定時間で変化するアニメーション
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,        // 300ミリ秒かけて変化
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // visible が false になったらリセット
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible]); // visible が変わるたびに実行

  // visible が false なら何も表示しない
  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          // transform でスケール（拡大縮小）を適用
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.text}>コンプリート！</Text>
      <Text style={styles.subText}>すごい！ぜんぶ のったね！</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF9C4", // 薄い黄色の背景
    borderRadius: 20,
    padding: 24,
    marginVertical: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  emoji: {
    fontSize: 60,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F57F17",         // オレンジ色の文字
    marginTop: 8,
  },
  subText: {
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
});
