FROM frolvlad/alpine-java:jdk8-slim
VOLUME /tmp

ADD ./target/DataLinkRetrieve-0.0.1-SNAPSHOT.jar data-retrieval-microservice.jar

RUN sh -c 'touch /data-retrieval-microservice.jar'

ENTRYPOINT ["java","-jar","/data-retrieval-microservice.jar"]
EXPOSE 8080