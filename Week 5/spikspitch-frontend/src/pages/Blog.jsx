import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { posts, tones } from '../data/posts.js'

export default function Blog() {
  return (
    <div className="px-5 py-8 sm:px-12 md:py-12 lg:px-[14%]">
      <h1 className="display-chunky text-chunky text-center text-6xl uppercase text-[var(--purple)] sm:text-8xl">Blog</h1>

      {/* 1 column on phone, 2 on tablet, 3 on desktop */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => {
          const tone = tones[i % tones.length]
          return (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="card-chunky card-chunky--lift flex flex-col overflow-hidden"
            >
              <div className={`flex h-36 items-center justify-center ${tone.bg} ${tone.icon}`}>
                <Icon name={p.icon} size={64} strokeWidth={2.5} />
              </div>
              <h2 className="display-chunky flex min-h-[4.5rem] items-center border-y-3 border-black bg-[var(--purple)] px-4 py-2 text-xl text-white">
                {p.title}
              </h2>
              <p className="flex-1 p-4 text-sm font-semibold">{p.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
