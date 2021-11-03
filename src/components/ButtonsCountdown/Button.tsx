import { ReactNode } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  children: ReactNode;
};

export function ButtonComponent({ children, ...rest }: Props): JSX.Element {
  return (
    <Button
      w="100%"
      fontSize="1.333rem"
      fontWeight="600"
      lineHeight="1.6rem"
      textAlign="center"
      borderRadius="5px"
      boxShadow="base"
      p="0"
      py="10"
      transition="800ms"
      {...rest}
    >
      {children}
    </Button>
  );
}
