export const TwoColumns: React.FC = ({ children }) => {
  return (
    <div className="flex space-y-5 md:space-y-0 md:space-x-10">{children}</div>
  )
}

export const Column: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className="md:w-1/2">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}
