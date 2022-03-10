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
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <Wrapper>
      <Box animate={{ borderRadius: '100px' }} transition={{ delay: 3, duration: 3 }}/>
      <Box
        initial={{scale:0}}
        animate={{scale:1, rotateZ:360}}
        transition={{type: 'spring', stiffness:10}}
      />
    </Wrapper>
  );
}

export default App;