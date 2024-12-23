import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    overflow: hidden;
    top: 40px;
    right: 12px;
    width: 92%;
    background: #ffffff;
    border: 1px solid #000000;
    box-shadow: inset 0 0px 5px rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    z-index: 1;
`;

const MenuItem = styled.button`
    font-size: 1.5rem;
    width: 100%;
    padding: 8px;

    &:hover {
        background: #e7e7e7;
    }
`;

type Props = {
    remove: () => void;
    edit: () => void;
    toggleFavorites: () => void;
    favorites: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: FC<Props> = ({ remove, edit, toggleFavorites, favorites, setMenuVisible }) => {
    const refContainer = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent) => {
        if (refContainer.current && !refContainer.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    });

    return (
        <Container ref={refContainer}>
            <MenuItem onClick={edit}>Редактировать</MenuItem>
            <MenuItem onClick={remove}>Удалить</MenuItem>
            <MenuItem onClick={toggleFavorites}>{favorites ? 'Убрать из избранного' : 'Добавить в избранное'}</MenuItem>
        </Container>
    );
};

export default Menu;
