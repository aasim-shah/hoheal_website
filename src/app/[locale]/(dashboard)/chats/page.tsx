import ChatDetails from "./chatDetails";
import ChatsList from "./chatsList";

export default function ChatsPage() {
  return (
    <div className="grid  grid-cols-12">
      <ChatsList />
      <ChatDetails />
    </div>
  );
}
