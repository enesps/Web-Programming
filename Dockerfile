FROM httpd:2.4


RUN apt-get update && apt-get install -y git && git clone https://github.com/enesps/enesps.github.io.git

COPY . /usr/local/apache2/htdocs/