"use client"

import {useEffect, useRef, useState, type ReactNode} from "react";
import {cn} from "@/lib/utils";

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({children, delay = 0, className}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.15}
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={cn(
        'transition-all duration-700 ease-out will-change-transform',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0',
        className
      )}
    >
      {children}
    </div>
  )
}

type CounterProps = {
  to: number
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function Counter({to, suffix = '', decimals = 0, duration = 1600, className}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(to * eased)
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      {threshold: 0.4}
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
