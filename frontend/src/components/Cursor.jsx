import { motion } from 'framer-motion';

const Cursor = ({ position }) => (
  <motion.li
    animate={{
      left: position.left,
      width: position.width,
      opacity: position.opacity,
    }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="absolute z-0 h-7 rounded-full bg-gray-700 md:h-10"
  />
);
export default Cursor;