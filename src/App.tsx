import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: '100px' },
  drag: { backgroundColor: '#cd9fef', transition: { duration: 2 } }
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
        whileDrag="drag"
      />
    </Wrapper>
  );
}

export default App;