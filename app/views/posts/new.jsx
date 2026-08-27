import React from 'react'
import { 
  Form, 
  Layout,
  TextField,
  SubmitButton
} from '@javascript/components'
import { useContent } from '@thoughtbot/superglue'
import { useAppSelector } from '@javascript/store'

export default function PostsNew() {
  const {
    postForm,
    postsPath
  } = useContent()

  const { 
    inputs, 
    form, 
    extras 
  } = postForm
  const validationErrors = useAppSelector((state) => state.flash["postFormErrors"])

  return (
    <Layout>
      <Form {...form} extras={extras} validationErrors={validationErrors} data-sg-visit>
        <TextField {...inputs.body} label="Body" errorKey="body" />
        <SubmitButton {...inputs.submit} type="submit"> {inputs.submit.text} </SubmitButton>
      </Form>

      <a href={postsPath} data-sg-visit>Back</a>
    </Layout>
  )
}
