import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DragabbleCard';

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

const Area = styled.div<IArea>`
  background-color: ${props => props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThisWith ? '#b2bec3' : 'transparent'};
  flex-grow: 1;
  transition: background-color .3s ease-in-out;
  padding: 20px;
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
        {(provided, snapshot) =>
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) =>
              <DraggableCard key={toDo} index={index} toDo={toDo}/>
            )}
            {provided.placeholder}
          </Area>
        }
      </Droppable>
    </Wrapper>
  );
}

export default Board;