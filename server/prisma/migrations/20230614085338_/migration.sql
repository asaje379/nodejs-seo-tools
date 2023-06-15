-- CreateTable
CREATE TABLE "Observatory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "url" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Observatory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Observatory" ADD CONSTRAINT "Observatory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
