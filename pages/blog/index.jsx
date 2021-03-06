import { PostCard } from '../../components/PostCard'
import { pagesByLayout } from '../../utils/sourcebit-utils'

const BlogPage = ({ page, posts }) => {
  return (
    <div data-sb-object-id={page?.__metadata?.id}>
      <h1 data-sb-field-path="title">{page.frontmatter.title}</h1>
      {/* Loop through posts and add post card for each one. */}
      {(posts ?? []).map((post) => (
        <PostCard key={post.__metadata.id} post={post} />
        ))}
    </div>
  )
}

export default BlogPage

export const getStaticProps = async () => {
  const page = pagesByLayout('Blog')[0]
  // retrieve all posts and send to the page component as a prop, sorted by date.
  const posts = pagesByLayout('Post').sort((a, b) => {
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })
  return { props: { page, posts } }
}