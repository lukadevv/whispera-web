import Image, { ImageProps } from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/Card";

type MediaCard = {
  media:
    | ({ type: "image" } & Pick<ImageProps, "src" | "alt">)
    | { type: "node"; node: React.ReactNode };
  body: {
    title: string;
    content: React.ReactNode;
  };
  actions: React.ReactNode;
};

export default function FeatureCard({ media, body, actions }: MediaCard) {
  return (
    <Card className="w-[300px]">
      <CardHeader className="items-center">
        {media.type === "image" ? (
          <Image src={media.src} alt={media.alt} />
        ) : (
          media.node
        )}
      </CardHeader>
      <CardContent className="h-40 overflow-hidden">
        <CardTitle className="text-center uppercase mb-3">
          {body.title}
        </CardTitle>
        <CardDescription>{body.content}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center mt-3">{actions}</CardFooter>
    </Card>
  );
}
