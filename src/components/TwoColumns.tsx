export const TwoColumns: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-2 divide-x min-h-screen">{children}</div>
  )
}

export const Column: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className="p-5">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}
