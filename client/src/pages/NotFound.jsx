import React from "react";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section className="relative h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-50 left-20 w-72 h-72 bg-yellow-500 rounded-full blur-[120px] opacity-20"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-50 right-20 w-50 h-50 bg-yellow-500 rounded-full blur-[120px] opacity-20"
      />
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-[250px] font-sixty-four"
      >
        404
      </motion.div>

      <Button className='font-bold text-xl font-sixty-four py-6 tracking-tighter cursor-pointer' onClick={() => navigate('/')} >Back to Home</Button>
    </section>
  );
};

export default NotFound;
