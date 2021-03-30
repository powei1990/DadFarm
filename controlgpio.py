import RPi.GPIO as GPIO
import argparse

ap = argparse.ArgumentParser()
ap.add_argument("-p", "--pin", type=int, default=7,
    help="which pin to control")
ap.add_argument("-o", "--output", type=int, default=1,choices=[0, 1],
    help="On or Off ?")
args = vars(ap.parse_args())
pin= args["pin"]
print("control pin = {}".format(pin))
print("output = {}".format(args["output"]))

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
print(GPIO.getmode())
GPIO.setup(pin, GPIO.OUT)
GPIO.output(pin,args["output"])
print("GPIO output = {}".format(args["output"]))
if args["output"]==0:
	GPIO.cleanup()
	print("cleanup")