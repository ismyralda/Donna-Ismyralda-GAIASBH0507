import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { posts, tones } from '../data/posts.js'

export default function BlogPost() {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]

  if (!post) {
    return (
      <div className="px-5 py-16 text-center">
        <h1 className="display-chunky text-5xl">Article not found</h1>
        <Link to="/blog" className="btn-chunky btn-chunky--charcoal btn-chunky--lg mt-6">
          <Icon name="chevrons-left" size={18} strokeWidth={3} /> Back to blog
        </Link>
      </div>
    )
  }

  const tone = tones[index % tones.length]

  return (
    <div className="px-5 py-8 sm:px-12 lg:px-[18%]">
      <Link to="/blog" className="btn-chunky btn-chunky--ghost btn-chunky--lg mb-6">
        <Icon name="chevrons-left" size={18} strokeWidth={3} /> Back to blog
      </Link>

      <article className="card-chunky overflow-hidden">
        <div className={`flex h-48 items-center justify-center border-b-3 border-black ${tone.bg} ${tone.icon}`}>
          <Icon name={post.icon} size={96} strokeWidth={2.5} />
        </div>
        <div className="p-6 sm:p-10">
          <h1 className="display-chunky text-4xl sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-lg font-bold">{post.description}</p>
          <div className="mt-6 space-y-4 text-lg font-medium leading-relaxed">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
