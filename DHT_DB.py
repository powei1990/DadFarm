import time
import board
import adafruit_dht
import pymongo
import datetime

#連線DB
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client["database"]
col = db["weathers1"]

dhtDevice = adafruit_dht.DHT22(board.D24, use_pulseio=False)

while True:
    try:
        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity

        post={"temperature_c":temperature_c,
              "humidity":humidity,
              "date":datetime.datetime.now()}
        x=col.insert_one(post);
        print(x);

    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error

    time.sleep(60*60)