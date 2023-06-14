/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui';

const Service = ({ service }) => {
  return (
    <Box sx={styles.service}>
      <Text as="p">{service.title}</Text>
      <Text as="span">{service.price}</Text>
    </Box>
  );
};

export default Service;

const styles = {
  service: {
    border: (theme) => `1px solid ${theme.colors.borderColor}`,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    minHeight: [107, null, null, 130],
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out 0s',
    ':hover': {
      boxShadow: '0px 11px 30px rgba(51, 83, 145, 0.07)',
      borderColor: 'transparent',
    },
    p: {
      fontWeight: 800,
      fontSize: [1, null, null, '20px'],
      lineHeight: 1.77,
      color: 'heading',
    },
    span: {
      color: 'primary',
      fontWeight: 700,
      textAlign: 'justify',
      fontSize: [1, null, null, '18px'],
      lineHeight: 2,
    },
  },
};
