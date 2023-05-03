const fs = require("fs");


// CREATE
fs.writeFile('employees.json', '[{"name": "Employee 1 Name", "salary": 2000},', 'utf8', (error) => {
    if(error) console.log(error);
    else console.log("file created");
});


// READ
fs.readFile('employees.json', 'utf8', (error, data) => {
    if(error) console.log(error);
    else console.log(data);
});


// UPDATE
fs.appendFile('employees.json', '\n{"name": "Employee 2 Name", "salary": 5000}]', 'utf8', (error) => {
    if(error) console.log(error);
    else console.log("file updated");
});


// DELETE
fs.unlink('employees.json', (error) => {
    if(error) console.log(error);
    else console.log("file deleted");
});