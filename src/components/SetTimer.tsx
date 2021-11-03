import { useState } from 'react';
import {
  Box,
  Icon,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import { useCountdown } from '../hooks/Countdown';

export function SetTimer(): JSX.Element {
  const { setNewValueCountdown } = useCountdown();

  const [isOpen, setIsOpen] = useState(false);
  const [newCountDownValue, setNewCountDownValue] = useState('');

  const color = useColorModeValue('gray.600', 'gray.500');
  const bg = useColorModeValue('#fff', 'gray.700');

  function cleaner(): void {
    setIsOpen(false);
    setNewCountDownValue('');
  }

  function handleSetNewTime(): void {
    setNewValueCountdown(Number(newCountDownValue));

    setTimeout(() => {
      cleaner();
    }, 200);
  }

  return (
    <Box position="absolute" right="0" top="-8">
      <Popover isOpen={isOpen} onClose={cleaner} placement="bottom-end">
        <PopoverTrigger>
          <Box
            as="button"
            width="6"
            height="6"
            p="0"
            m="0"
            bg="none"
            borderRadius="50%"
            color={color}
            display="flex"
            alignItems="center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon as={FiClock} w="100%" h="100%" />
          </Box>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Definir minutos</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody display="flex" gridColumnGap="3.5">
              <Input
                type="number"
                placeholder="Minutos"
                value={newCountDownValue}
                onChange={e => setNewCountDownValue(e.target.value)}
                w="50%"
                bgColor={bg}
              />

              <Button
                flex="1"
                fontSize="1.333rem"
                fontWeight="600"
                lineHeight="1.6rem"
                color="gray.100"
                bgColor="blue.500"
                textAlign="center"
                _hover={{
                  bg: 'blue.600',
                }}
                _focus={{
                  outline: 'none',
                }}
                onClick={handleSetNewTime}
                disabled={newCountDownValue === '' && true}
              >
                Salvar
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}
