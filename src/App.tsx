import { useState } from 'react';
import Card from './components/card';
import posts from './components/posts.json';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px;
    justify-content: center;
`;

const App = () => {
    const [postList, setPostList] = useState(posts)
    const removePost = (id: number) => {
        setPostList(postList.filter((post) => post.id !== id));
    };

    return (
        <Container>
            {postList.map((post) => (
                <Card key={post.id} post={post} removePost={ removePost } />
            ))}
        </Container>
    );
};

export default App;
