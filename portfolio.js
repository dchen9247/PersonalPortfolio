const http = require("http")
const path = require("path");
const express = require("express");
const ejs = require('ejs');
const app = express();
const bodyParser = require("body-parser");

process.stdin.setEncoding("utf8");

if (process.argv.length != 3) {
    process.stdout.write(`Usage portfolio.js portNumber \n`);
    process.exit(1);
}

const portNumber = process.argv[2];

app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));

console.log(`Web server started and running at: http://localhost:${portNumber}`);


app.get("/", (request, response) => {
    response.render("index");
});

app.listen(portNumber)
const prompt = "Stop to shutdown the server: "
process.stdout.write(prompt)
process.stdin.on('readable', () => {
    const dataInput = process.stdin.read();
    if (dataInput !== null) {
        const command = dataInput.trim();
        if (command == "stop") {
            console.log("Shutting down the server");
            process.exit(0);
        } else {
            console.log(`Invalid command: ${command}`);
        }
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});