import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button,Label, Icon, Image} from 'semantic-ui-react'


const PostCard = ({post: {body,id, username, likeCount, comments, likes, commentCount} }) => {

    const likePost = () => {}
    const commentOnPost = () => {}

  return (
    <Card fluid>
        <Card.Content as={Link} to={`/posts/${id}`}> 
            <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta>New User</Card.Meta>
            <Card.Description>
            {body}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='teal' basic>
                    <Icon name='heart' />
                    
                </Button>
                <Label basic color='teal' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
            <Button as='div' labelPosition='right'>
                <Button color='blue' basic>
                    <Icon name='comments' />
                    
                </Button>
                <Label basic color='blue' pointing='left' onClick={commentOnPost}>
                    {commentCount}
                </Label>
            </Button>
        </Card.Content>
    </Card>
  )
}

export default PostCard