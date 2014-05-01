CMSC-448-Project-2
==================

Members:
-----------
- Andrew Lee-Young
- Tenji Tembo
- Randal McKissack
- Perry Ogwuche
- Phillip Krocheski

**Second Iteration of CMSC 448 Project**

<blockquote>
This Project uses NodeJS for Client and Server Side requests and handling, uses MongoDB for Database Calls and Read/Writes, and a number of NodeJS 3rd Party Libaries, such as MongoSkin. This also uses the Boostrap 3 Base API for HTML Scaffolding and CSS Styling Elements. 
</blockquote>

TO RUN - WINDOWS 7:
-------------------

BEFORE
<blockquote>
    <p>Make sure you have MongoDB and NodeJS installed. You will also need Mongoskin to run server side calls to MongoDB as well. </p>
    <p>The Database is 233 MB in size alone, so it will not be included in the submission. A blank data\db folder will be put in place. </p>
</blockquote>

1. Initiate MongoDB Server and set the path to the data folder
<blockquote>
C:>\mongodb\bin\mongod --dbpath User\Tenji\Documents\Github\CMSC-448-Project-1\data
</blockquote>


2. Initiate Mongo - EX (Terminal Win7): C:>\mongodb\bin\mongo

3. Set the database to data. 
<blockquote>
In the Mongo Shell <br />
"> use data" <br />
"> db.people.remove()" -- clears the database <br />
"> db.people.find()" -- returns all documents in the database 
</blockquote>

4. Run startup.js via Node
 <blockquote>
     In a new Terminal. <br />
     CD to project directory <br />
     "C:>\..\CMSC-448-Project-1 node startup.js" <br />
     A prompt will appear 'Server running at http://127.0.0.1:8888/'. Open a browser and go to http://127.0.0.1:8888/
 </blockquote>

5. Navigation - You will see index.html, which communicates with the node server on client side.

TO RUN - MAC OSX/LINUX
----------------------

1. $ mongod --dbpath data
2. $ mongo
    <blockquote>
        > use data <br />
        > db.people.remove(); -- clears the database <br />
        > db.people.find(); -- returns all documents in the database
    </blockquote>
3. $ node startup.js
4. Navigate to http://127.0.0.1:8888/


New Additions/Extras
=====================================
- Signup and Login/Logout Functionality Added
- Add/Remove/Update User Functionality Added
- Dedicated Profile Page with extended Functionality
- Regex Check for Phone Numbers and Emails
- Password Check Parameters to update users when passwords neeed to be changed
- Security Question Functionality

Technologies
==============
- NodeJS parses all POST REQUESTS and returns the data back to client.js who renders the JSON into actual displayed text.
- AngularJS handles all Client Side Data Binding and attribute matching
- MongoSkin Provides JS Server Side Scripting for POST Request to MongoDB
- MongoDB provides Server Side Database to save and return documents passed to database
- Bootstrap 3 used for front end design and HTML Scaffolding. 