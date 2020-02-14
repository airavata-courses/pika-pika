Please find the architecture diagram at : https://drive.google.com/file/d/1qHBmQgGoLnbUws8xLXEn1bedcwGb8UPz/view?usp=sharing

# Dockerized Kafka

Firstly, we add a dockerized version of Kafka and Zookeeper to the project. 

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

## Data Retrieval Service

This microservice takes into account location, date of the query being made and gets NEXRAD radar and version data of the file we need to predict weather of the given location.

## Installation

Ensure that you have maven installed in the system. If you don't have maven, download it from the following link:

```bash
https://maven.apache.org/download.cgi
```

## Usage

```bash
cd DataLinkRetrieve/
mvn clean install && mvn spring-boot:run 
```

Ensure that the port 8080 is not busy.

## For the following Microservices

API Gateway Microservice, Frontend-data-retrieval-microservice, Post-processing-microservice, Session-management-microservice, User-management-microservice

## Installation

Ensure that you have npm installed in the system. If you don't have npm, download it from the following link:

```bash
https://www.npmjs.com/get-npm
```

## Usage

Install the api gateway microservice by running the following command in the folder you cloned the microservice in using command-line : 

```python
cd <microservice-folder-name> (i.e. user-management-microservice)
npm install
node .
```

## Model-Execution-Microservice

## Installation

Install the model execution microservice by navigating to the following folder using command-line : 

```python
cd model-execution-microservice/model-execution-microservice/modelenv/Scripts
```

Run the command :
```
activate
```
Navigate two folders back using the following command :
```
../../pip install -r requirements.txt
```
Execute the python script using the following command :
```
python consumer.py
```

## Frontend

## Installation

In the project directory, you can run:

```bash
https://www.npmjs.com/get-npm
```

and then do

```bash
npm install
npm start
```