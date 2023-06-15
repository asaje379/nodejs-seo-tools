import { TaskStatus } from '@prisma/client';

export class Helper {
  static cleanTaskInListResponse(values: { task: { status: TaskStatus } }[]) {
    return values.map((value) => {
      const status = value.task?.status;
      delete value.task;
      return { ...value, taskStatus: status };
    });
  }
}
