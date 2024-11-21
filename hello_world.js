const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});


app.get("/students", async (req, res) => {
  const propertyNames = Object.keys(req.query);

  let students = await prisma.student.findMany();

  for (const propertyName of propertyNames) {
    students = students.filter((s) =>
      s[propertyName]?.toLowerCase() === req.query[propertyName]?.toLowerCase()
    );
  }

  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  res.json(students);
});


app.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  const student = await prisma.student.findUnique({ where: { sId: id } });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});


app.post("/students", async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: { ...req.body, grade: "FRESHMEN" },
    });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create student" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.post('/login', async (req, res) => {
  const { emailAddress, password } = req.body;
  const dbUser = await prisma.user.findUnique({ where: { email: emailAddress.toLowerCase() } });
  if (!dbUser) {
    res.status(401).json({ message: 'error logging in' });
  }
  const { verified } = await clerkClient.users.verifyPassword({ userId: dbUser.authId, password });
  if (!verified) {
    res.status(401).json({ message: 'error logging in' });
  }

  const signInToken = await clerkClient.signInTokens.createSignInToken({ userId: dbUser.authId });
  res.cookie('accessToken', signInToken.token);
  res.json(signInToken);
});