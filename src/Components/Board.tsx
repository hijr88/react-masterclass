import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DragabbleCard';

const Wrapper = styled.div`
  padding: 30px 10px 20px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoard {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoard) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) =>
          <div style={{ backgroundColor: 'red' }} ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) =>
              <DraggableCard key={toDo} index={index} toDo={toDo}/>
            )}
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </Wrapper>
  );
}

export default Board;