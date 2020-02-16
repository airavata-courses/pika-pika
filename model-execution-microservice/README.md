# Model Execution Microservice

This microservice takes the url of the nexrad file as the input and runs the algorithm to plot a graph. It then converts it into an image to upload it to an image hosting website named Imgur.

## Installation


Install the model execution microservice by navigating to the following folder using command-line : 

Windows:

```python
cd model-execution-microservice/modelenv/Scripts
```

On macOS and Linux:
```python
cd model-execution-microservice/modelenvmac
```

Run the command on Windows :
```
activate
```

On macOS and Linux:
```
source bin/activate
```

Run the following command inside the environment folder:
```
pip install -r requirements.txt
```
Execute the python script using the following command :
```
python consumer.py
```