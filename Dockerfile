FROM nginx:alpine3.18-slim

RUN mkdir -p /opt/empathy
WORKDIR /opt/empathy
ADD dist dist

COPY dist /usr/share/nginx/html