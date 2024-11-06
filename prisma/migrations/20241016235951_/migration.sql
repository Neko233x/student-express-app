-- CreateTable
CREATE TABLE "Student" (
    "sId" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "school" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("sId")
);
