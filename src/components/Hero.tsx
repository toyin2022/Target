import { LampContainer } from "./Lamp";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SparklesCore } from "./Particles";
import { TextGenerateEffect } from "./TextRevealHero";

export function Hero({ scrollToTaskContainer }: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  return (
    <div className="min-h-[70vh] bg-slate-950 text-center">
      <LampContainer className="pt-40">
        <motion.div
          initial={{ opacity: 0.5, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" flex items-center justify-center bg-gradient-to-br from-white to-white pt-8 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <h1 className="pt-20 ">Hi there, {user.user.name}</h1>
        </motion.div>
      </LampContainer>
      <div className="-pt-20">
        <TextGenerateEffect
          className="bg-[rgb(2 6 23)] text-slate-50 p-5 -mt-10 w-full lg:w-[50rem] mx-auto text-center"
          words="Welcome to Target App Let's help you acheive your goals in a meaningful way"
        />
        <SparklesCore
          particleDensity={100}
          speed={5}
          minSize={3}
          particleColor="#155e75"
          className=" -mt-20 bg-slate-950"
          background="rgb(2 6 23)"
        />
      </div>
      <motion.button
        // initial={{ opacity: 0.5, translateY: 0 }}
        // whileInView={{ opacity: 1, translateY: 20 }}
        // exit={{ opacity: 1, translateY: 0 }}
        onClick={scrollToTaskContainer}
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#155e75,45%,#C0C0C0,55%,#155e75)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-600 "
      >
        Get started
      </motion.button>
    </div>
  );
}
