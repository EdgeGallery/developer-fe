FROM edgegallery/edge-server
ENV APP_HOME /usr/app
# 将dist文件中的内容复制到 $APP_HOME/configs/static/ 这个目录下面
COPY dist/ $APP_HOME/static/
# Copy application.properties to APP_HOME, and start edge-server with external config
COPY configs/ $APP_HOME/