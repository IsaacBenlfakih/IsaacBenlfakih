import React from 'react'
import { Layout } from '@javascript/components'
import { useContent } from '@thoughtbot/superglue'

export default function PostsShow() {
  const {
    body,
    editPostPath,
    postsPath
  } = useContent()

  return (
    <Layout>
      <p>
        <strong>Body:</strong>
        {body}
      </p>
      <a href={ editPostPath } data-sg-visit>Edit</a>
      <a href={ postsPath } data-sg-visit>Back</a>
    </Layout>
  )
}
