FROM nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/
COPY dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]