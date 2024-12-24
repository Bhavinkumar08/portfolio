'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  z: number
  size: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const radiusRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrame: number
    let angle = 0
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      radiusRef.current = Math.min(canvas.width, canvas.height) * 0.25
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const numRows = 30
      const numCols = 60
      
      for (let i = 0; i < numRows * numCols; i++) {
        particles.push({
          x: 0,
          y: 0,
          z: 0,
          size: 2.5
        })
      }
    }

    const updateParticles = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      particles.forEach((particle, i) => {
        const row = Math.floor(i / 60)
        const col = i % 60
        const u = (col / 60) * Math.PI * 2
        const v = (row / 30) * Math.PI * 2

        const t = u + angle
        particle.x = centerX + radiusRef.current * (Math.cos(t) + Math.cos(v) * Math.cos(t))
        particle.y = centerY + radiusRef.current * (Math.sin(t) + Math.cos(v) * Math.sin(t))
        particle.z = radiusRef.current * Math.sin(v)
        
        particle.size = (particle.z / radiusRef.current + 2) * 1.5
      })

      particles.sort((a, b) => b.z - a.z)
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      
      particles.forEach(particle => {
        if (isDarkMode) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + (particle.z / radiusRef.current) * 0.7})`
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${0.3 + (particle.z / radiusRef.current) * 0.7})`
        }
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      angle += 0.002
      updateParticles()
      drawParticles()
      animationFrame = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)

    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleColorSchemeChange = () => {
      drawParticles()
    }
    colorSchemeQuery.addListener(handleColorSchemeChange)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
      colorSchemeQuery.removeListener(handleColorSchemeChange)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

