import React from 'react'
import { Card, Button, Image} from 'semantic-ui-react'


const PostCard = ({post: {body, username, likeCount, comments, likes, commentCount} }) => {
  return (
    <Card>
        <Card.Content>
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
            <div className='ui two buttons'>
            <Button basic color='green'>
                Approve
            </Button>
            <Button basic color='red'>
                Decline
            </Button>
            </div>
        </Card.Content>
    </Card>
  )
}

export default PostCard