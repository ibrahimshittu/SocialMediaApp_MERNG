import React from 'react'
import {useQuery, gql} from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

const Home = () => {
  const {loading, data: {getPosts: posts} = {}} = useQuery(FETCH_POSTS)

  return (
    <Grid columns={3} >
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ): (posts && posts.map((post) => 
        (<Grid.Column key={post.id} style={{marginBottom: 20}}>
          <PostCard post={post} />
        </Grid.Column>)
        ))}
      
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS = gql`
  { getPosts{
    id body username likeCount
    likes {
      username 
    }
    commentCount
    comments {
      id username body
    }

  }
  }
`

export default Home