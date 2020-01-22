let express = require("express");
let path = require("path");
let fs = require("fs");

let app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", function(req, res) {
    //This file reads the db.json file and sees what is written
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        //This redelcares the information pulled from the json file and parses it to be used by the server
        let notes = JSON.parse(data);
        //This returns the new notes variable to the javascript to create note list items on the HTML page
        return res.json(notes);
    });
});

app.post("/api/notes", function(req, res) {
    //This is establishing what is in the note fields on the HTML page as a new note object
    let newNote = req.body;
    //This is reading the json file used as the storage to be pulled from
    fs.readFile("./db/db.json", function(err, notes) {
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

app.use("/assets", express.static("assets"));

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
