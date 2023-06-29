import { useState } from 'react';
import { ITicket, TicketProps } from '../interface/ticket.interface';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CreateTicket = ({ tickets, setTickets }: TicketProps) => {
  const [ticket, setTicket] = useState<ITicket>({
    title: '',
    description: '',
    contactinformation: '',
  });

  //   console.log(ticket);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //connect to backend API axios.post
    try {
      const response = await axios
        .post('http://localhost:3000/api/tickets', ticket)
        .then((res) => {
          return res.data;
        });

      setTickets([...tickets, response.data.newTicket]);
      toast.success('Ticket created successfully');
      setTicket({
        title: '',
        description: '',
        contactinformation: '',
      });
    } catch (error) {
      toast.error('Error while creating ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <h2 className="text-2xl">Create tickets </h2>
      </div>
      <div className="flex justify-center items-end gap-3 ">
        <div className="flex flex-col ">
          <label htmlFor="title">title</label>
          <input
            id="title"
            type="text"
            value={ticket.title}
            className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12  px-1 input-hover "
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="description">description</label>
          <input
            value={ticket.description}
            id="description"
            type="text"
            className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12  px-1 input-hover"
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="contactinformation">contact information</label>
          <input
            value={ticket.contactinformation}
            id="contactinformation"
            type="text"
            className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12  px-1 input-hover"
            onChange={(e) =>
              setTicket({ ...ticket, contactinformation: e.target.value })
            }
          />
        </div>

        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white ">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateTicket;
