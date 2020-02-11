# Data Retrieval Service

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
