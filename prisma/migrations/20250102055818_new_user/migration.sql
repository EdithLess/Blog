-- CreateTable
CREATE TABLE "newUser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newUser_pkey" PRIMARY KEY ("id")
);
