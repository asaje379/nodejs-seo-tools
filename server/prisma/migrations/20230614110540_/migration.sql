-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "stopwords" TEXT NOT NULL DEFAULT '',
    "taskId" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
