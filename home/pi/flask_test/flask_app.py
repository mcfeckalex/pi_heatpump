from flask import Flask, render_template, request
app = Flask(__name__)


# Create a dictionary called pins to store the pin number, name, and pin state:
config = {'power' : 'on', 'fan' : '3', 'temp' : 17}
   

def read_by_tokens(fileobj):
   for line in fileobj:
      for token in line.split():
         yield token
         
@app.route("/")
def main(): 
   print "AAAAAAAAHHHHHRGGG!!"
   with open('config.config') as f:
      for token in read_by_tokens(f):
         print(token)
         
   # For each pin, read the pin state and store it in the pins dictionary:
  
   # Put the pin dictionary into the template data dictionary:
   #templateData = {
   #   'config' : config
   #   }
   # Pass the template data into the template main.html and return it to the user
   #return render_template('main.html', **templateData)

   
   
# The function below is executed when someone requests a URL with the pin number and action in it:
@app.route("/<changePin>/<action>")
def action(changePin, action):
   # Convert the pin from the URL into an integer:
   changePin = int(changePin)
   # Get the device name for the pin being changed:
   deviceName = config['fan']
   # If the action part of the URL is "on," execute the code indented below:
   if action == "on":
      # Set the pin high:
           
      # Save the status message to be passed into the template:
      message = "Turned " + deviceName + " on."
   if action == "off":
      
      message = "Turned " + deviceName + " off."

   # For each pin, read the pin state and store it in the pins dictionary:
   

   # Along with the pin dictionary, put the message into the template data dictionary:
   templateData = {
      'config' : config
   }

   return render_template('main.html', **templateData)

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)
