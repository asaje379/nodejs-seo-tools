import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { TaskStatus, TaskType } from '@prisma/client';
import { JobId } from 'bull';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async init(id: JobId, args: { data: any; type: TaskType }) {
    const _id = +String(id);

    return await this.prisma.task.create({
      data: {
        jobId: _id,
        data: { data: args.data },
        type: args.type,
      },
    });
  }

  async updateStatus(id: string, status: TaskStatus) {
    return await this.prisma.task.update({ where: { id }, data: { status } });
  }

  async end(id: string, result: any, status: TaskStatus = TaskStatus.SUCCESS) {
    return await this.prisma.task.update({
      where: { id },
      data: { endedAt: new Date().toISOString(), status, result: { result } },
    });
  }

  async setLighthouseTask(taskId: string, lighthouseId: string) {
    await this.prisma.ligthouse.update({
      where: { id: lighthouseId },
      data: { taskId },
    });
  }
}
