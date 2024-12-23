import { FC, useState } from 'react';
import styled from 'styled-components';
import Menu from './menu';
import confirm from './images/confirm.svg';
import cancel from './images/cancel.svg';

const Container = styled.div`
    background-color: #ffae00;
    border: 2px solid #000000;
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
    padding: 16px;
    width: 330px;
    position: relative;
    transition: 0.3s ease;
    display: flex;
    justify-content: space-between;

    @media (max-width: 332px) {
        width: 100%;
    }
`;

const Title = styled.h2`
    font-size: 1.7rem;
    margin-bottom: 5px;
`;
const Description = styled.p`
    font-size: 1.4rem;
`;

const EditButtons = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
`;
const Button = styled.button`
    display: grid;
    width: 38px;
    height: 38px;
    text-align: center;
    font-size: 2rem;
    img {
        margin: auto;
    }
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    input,
    textarea {
        border-radius: 10px;
        outline: 1px solid black;
        background-color: #ffffff;
        width: 100%;
    }
`;

const TitleInput = styled.input`
    font-size: 1.7rem;
    margin-bottom: 5px;
`;
const DescriptionInput = styled.textarea`
    field-sizing: content;
    overflow-wrap: anywhere;
    resize: none;
    font-size: 1.4rem;
`;

type Props = {
    post: {
        id: number;
        title: string;
        description: string;
    };
    removePost: (id: number) => void;
};

const Card: FC<Props> = ({ post, removePost }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [editMode, setEditMode] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const remove = () => {
        removePost(post.id);
    };

    const edit = () => {
        setEditMode(!editMode);
        toggleMenu();
    };
    const cancelEdit = () => {
        setEditMode(!editMode);
    };
    const confirmEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const titleInput = form.elements.namedItem('title') as HTMLInputElement;
        const descriptionInput = form.elements.namedItem('description') as HTMLInputElement;

        setTitle(titleInput.value);
        setDescription(descriptionInput.value);
        setEditMode(!editMode);
    };

    const toggleFavorites = () => {
        setFavorites(!favorites);
        toggleMenu();
    };

    return (
        <Container>
            {!editMode && (
                <>
                    <div>
                        <Title style={favorites ? { color: 'blue' } : {}}>{title}</Title>
                        <Description style={favorites ? { color: 'blue' } : {}}>{description}</Description>
                    </div>
                    <EditButtons>
                        <Button onClick={toggleMenu}>⋮</Button>
                        {menuVisible && <Menu remove={remove} edit={edit} favorites={favorites} toggleFavorites={toggleFavorites} setMenuVisible={setMenuVisible}/>}
                    </EditButtons>
                </>
            )}
            {editMode && (
                <>
                    <Form
                        id="edit"
                        onSubmit={(e) => {
                            confirmEdit(e);
                        }}
                    >
                        <TitleInput defaultValue={title} name="title"></TitleInput>
                        <DescriptionInput defaultValue={description} name="description" id="description"></DescriptionInput>
                    </Form>
                    <EditButtons>
                        <Button onClick={cancelEdit}>
                            <img src={cancel} alt="Отмена" />
                        </Button>
                        <Button type="submit" form="edit">
                            <img src={confirm} alt="Подтверждение" />
                        </Button>
                    </EditButtons>
                </>
            )}
        </Container>
    );
};

export default Card;
