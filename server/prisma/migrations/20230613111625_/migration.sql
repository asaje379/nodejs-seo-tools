-- CreateTable
CREATE TABLE "Summarizer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT,
    "text" TEXT,
    "taskId" TEXT,

    CONSTRAINT "Summarizer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Summarizer" ADD CONSTRAINT "Summarizer_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
