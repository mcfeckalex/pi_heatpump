import RPi.GPIO as GPIO
import math
import os, sys
from datetime import datetime
from time import sleep

# This is for revision 1 of the Raspberry Pi, Model B
# This pin is also referred to as GPIO23
INPUT_WIRE = 16

GPIO.setmode(GPIO.BOARD)
GPIO.setup(INPUT_WIRE, GPIO.IN)

onOff = sys.argv[1]
temp = sys.argv[2]
fanSpeed = sys.argv[3]

print "Waiting for signal for power: "+str(onOff)+", temperature: "+str(temp)+", fan speed: "+str(fanSpeed)

while True:
	value = 1
	# Loop until we read a 0
	while value:
		value = GPIO.input(INPUT_WIRE)

	# Grab the start time of the command
	startTime = datetime.now()

	# Used to buffer the command pulses
	command = []
	
	#Binary command string
	binaryString = ""
	# The end of the "command" happens when we read more than
	# a certain number of 1s (1 is off for my IR receiver)
	numOnes = 0

	# Used to keep track of transitions from 1 to 0
	previousVal = 0

	while True:

		if value != previousVal:
			# The value has changed, so calculate the length of this run
			now = datetime.now()
			pulseLength = now - startTime
			startTime = now
			command.append((abs(previousVal-1), pulseLength.microseconds))

		if value:
			numOnes = numOnes + 1
		else:
			numOnes = 0

		# 10000 is arbitrary, adjust as necessary
		if numOnes > 100000:
			break

		previousVal = value
		value = GPIO.input(INPUT_WIRE)
	
	print "----------Start----------"
    	for i in range(0, len(command), 2):
		if i == 0:
			print str(command[i][1])+" ",
			
		else:
			if i % 12 != 0:
				print str(command[i][1])+" ",
			else:
				print str(command[i][1])+" "

	for i in range(0, len(command), 2):
		#print command [i][0]
		#print command [i][1]
				
		if command[i][1] > 1500 and command[i][1] < 5000:
			binaryString = binaryString+"["
		if command[i][1] > 5000:
                        binaryString = binaryString+"]"

		elif command[i][1] > 700 and command[i][1] < 1500:
			binaryString = binaryString+"1"
		elif command[i][1] < 700:
			binaryString = binaryString+"0"

	
	print "-----------End-----------\n"

	print "Size of array is " + str(len(command))

	for i in range(0, len(binaryString), 8):
   		print binaryString[i:i+8]
	
