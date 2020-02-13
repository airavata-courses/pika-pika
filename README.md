# Dockerized Zookeeper and Kafka

Here, we add a dockerized version of Kafka and Zookeeper to the project. 

## Usage

For macOS, we run a simple command.

```bash
make
```

For Windows, we have a simple command here to run from the command prompt or you can just double click the windows-docker-makefile.bat file.

```bash
windows-docker-makefile.bat
```

After the docker has built the container, login into the container with the following command. But first, you will have to know the container ID. You can perform the following commands. 

```bash
docker ps -a
docker exec -it <Container ID> /bin/bash
```

After you are inside the docker container bash, perform the following commands:

```bash
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic data-retrieval-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic model-execution-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic user-management-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic post-processing-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic session-management-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic api-gateway-service --partitions 1 --replication-factor 1
kafka-topics --zookeeper 127.0.0.1:2181 --create --topic front-end-data-retrieval-service --partitions 1 --replication-factor 1

```

