-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "google_id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "googleuser" (
    "id" SERIAL NOT NULL,
    "google_id" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100),
    "profile_picture" VARCHAR(255),
    "role" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "googleuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_name_key" ON "posts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "googleuser_google_id_key" ON "googleuser"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "googleuser_email_key" ON "googleuser"("email");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "fk_google_user" FOREIGN KEY ("google_id") REFERENCES "googleuser"("google_id") ON DELETE CASCADE ON UPDATE NO ACTION;
