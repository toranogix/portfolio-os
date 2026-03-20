import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import useWindowStore from '../../store/useWindowStore.js'
import WindowHeader from './WindowHeader.jsx'
import styles from './Window.module.css'
import { getApp } from '../../config/apps.js'

const MIN_W = 220
const MIN_H = 120

/**
 * Generic pointer-capture drag helper.
 * Returns { onPointerDown } to spread onto any handle element.
 *
 *  onMove(dx, dy, startState)  – called on every pointermove
 *  getStartState()             – snapshot captured on pointerdown
 */
function usePtrDrag({ getStartState, onMove }) {
  const active = useRef(false)
  const start = useRef(null)

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    active.current = true
    start.current = { x: e.clientX, y: e.clientY, state: getStartState() }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [getStartState])

  const onPointerMove = useCallback((e) => {
    if (!active.current) return
    onMove(
      e.clientX - start.current.x,
      e.clientY - start.current.y,
      start.current.state,
    )
  }, [onMove])

  const onPointerUp = useCallback(() => { active.current = false }, [])

  return { onPointerDown, onPointerMove, onPointerUp }
}

export default function Window({ win }) {
  const focusWindow        = useWindowStore((s) => s.focusWindow)
  const updateWindowPosition = useWindowStore((s) => s.updateWindowPosition)
  const updateWindowSize   = useWindowStore((s) => s.updateWindowSize)

  const app = getApp(win.appId)
  if (!app) return null
  const AppComponent = app.component

  // ── Drag (title bar) ──────────────────────────────────────────────
  const drag = usePtrDrag({
    getStartState: useCallback(() => ({ x: win.x, y: win.y }), [win.x, win.y]),
    onMove: useCallback((dx, dy, s) => {
      updateWindowPosition(win.id, s.x + dx, s.y + dy)
    }, [win.id, updateWindowPosition]),
  })

  // ── Resize helpers ────────────────────────────────────────────────
  const makeResize = (hDir, vDir) => usePtrDrag({
    getStartState: useCallback(
      () => ({ w: win.width, h: win.height }),
      [win.width, win.height],
    ),
    onMove: useCallback((dx, dy, s) => {
      const newW = hDir !== 0 ? Math.max(MIN_W, s.w + dx * hDir) : s.w
      const newH = vDir !== 0 ? Math.max(MIN_H, s.h + dy * vDir) : s.h
      updateWindowSize(win.id, newW, newH)
    }, [win.id, updateWindowSize]),
  })

  const resizeE  = makeResize(1, 0)   // right edge  → width only
  const resizeS  = makeResize(0, 1)   // bottom edge → height only
  const resizeSE = makeResize(1, 1)   // corner      → both

  return (
    <motion.div
      className={styles.window}
      style={{
        zIndex:  win.zIndex,
        width:   win.width,
        height:  win.height,
        top:     win.y,
        left:    win.x,
        display: win.minimized ? 'none' : 'flex',
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.1 }}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar – drag handle */}
      <WindowHeader
        winId={win.id}
        title={app.title}
        icon={app.icon}
        dragHandlers={drag}
      />

      <div className={styles.content}>
        <AppComponent winId={win.id} />
      </div>

      {/* ── Resize handles ── */}
      <div className={`${styles.resizeEdge} ${styles.resizeE}`}  {...resizeE}  />
      <div className={`${styles.resizeEdge} ${styles.resizeS}`}  {...resizeS}  />
      <div className={`${styles.resizeEdge} ${styles.resizeSE}`} {...resizeSE} >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M9 1L1 9M9 5L5 9" stroke="#808080" strokeWidth="1.5" />
        </svg>
      </div>
    </motion.div>
  )
}
