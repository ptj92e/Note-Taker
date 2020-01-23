let express = require("express");
let path = require("path");
let fs = require("fs");

let app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//These next 2 lines are the routes that are established for changing the html pages.
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});
//This function handles getting the notes from the db.json page
app.get("/api/notes", function (req, res) {
    //This file reads the db.json file and sees what is written
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        //This redelcares the information pulled from the json file and parses it to be used by the server
        let notes = JSON.parse(data);
        //This returns the new notes variable to the javascript to create note list items on the HTML page
        return res.json(notes);
    });
});
//This function posts the notes to the .json and writes them to the notes.html page.
app.post("/api/notes", function (req, res) {
    //This is establishing what is in the note fields on the HTML page as a new note object
    let newNote = req.body;
    //This is reading the json file used as the storage to be pulled from
    fs.readFile("./db/db.json", function (err, notes) {
        if (err) throw err;
        //This is parsing the note array in the json object so that more information can be added to it
        let noteArray = JSON.parse(notes);
        //This is pushing the new note object into the array of objects in the json page
        noteArray.push(newNote);
        //This for loop loops over the note Array and assigns an id based off of the index of the note in the array.
        for (let i = 0; i < noteArray.length; i++) {
            noteArray[i].id = 1 + i;
        };
        //This is re writing the json file with the new array created
        fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err) => {
            if (err) throw err;
            console.log("The new note was written to the file.");
        });
    });

    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    //This line reads the json file and returns the data
    fs.readFile("./db/db.json", function (err, notes) {
        if (err) throw err;
        //This line parses the data and sets it as a variable noteArray
        let noteArray = JSON.parse(notes);
        //If the length of the note array is 0, it sets the array to null. If it is not, the array is looped over and checks the id of the note clicked against the id of each array item. If the array item matches, it is removed from the array. 
        if (noteArray.length === 0) {
            noteArray = null;
        } else {
            //This loops over the array and checks the id of each array item compared to the id of what was clicked
            for (let i = 0; i < noteArray.length; i++) {
                //If the id matches the array item, it is spliced from the array
                if (req.params.id == noteArray[i].id) {
                    noteArray.splice(i, 1);
                }
            };
        };
        //This if statement checks to see if the array is empty. If it is, the funtion returns and nothing happens. 
        if (noteArray.length === 0) {
            //If the array length equals 0, then the write file is hit and removes the last array item
            fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err) => {
                if (err) throw err;
            });
        } else {
            //This for loop rewrites the id of each array object
            for (let i = 0; i < noteArray.length; i++) {
                noteArray[i].id = 1 + i;
            };
        };
        //This is re writing the json file with the new array created
        fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err) => {
            if (err) throw err;
        });
        return res.status(200).send();
    });
});

app.use("/assets", express.static("assets"));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
