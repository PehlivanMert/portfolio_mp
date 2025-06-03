import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface MessageProps {
  type: 'success' | 'error';
  message: string;
}

const Message = ({ type, message }: MessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 rounded-xl ${type === 'success'
          ? 'bg-green-500/10 text-green-400 border border-green-500/30'
          : 'bg-red-500/10 text-red-400 border border-red-500/30'
        }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <FaCheck className="text-xl" />
        ) : (
          <FaTimes className="text-xl" />
        )}
        <span>{message}</span>
      </div>
    </motion.div>
  );
};

export default Message;
