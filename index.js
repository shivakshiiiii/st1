import express from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/input.html");
});

app.post("/add", (req, res) => {
    const data = {
        id: uuidv4(),
        ...req.body,
        totalMarks:
            parseInt(req.body.english) +
            parseInt(req.body.maths) +
            parseInt(req.body.science) +
            parseInt(req.body.socialScience) +
            parseInt(req.body.hindi),
        average: (
            (parseInt(req.body.english) +
                parseInt(req.body.maths) +
                parseInt(req.body.science) +
                parseInt(req.body.socialScience) +
                parseInt(req.body.hindi)) /
            5
        ).toFixed(2),
    };

    const grade =
        data.average >= 90
            ? "A"
            : data.average >= 80
            ? "B"
            : data.average >= 70
            ? "C"
            : data.average >= 60
            ? "D"
            : "E";

    data.grade = grade;

    // append data to ./data.json
    fs.readFile(__dirname + "/data.json", (err, file) => {
        if (err) {
            console.log(err);
            // create file if it doesn't exist
            fs.writeFile(
                __dirname + "/data.json",
                `
                [
                    ${JSON.stringify(data)}
                ]
            `,
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
            return res.status(200).json({ message: "Data added" });
        } else {
            const fileData = JSON.parse(file);
            fileData.push(data);
            fs.writeFile(
                __dirname + "/data.json",
                JSON.stringify(fileData),
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Data written to file");
                    }
                }
            );
            return res.status(200).json({ message: "Data added" });
        }
    });
});

app.get("/api/students", (req, res) => {
    fs.readFile(__dirname + "/data.json", (err, file) => {
        if (err) {
            console.log(err);
            res.json([]);
        } else {
            const fileData = JSON.parse(file);
            res.json(fileData);
        }
    });
});

app.get("/students", (req, res) => {
    res.sendFile(__dirname + "/public/students.html");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000!");
});
