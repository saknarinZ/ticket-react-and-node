export interface TaskProps {
  task?: ITask;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export interface ITask {
  id: string;
  name: string;
  statu: string;
}
