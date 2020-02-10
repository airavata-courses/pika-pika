FROM ubuntu:latest

# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee /etc/apt/sources.list.d/mongodb.list

# Update apt-get sources AND install MongoDB
RUN apt-get update 
RUN apt-get install -y mongodb-org

# Data directory volume
VOLUME ["/data/db"]
WORKDIR /data

EXPOSE 27017

CMD ["mongod"]