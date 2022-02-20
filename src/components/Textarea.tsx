import React from "react"
import clsx from "clsx"

export const Textarea: React.FC<
  {
    value: string
    onChange: (value: string) => void
    fullWidth?: boolean
  } & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  >
> = ({ value, onChange, fullWidth, ...props }) => {
  return (
    <textarea
      {...props}
      rows={props.rows || 10}
      className={clsx(props.className, "input", fullWidth && "w-full")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  )
}
