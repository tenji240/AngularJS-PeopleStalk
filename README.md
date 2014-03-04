CMSC-448-Project-1
==================

Members:
Andrew Lee-Young
Tenji Tembo
Randal McKissack
Perry Ogwuche
Phillip Krocheski

First Project for CMSC 448.

This Project uses NodeJS for Client and Server Side
requests and handling, uses MongoDB for Database Calls
and Read/Writes, and a number of NodeJS 3rd Party Libaries, 
such as MongoSkin. This also uses the Boostrap 3 Base API
for HTML Scaffolding and CSS Styling Elements.

=================================

TO RUN:

BEFORE
Make sure you have MongoDB and NodeJS installed. You will 
also need mongoskin to run server side calls to MongoDB as
well.

The Database is 233 MB in size alone, so it will not be included in
the submission. A blank data\db folder will be put in place. 

Step 1) Initiate MongoDB Server and set the path to the data folder
EX (Terminal Win7): C:>\mongodb\bin\mongod --dbpath User\Tenji\Documents\Github\CMSC-448-Project-1\data

Step 2) Initiate Mongo
EX (Terminal Win7): C:>\mongodb\bin\mongo

Step3) Set the database to data. 
In the Mongo Shell
"> use data"
"> db.people.remove()" -- clears the database
"> db.people.find()" -- returns all documents in the database

Step 4) Run startup.js via Node
In a new Terminal.
CD to project directory
"C:>\..\CMSC-448-Project-1 node startup.js"

A prompt will appear 'Server running at http://127.0.0.1:8888/'
Open a browser and go to http://127.0.0.1:8888/

Step 5) Navigation
You will see admin.html, which communicates with the node server
on client side.

TO ADD: Fill in all input boxes and hit the 'Submit'
TO REMOVE: Fill in the name field and hit 'Delete'
TO SHOW: Fill in the name in the Search Box and hit 'Show User'
TO SHOW ALL: Hit Load Table

NodeJS parses all POST REQUESTS and returns the data back to client.js
who renders the JSON into actual displayed text.