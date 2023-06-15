-- CreateTable
CREATE TABLE "Extractor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "kinds" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Extractor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extractor" ADD CONSTRAINT "Extractor_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
