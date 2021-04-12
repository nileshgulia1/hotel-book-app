import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
const Cards = (props) => (
    <Card.Group>
        <Card fluid raised className='ui-card'>
            <Image src={props.items.thumbnail.url} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.items.card_title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{props.items.date}</span>
                </Card.Meta>
                <Card.Description>
                    {props.items.excerpt}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='map marker' />
                    {props.items.taxonomies.destinations[0].name}
                </a>
            </Card.Content>
        </Card>
    </Card.Group>

)

export default Cards;