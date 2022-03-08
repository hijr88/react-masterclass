import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DragabbleCard';

const Wrapper = styled.div`
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoard {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoard) {
  return (
    <Droppable droppableId={boardId}>
      {(provided) =>
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) =>
            <DraggableCard key={toDo} index={index} toDo={toDo}/>
          )}
          {provided.placeholder}
        </Wrapper>
      }
    </Droppable>
  );
}

export default Board;