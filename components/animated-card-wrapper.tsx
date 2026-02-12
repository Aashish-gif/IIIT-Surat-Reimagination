'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedCardWrapper({
  children,
  delay = 0,
  className = '',
}: AnimatedCardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
