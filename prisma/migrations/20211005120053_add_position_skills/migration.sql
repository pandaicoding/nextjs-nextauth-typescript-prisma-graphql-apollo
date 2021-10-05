-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "objective" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "Positions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "achievements" TEXT NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "skillname" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PositionsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SkillsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PositionsToUser_AB_unique" ON "_PositionsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PositionsToUser_B_index" ON "_PositionsToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillsToUser_AB_unique" ON "_SkillsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillsToUser_B_index" ON "_SkillsToUser"("B");

-- AddForeignKey
ALTER TABLE "_PositionsToUser" ADD FOREIGN KEY ("A") REFERENCES "Positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillsToUser" ADD FOREIGN KEY ("A") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillsToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
