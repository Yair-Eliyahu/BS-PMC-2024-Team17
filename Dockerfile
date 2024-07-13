FROM jenkins/jenkins:lts 
USER root 
RUN apt-get update 
RUN apt install nodejs
RUN curl -sSL https://get.docker.com/ | sh