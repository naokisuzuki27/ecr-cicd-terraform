FROM nginx:alpine

# nginxの設定ファイルをコピー
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# アプリケーションのソースコードをコピー
WORKDIR /usr/share/nginx/html
COPY src/ .

# コンテナ内のファイル所有権を設定
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# セキュリティ向上のためrootではなくnginxユーザーとして実行
USER nginx

# ヘルスチェック用に80ポートを公開
EXPOSE 80

# nginxを起動
CMD ["nginx", "-g", "daemon off;"]