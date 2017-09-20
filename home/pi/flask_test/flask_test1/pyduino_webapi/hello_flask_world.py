from flask import Flask, render_template,request, redirect, url_for

app = Flask(__name__)

temp = '17'
# we are able to make 2 different requests on our webpage
# GET = we just type in the url
# POST = some sort of form submission like a button
@app.route('/', methods = ['POST','GET'])
def hello_world():
    
    # variables for template page (templates/index.html)
    if request.form['submit'] == 'temp up': 
        print 'TURN ON'
    #if request.form['submit'] == 'temp up':
    #	print "hej"
    #	temp=str(int(temp)+1)
    #elif request.form['submit'] == 'temp down':
    #	print 'temp down!'
    #	#temp=temp-1
    #else:
    #	pass    
    
    # the default page to display will be our template with our template variables
    return render_template('index.html', temp = temp)

if __name__ == "__main__":

    # lets launch our webpage!
    # do 0.0.0.0 so that we can log into this webpage
    # using another computer on the same network later
    app.run(host='0.0.0.0')
