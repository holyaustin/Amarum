/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from 'theme-ui';
import SectionHeading from '../components/section-heading';
import Service from '../components/cards/service';
import { transform } from 'framer-motion';

const services = [
  {
    title: 'Best Multimodal Activity Recognition Video Dataset ',
    price: 'The Moments in Time Dataset is a research project dedicated to building a very large-scale dataset to help AI systems recognize and understand actions and events in videos. '
  },
  {
    title: 'Largest Human Action Video Dataset',
    price: 'Kinetics-700 is a large-scale video dataset that includes human-object interactions such as playing instruments, as well as human-human interactions such as shaking hands and hugging. '
  },
  {
    title: 'Best Emotion Recognition Video Dataset',
    price: 'The Expression in-the-Wild (ExpW) dataset aims to investigate if such fine-grained and high-level relation traits can be characterized and quantified from face images in the wild. ',
  },
 
  {
    title: 'Best Scene Understanding Video Dataset',
    price: 'The ADE20K Dataset is a large-scale, semantic segmentation dataset. Every scene-centric image is exhaustively annotated, with pixel-level objects and object parts labels. ',
  },
  {
    title: 'Best Pose Estimation Video Dataset',
    price: 'Human Pose dataset is a state-of-the-art benchmark for the evaluation of articulated human pose estimation. The images were systematically collected using an established taxonomy of everyday human activities. ',
  },
  {
    title: 'Sports-1M Datasets',
    price: 'Large sports IM Datasets for various sport analysis. The datasets provided include the players data for the Career Mode from FIFA 15 to FIFA 22. Historical comparison between Messi and Ronaldo. Ideal budget to create a competitive team',
  },
  {
    title: 'Epic Kitchen Datasets',
    price: 'The largest dataset in first-person (egocentric) vision; multi-faceted non-scripted recordings in native environments - i.e. the wearers homes, capturing all daily activities in the kitchen over multiple days. ',
  },
  {
    title: 'Amination Datasets',
    price: 'Thanks to this ability to “create whatever you can conceive”, animation is the perfect video style or explaining difficult or complicated concepts in an easy and digestible way – meaning it goes beyond marketing and into the realm of educational videos.'
  },
];

const Services = () => {
  return (
    <Box as="section" id="services" sx={styles.section}>
      <Container>
        <SectionHeading
          slogan="Ideal Video Datasets for you"
          title="Upload videos and get rewarded? Just upload it!"
        />
        <Box sx={styles.grid}>
          {services.map((service, i) => (
            <Service key={i} service={service} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

const styles = {
  section: {
    pt: [8, null, null, null, 10, 12],
    pb: [12, null, null, null, null, 15],
  },
  grid: {
    gap: [3, null, null, 4],
    display: 'grid',
    justifyContent: 'center',
    fontSize: "40px",
    gridTemplateColumns: [
      'repeat(2, 1fr)',
      null,
      null,
      'repeat(3, 1fr)',
      null,
      'repeat(4, 1fr)',
      'repeat(4, 300px)',
    ],
  },
};
