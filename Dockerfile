FROM node:latest

WORKDIR /app

# スクリプトをコピーして実行権限を付与
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# デフォルトコマンド
CMD ["/docker-entrypoint.sh"] 