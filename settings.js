export default 
{
    "minecraft_version": "1.20.4", // 1.21.1までサポート
    "host": "host.docker.internal", // Docker環境からホストマシンへ接続するための特殊アドレス
    "port": process.env.MINECRAFT_PORT || 55281,
    "auth": "offline", // または "microsoft"

    // mindserverはすべてのエージェントを管理し、UIをホストします
    "host_mindserver": true, // trueの場合、mindserverはこのマシンでホストされます。それ以外の場合は、パブリックIPアドレスを指定してください
    "mindserver_host": "localhost",
    "mindserver_port": process.env.MINDSERVER_PORT || 8080,
    
    // ベースプロファイルはすべてのボットで共有され、デフォルトのプロンプト/例/モードに使用されます
    "base_profile": "./profiles/defaults/survival.json", // creative.json、god_mode.jsonも参照してください
    "profiles": ((process.env.PROFILES) && JSON.parse(process.env.PROFILES)) || [
        //"./andy.json",
         "./profiles/gpt.json",
         "./profiles/claude.json",
        //"./profiles/gemini.json",
        // "./profiles/llama.json",
        // "./profiles/qwen.json",
        // "./profiles/mistral.json",
        // "./profiles/grok.json",
        // "./profiles/mistral.json",
        // "./profiles/deepseek.json",

        // 複数のプロファイルを使用する場合は、/msgコマンドで各ボットに個別にメッセージを送る必要があります
        // 個別のプロファイルはベースプロファイルの値を上書きします
    ],
    "load_memory": false, // 前回のセッションからメモリをロード
    "init_message": "Respond with hello world and your name", // 起動時にすべてのボットに送信
    "only_chat_with": [], // ボットが聞き取り、一般メッセージを送信するユーザー。空の場合は公開チャットになります
    
    "language": "ja", // この言語に翻訳します。サポートされる言語名: https://cloud.google.com/translate/docs/languages
    "show_bot_views": false, // ボットの視点をブラウザで表示（localhost:3000, 3001...）

    "allow_insecure_coding": true, // newActionコマンドを許可し、モデルがコンピュータ上でコードを書いたり実行したりできるようにします。自己責任で有効にしてください
    "code_timeout_mins": 5, // コードが実行を許可される時間（分）。-1はタイムアウトなし
    "relevant_docs_count": 5, // パラメータ: -1 = すべて、0 = 参照なし、5 = 5つの参照。最大値を超える場合、すべての参照ドキュメントが返されます

    "max_messages": 30, // コンテキストに保持するメッセージの最大数
    "num_examples": 2, // モデルに提供する例の数
    "max_commands": -1, // 連続した応答で使用できるコマンドの最大数。-1は制限なし
    "verbose_commands": true, // コマンドの完全な構文を表示
    "narrate_behavior": true, // 簡単な自動アクション（「アイテムを拾う！」）をチャットに表示
    "chat_bot_messages": true, // 他のボットへのメッセージを公開チャットに表示
}
