import './App.scss';
import { useEffect, useState } from 'react';
//theme
import 'primereact/resources/themes/saga-green/theme.css';

//core
import 'primereact/resources/primereact.min.css';

// import CreateTask from './components/CreateTask';
// import ListTasks from './components/ListTasks';
// import { ITask } from './interface/tasks.inaterface';
import { Toaster, toast } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTicket from './components/CreateTicket';
import { ITicket } from './interface/ticket.interface';
import axios from 'axios';
import ListTickts from './components/ListTickets';
import MenuTabBar from './components/MenuTabBar';
import TableTickets from './components/TableTickets';

function App() {
  // const [tasks, setTasks] = useState<ITask[]>([]);
  const [menu, setMenu] = useState<string>('update');
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    // get api Axios.get setTickets

    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:3000/api/tickets')
          .then((items) => {
            return items.data;
          });

        setTickets(response.data.tickets);
      } catch (error) {
        toast.error('Error while fetching tickets');
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   setTasks(
  //     localStorage.getItem('tasks')
  //       ? JSON.parse(localStorage.getItem('tasks')!)
  //       : []
  //   );
  // }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster /> <MenuTabBar menu={menu} setMenu={setMenu} />
      {menu === 'update' && (
        <div className=" w-full flex flex-col items-center justify-center px-32 gap-3 ">
          <CreateTicket
            tickets={tickets}
            setTickets={setTickets}
          ></CreateTicket>
          <ListTickts tickets={tickets} setTickets={setTickets}></ListTickts>
        </div>
      )}
      {menu === 'table' && <TableTickets></TableTickets>}
    </DndProvider>
  );
}

export default App;
