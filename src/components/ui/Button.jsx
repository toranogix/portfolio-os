import styles from './Button.module.css'

export default function Button({ children, onClick, active, small, icon, className = '', ...props }) {
  return (
    <button
      className={[
        styles.btn,
        active ? styles.active : '',
        small ? styles.small : '',
        className,
      ].join(' ')}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  )
}
