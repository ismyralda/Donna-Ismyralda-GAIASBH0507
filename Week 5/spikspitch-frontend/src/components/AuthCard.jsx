export default function AuthCard({ title, chip, children, footer }) {
  return (
    <div className="px-5 py-10 sm:px-12 md:py-16">
      <div className="card-chunky card-chunky--lg mx-auto max-w-md overflow-hidden">
        <div className="border-b-3 border-black bg-[var(--purple)] px-6 py-4">
          <p className="chip-chunky">{chip}</p>
          <h1 className="display-chunky text-chunky mt-2 text-5xl uppercase text-[var(--yellow)]">{title}</h1>
        </div>
        <div className="p-6 sm:p-8">
          {children}
          <p className="mt-6 text-sm font-semibold">{footer}</p>
        </div>
      </div>
    </div>
  )
}
