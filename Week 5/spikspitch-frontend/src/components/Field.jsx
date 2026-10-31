import Icon from './Icon.jsx'

export default function Field({ id, label, error, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="label-chunky">
        {label}
      </label>
      <input
        id={id}
        className="input-chunky"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-err`} className="error-chunky">
          <Icon name="alert-triangle" size={14} strokeWidth={3} /> {error}
        </p>
      )}
    </div>
  )
}
