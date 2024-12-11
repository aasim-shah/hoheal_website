import { format, formatDistanceToNow } from "date-fns";
import MyImage from "./MyImage";
import { P } from "./ui/typography";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "./ui/dialog";

type Props = {
  feedback: {
    _id: string;
    review: string;
    rating: number;
    createdAt: string;
    user: {
      name: string;
      profilePicture: string;
    };
  };
};

const CustomerReviewCard = ({ feedback }: Props) => {
  const { review, createdAt, rating, user } = feedback;
  const { name, profilePicture } = user;

  const formattedTime = `${formatDistanceToNow(new Date(createdAt))} ago`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex items-start gap-4 p-2 rounded-lg cursor-pointer hover:bg-background`}
        >
          <MyImage
            src={profilePicture}
            width={40}
            height={40}
            alt={name}
            className="rounded-full object-cover"
            containerClasses="w-10 h-10 rounded-full"
          />
          <div className="flex-1 text-sm text-muted-foreground flex flex-col">
            <div className="flex justify-between items-end">
              <P size="sm" className="text-primary">
                {name}
              </P>
              <P size="xxs">{formattedTime}</P>
            </div>
            <P size="xs" className="line-clamp-2">
              {review}
            </P>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full">
              <MyImage
                width={200}
                height={200}
                src={profilePicture}
                alt={"Image"}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="font-semibold flex flex-col">
              <P>{name}</P>
              <P size="xs" className="text-sm font-normal">
                {format(createdAt, "hh:mm a, dd/MM/yyyy")}
              </P>
            </div>
          </div>
          <div className="stars">
            {Array.from({ length: rating }, (_, index) => (
              <span
                key={index}
                className={`star text-yellow-400 text-lg ${
                  index < rating ? "filled" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <P className="">{review}</P>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerReviewCard;
