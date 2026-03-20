import { useState } from 'react'
import styles from './FileExplorer.module.css'

const FS = {
  '/': {
    type: 'dir',
    children: ['about', 'projects', 'readme.txt'],
  },
  '/about': { type: 'dir', children: ['bio.txt', 'skills.txt'] },
  '/projects': {
    type: 'dir',
    children: ['portfolio-os', 'threejs-app', 'readme.txt'],
  },
  '/about/bio.txt': {
    type: 'file',
    content: 'I\'m a GIS Consultant / Developer (i think so ...) / Curious guy :)',
  },
  '/about/skills.txt': {
    type: 'file',
    content: 'Python, React, React Native, JavaScript, TypeScript, Three.js, Node.js, SQL, PostgreSQL, Git, GitHub, Microsoft Azure DevOps, GCP',
  },
  '/projects/portfolio-os': { type: 'dir', children: ['index.jsx'] },
  '/projects/threejs-app': { type: 'dir', children: ['scene.js'] },
  '/projects/portfolio-os/index.jsx': {
    type: 'file',
    content: "import Desktop from './Desktop'\nexport default Desktop",
  },
  '/projects/threejs-app/scene.js': {
    type: 'file',
    content: "import * as THREE from 'three'\nconst scene = new THREE.Scene()",
  },
  '/readme.txt': {
    type: 'file',
    content: 'Welcome to mini-OS!\nDouble-click a folder to open it.',
  },
  '/projects/readme.txt': {
    type: 'file',
    content: 'My projects.',
  },
}

function getNode(path) {
  return FS[path] ?? null
}

function resolvePath(current, name) {
  if (name === '..') {
    const parts = current.split('/').filter(Boolean)
    parts.pop()
    return '/' + parts.join('/')
  }
  return (current === '/' ? '' : current) + '/' + name
}

export default function FileExplorer() {
  const [path, setPath] = useState('/')
  const [selected, setSelected] = useState(null)
  const [preview, setPreview] = useState(null)

  const node = getNode(path)

  const handleClick = (name) => setSelected(name)

  const handleDblClick = (name) => {
    const nextPath = resolvePath(path, name)
    const nextNode = getNode(nextPath)
    if (!nextNode) return
    if (nextNode.type === 'dir') {
      setPath(nextPath)
      setSelected(null)
      setPreview(null)
    } else {
      setPreview(nextNode.content)
    }
  }

  return (
    <div className={styles.explorer}>
      {/* Address bar */}
      <div className={styles.addressBar}>
        <span className={styles.addressLabel}>Address:</span>
        <span className={styles.addressPath}>{path}</span>
      </div>

      <div className={styles.body}>
        {/* File list */}
        <ul className={styles.fileList}>
          {path !== '/' && (
            <li
              className={styles.fileItem}
              onDoubleClick={() => handleDblClick('..')}
            >
              <span>📂</span>
              <span>..</span>
            </li>
          )}
          {node?.children?.map((name) => {
            const childPath = resolvePath(path, name)
            const child = getNode(childPath)
            const isDir = child?.type === 'dir'
            return (
              <li
                key={name}
                className={[
                  styles.fileItem,
                  selected === name ? styles.fileSelected : '',
                ].join(' ')}
                onClick={() => handleClick(name)}
                onDoubleClick={() => handleDblClick(name)}
              >
                <span>{isDir ? '📁' : '📄'}</span>
                <span>{name}</span>
              </li>
            )
          })}
        </ul>

        {/* Preview pane */}
        {preview !== null && (
          <div className={styles.preview}>
            <pre>{preview}</pre>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        {selected ? `${selected} selected` : `${node?.children?.length ?? 0} object(s)`}
      </div>
    </div>
  )
}
