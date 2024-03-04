const users = {};

const addUser = (socketId, user, roomId) => {
  if (!user && !roomId) return { error: "Username and room are required" };
  if (!user) return { error: "Username is required" };
  if (!roomId) return { error: "Room is required" };

  // Initialize the users array for the room if it doesn't exist
  if (!users[roomId]) {
    users[roomId] = [];
  }

  // Check if the username is already taken in the roomId
  //   const existingUser = users[roomId].find(
  //     (user) => user.name.trim().toLowerCase() === name.trim().toLowerCase()
  //   );

  //   if (existingUser) return { error: "Username has already been taken" };

  const currentUser = { socketId, user };
  users[roomId].push(currentUser);
  return { currentUser };
};

const getUser = (socketId, room) => {
  if (users[room]) {
    return users[room].find((user) => user.socketId === socketId);
  }
  return null;
};

const deleteUser = (socketId) => {
  for (const room in users) {
    const index = users[room].findIndex((user) => {
      console.log("user id ", user.socketId, socketId);
      return user.socketId === socketId;
    });
    if (index !== -1) {
      return users[room].splice(index, 1)[0];
    }
  }
  return null;
};

const getUsers = (roomId) => {
  console.log("all users", users);
  return users[roomId] || [];
};

export { addUser, getUser, deleteUser, getUsers };
