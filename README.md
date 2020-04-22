# Note-Taker
This assignment was an exercise in setting up a server and handling get, post, and delete requests to the server. When the user makes a request, the server either gets, posts, or deletes from the db.json page. On the front end, the code and styling was already supplied. All we had to do was create a server to handle the requests. 

![Note Taker](/images/NoteTaker.png)

## Express
Express was the main module we used for the functionality of the server. Using the different express methods get, post, and delete, I passed in the routes into those requests and added a handler that utilized the fs module to read and write files based on the request. 

## Get
The get method is "getting" the json file the notes are saved to. From there, the json file is read and return that information to a writeFile method that populates the notes on the page. 

## Post
The post method is linked to the save button on the HTML page. Once a note is typed, the new note is saved as an object and pushed to an array. The array is then looped over adding an id value to each note. One each note has an id, the array is written to the db.json page and then returned to a write file so the note appears on the left hand side of the page. 

## Delete
The delete method takes in the extra parameter of the id of what is clicked. That id is then sent into a for loop that loops over the array of notes saved to the json page and is checked against the id of each note. If the id matched the current note, the note is spliced from the array. Once the note is deleted, the array is the looped over again, reseting the id values of each note and written back to the .json file.

## Heroku
After the app is finished, we were also asked to deploy the app to Heroku. Here is the link: https://warm-refuge-36790.herokuapp.com/notes