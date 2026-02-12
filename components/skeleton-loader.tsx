'use client'

interface SkeletonLoaderProps {
  className?: string
  count?: number
}

export function SkeletonLoader({ className = '', count = 1 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40 rounded-lg ${className}`}
        />
      ))}
    </>
  )
}
