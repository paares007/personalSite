import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const NODE_COUNT = 60
const CONNECTION_DISTANCE = 140
const MOUSE_INFLUENCE = 120

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: Node[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current

      for (const node of nodes) {
        const dx = mx - node.x
        const dy = my - node.y
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_INFLUENCE && dist > 0) {
          node.vx -= (dx / dist) * 0.02
          node.vy -= (dy / dist) * 0.02
        }

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)

          if (dist < CONNECTION_DISTANCE) {
            const alpha = 1 - dist / CONNECTION_DISTANCE
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.25})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.7)'
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden
    />
  )
}
