const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORt || 3000;
const {PrismaClient}= require('@prisma/client')
const {clerkClient}=require('clerk')

const studentList = [
  {
    firstName: "Aryan",
    lastName: "Jabbari",
    sId: "234",
    school: "Queens College",
    major: "Computer Science",
  },
  {
    firstName: "Lidia",
    lastName: "De La Cruz",
    sId: "333",
    school: "Harvard",
    major: "Philanthrophy",
  },
  {
    firstName: "Brian",
    lastName: "De Los Santos",
    sId: "468",
    school: "John Jay",
    major: "Computer Science",
  },
  {
    firstName: "Adam",
    lastName: "Albaghali",
    sId: "589",
    school: "Brooklyn College",
    major: "Computer Science",
  },
  {
    firstName: "Nathan",
    lastName: "Vazquez",
    sId: "559",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Ynalois",
    lastName: "Pangilinan",
    sId: "560",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Shohruz",
    lastName: "Ernazarov",
    sId: "561",
    school: "Hunter College",
    major: "Computer Science",
  },
  {
    firstName: "Kevin",
    lastName: "Orta",
    sId: "562",
    school: "John Jay",
    major: "Computer Science",
  },
];

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// write a GET /students endpoint that returns a list of all students
// consider an optional school query parameter and filter by school
app.get("/students", async (req, res) => {
  console.log(req.query.school);

  // instead of only school, generically filter by any property name
  if (req.query) {
    const propertyNames = Object.keys(req.query);

    let students = await prisma.student.findMany();

    for (const propertyName of propertyNames) {
      students = students.filter(
        (s) => s[propertyName] === req.query[propertyName]
      );
    }
    res.json(students);
  } else {
    // else, respond with the entire list
    res.json(studentList);
  }
});

// write a GET /students/:id endpoint that returns a single student by id
app.get("/students/:id", async (req, res) => {
  // id exists in the request
  const id = req.params.id;
  console.log(id);

  // find student with matching ID and respond with the student
  const student = await prisma.student.findUnique({ where: { sId: id } });
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "student not found" });
  }
});

// create a student
app.post("/students", async (req, res) => {
  console.log(req.body);
  // normally we validate req.body but skipping due to time

  const students = await prisma.student.create({
    data: { ...req.body, grade: "FRESHMEN" },
  });
  res.json(students);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
