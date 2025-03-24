FROM nginx:alpine3.18-slim@sha256:b841779b72c127bdcb6e58b2ae3d810f890e020460858d84c7bd38d15cf26ddf

RUN mkdir -p /opt/empathy
WORKDIR /opt/empathy
ADD dist dist

COPY dist /usr/share/nginx/html