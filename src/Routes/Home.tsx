import { useQuery } from 'react-query';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { useState } from 'react';
import useWindowDimensions from '../Hooks/useWindowDimensions';

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;

  &:first-child {
    transform-origin: left center;
  }

  &:last-child {
    transform-origin: right center;
  }
`;

const boxVariants = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween'
    }
  }
};

const BoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const boxInfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween'
    }
  }
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { width } = useWindowDimensions();
  const increaseIndex = () => {
    if (data == null) return;
    if (leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex(prev => prev === maxIndex ? 0 : prev + 1);
  };
  const toggleLeaving = () => setLeaving(prev => !prev);
  return (
    <Wrapper>
      {isLoading ? <Loader>Loading...</Loader>
        :
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')} onClick={increaseIndex}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row key={index}
                   initial={{ x: width - 10 }}
                   animate={{ x: 0 }}
                   exit={{ x: -width + 10 }}
                   transition={{ type: 'tween', duration: 1 }}
              >
                {data?.results.slice(1).slice(index * offset, index * offset + offset).map(movie =>
                  <Box
                    key={movie.id}
                    $bgPhoto={makeImagePath(movie.backdrop_path, 'w300')}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: 'tween' }}
                  >
                    <BoxInfo variants={boxInfoVariants}>
                      <h4>{movie.title}</h4>
                    </BoxInfo>
                  </Box>
                )}
              </Row>
            </AnimatePresence>
          </Slider>
        </>}
    </Wrapper>
  );
}

export default Home;