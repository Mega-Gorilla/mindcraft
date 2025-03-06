#!/bin/bash
set -e

# 依存関係のインストール
echo "🔧 依存関係をインストールしています..."
npm install

# node_modulesが正しくインストールされたか確認
if [ ! -d "node_modules" ]; then
  echo "❌ 依存関係のインストールに失敗しました"
  exit 1
fi

echo "✅ 依存関係のインストールが完了しました"

# Minecraftポートの設定（環境変数が設定されていない場合のみデフォルト値を設定）
if [ -z "$MINECRAFT_PORT" ]; then
  echo "⚠️ MINECRAFT_PORT環境変数が設定されていません。デフォルト値(55281)を使用します。"
  export MINECRAFT_PORT=55281
else
  echo "🔌 Minecraftポート: $MINECRAFT_PORT"
fi

# アプリケーションの起動
echo "🚀 アプリケーションを起動しています..."
exec node main.js 