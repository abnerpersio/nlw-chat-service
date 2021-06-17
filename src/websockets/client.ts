import { Socket } from 'socket.io';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;
    let user_id = null;

    const userAlreadyExists = await usersService.findByEmail(email);

    if (!userAlreadyExists) {
      const user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userAlreadyExists.id;

      const connection = await connectionsService.findByUserId(
        userAlreadyExists.id
      );

      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userAlreadyExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }
    await messagesService.create({
      text,
      user_id,
    });

    const allMessages = await messagesService.list(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsersWithoutAdmin = await connectionsService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsersWithoutAdmin);
    // so i don't need to refresh the page, when a user clicks on support
    // the admin automatically recieves a new user trying to talk in chat
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;
    const { user_id } = await connectionsService.findBySocketID(socket.id);

    const message = await messagesService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
