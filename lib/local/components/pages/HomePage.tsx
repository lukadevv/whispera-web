"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import FeatureCard from "../atoms/FeatureCard";
import {
  Clock,
  GitFork,
  GitPullRequest,
  GithubIcon,
  Globe,
  Lock,
  PersonStanding,
  Star,
} from "lucide-react";
import Playground from "../organisms/Playground";
import ChatList from "../organisms/ChatList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../atoms/Tooltip";

const FEATURES: Parameters<typeof FeatureCard>[0][] = [
  {
    media: {
      type: "node",
      node: <Lock size={"48px"} className="text-primary" />,
    },
    body: {
      title: "encryption",
      content:
        "Your messages are protected with robust end-to-end encryption, ensuring that only you and the intended recipient can read them",
    },
    actions: (
      <Button variant={"outline"} disabled>
        More
      </Button>
    ),
  },
  {
    media: {
      type: "node",
      node: <Globe size={"48px"} className="text-primary" />,
    },
    body: {
      title: "Anywhere",
      content:
        "Access your chats securely from any device, anywhere in the world. Your data stays safe and synced across all your devices",
    },
    actions: (
      <Button variant={"outline"} disabled>
        More
      </Button>
    ),
  },
  {
    media: {
      type: "node",
      node: <PersonStanding size={"48px"} className="text-primary" />,
    },
    body: {
      title: "Privacy-Focused",
      content:
        "Your privacy is our priority. We never store your messages on our servers and provide additional features like disappearing messages for enhanced privacy",
    },
    actions: (
      <Button variant={"outline"} disabled>
        More
      </Button>
    ),
  },
] as const;

type HomePageProps = {
  welcome: WelcomeSectionProps;
};

export default function HomePage({
  welcome: { forks, stars, lastUpdateAt },
}: HomePageProps) {
  return (
    <div className="flex flex-col gap-20">
      <WelcomeSection stars={stars} forks={forks} lastUpdateAt={lastUpdateAt} />
      <FeaturesSection />
      <PlaygroundSection />
    </div>
  );
}

type WelcomeSectionProps = {
  stars: number;
  forks: number;
  lastUpdateAt: string;
};

function WelcomeSection({ stars, forks, lastUpdateAt }: WelcomeSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Avoid white splash screen on reload
  const [exist, setExist] = useState<boolean>(false);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef) {
      return;
    }

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 1,
      width: 400,
      height: 400,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.85, 0.15],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.05, 0.95, 0.05],
      markers: [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0022;
      },
    });

    setExist(true);

    return () => {
      setExist(false);
      globe.destroy();
    };
  }, []);

  return (
    <section className="flex items-center gap-10 mx-auto my-16 flex-col md:flex-row">
      <motion.div
        className="flex flex-col gap-3"
        initial={{ x: 600, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.95 }}
      >
        <h1 className="uppercase font-bold text-6xl text-center">
          Welcome to <p className="text-primary">Whispera</p>
        </h1>
        <p className="text-xl text-gray-300">
          {`Whispera is an open-source secure chat application designed to
          protect your conversations and privacy. Whether you're chatting with
          friends, family, or colleagues.`}
        </p>
        <div className="m-auto mt-2 flex flex-col items-center gap-7">
          <Link
            href={process.env.NEXT_PUBLIC_REPOSITORY_URL ?? "/"}
            target="_blank"
          >
            <Button variant={"default"}>
              <GithubIcon className="mr-1" size={"1rem"} />
              <p>See code</p>
            </Button>
          </Link>
          <div className="flex gap-5">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="flex items-center text-yellow-600 font-bold">
                    <Star fontSize={"19px"} className="mr-2" />
                    <p>{stars}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Repository total stars</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="flex items-center text-primary font-bold">
                    <GitFork fontSize={"19px"} className="mr-2" />
                    <p>{forks}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Repository forks</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div className="flex items-center text-gray-600 font-bold">
                    <Clock fontSize={"19px"} className="mr-2" />
                    <p>{new Date(lastUpdateAt).toDateString()}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Last update</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 1.45, delay: 0.2 }}
          whileHover={{ scale: 1.35 }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: 400,
              height: 400,
              aspectRatio: 1,
              opacity: exist ? 1 : 0,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="flex flex-col" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : "hidden"}
        transition={{ duration: 1.45, delay: 1 }}
        hidden={!isInView}
      >
        <p className="uppercase mb-3 text-center text-gray-300">features</p>
        <h2 className="capitalize text-center mb-8 text-gray-400 text-2xl">
          our features & services
        </h2>
      </motion.div>
      <motion.div
        className="flex gap-6 justify-center items-center flex-wrap"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.235,
              delay: 0.65,
            },
          },
          hidden: {
            opacity: 0,
            transition: {
              when: "afterChildren",
            },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit={"exit"}
      >
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, x: 150 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ type: "linear" }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PlaygroundSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : "hidden"}
      transition={{ duration: 0.42 }}
    >
      <section ref={ref} className="flex mb-2 mt-24">
        <div className="w-1/2 mx-4">
          <h2 className="uppercase text-center mb-4 text-2xl text-gray-300 font-bold">
            start chatting
          </h2>
          <p className="text-gray-400">
            Experience secure and private real-time conversations without any
            data persistence. Enjoy chatting in real-time with peace of mind
          </p>
          <div className="my-5 pt-5">
            <ChatList
              content={{
                className: "h-80",
              }}
            />
          </div>
        </div>
        <div className="w-1/2 mx-4">
          <Playground />
        </div>
      </section>
    </motion.div>
  );
}
