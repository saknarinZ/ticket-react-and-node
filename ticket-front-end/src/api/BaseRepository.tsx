import axios from "axios";
import { toast } from "react-hot-toast";

export class BaseRepository {
    constructor() {}
    fatchTickets = async () => {
      const response = await axios
        .get('http://localhost:3000/api/tickets')
        .then((items) => items.data);
      const tickets = response;
      toast.success('Tickets fetched successfully');
      return tickets;
    };
  }