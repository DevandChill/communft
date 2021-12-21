const UserFirebaseCard = ({ user }) => {
  return (
    <div className="border">
      <div className="text-xl font-semibold">Firebase Info</div>{" "}
      <div>Username : {user.username}</div>
      <div>Email: {user.email}</div>
      <div>URL: {user.url}</div>
      <div>Description: {user.description}</div>
      <div>Discord: {user.discord}</div>
      <div>Github: {user.github}</div>
      <div>Twitter: {user.twitter}</div>
    </div>
  );
};
export default UserFirebaseCard;
