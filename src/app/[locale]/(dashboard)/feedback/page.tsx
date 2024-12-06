import CustomerFeedbacks from "./customersFeedbacks";

export default function FeedbackPage() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-11 md:col-span-7 shadow-md border rounded-lg p-4 "></div>
      <CustomerFeedbacks />
    </div>
  );
}
