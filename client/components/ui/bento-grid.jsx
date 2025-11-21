import React from "react";
import { motion } from "motion/react";

const BentoGrid = () => {
  return (
    <div className="min-h-screen max-w-7xl flex items-center justify-center bg-transparent">
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-10 items-center justify-center mx-auto gap-3">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="col-span-1 bg-accent border-2 flex items-center justify-center row-span-2 h-full rounded-lg"
        >
          <div className="w-full h-full overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src="images/bento_invite_friends.png"
              className="scale-105 rounded-2xl hover:scale-110 transition-all"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-2 flex items-center justify-center row-span-1 h-full  rounded-lg overflow-hidden"
        >
          <div className="w-full h-full bg-accent border-2 overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src="images/bento_choose_arena.png"
              alt=""
              className="scale-105 rounded-2xl hover:scale-110 transition-all"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          viewport={{ once: true }}
          className="row-span-1 flex items-center justify-center col-span-1 h-full  rounded-lg"
        >
          <img
            src="/icons/_Mono_symbol.png"
            alt=""
            className="w-50 rounded-xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="col-span-1 bg-accent border flex items-center justify-center row-span-2 h-full  rounded-lg"
        >
          <div className="w-full h-full bg-accent border-2 overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src="images/bento_vs_code.png"
              alt=""
              className="scale-105 rounded-2xl hover:scale-110 transition-all"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="col-span-2 bg-accent border flex items-center justify-center row-span-1 h-full  rounded-lg"
        >
          <div className="w-full h-full bg-accent border-2 overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src="images/bento_leaderboard.png"
              alt=""
              className="scale-105 rounded-2xl hover:scale-110 transition-all"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoGrid;
