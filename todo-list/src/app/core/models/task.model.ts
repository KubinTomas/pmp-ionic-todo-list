import { TaskStateEnum } from './task-state.enum';

export class TaskModel {
    title: string;
    description: string;
    endDate: Date;
    endTime: Date;
    state: TaskStateEnum;
}
