import { Modal, Stack, Flex } from '@mantine/core';
import { useModal } from '../../../hooks/useModal';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';

export function CreateServerModal() {
    const { isOpen, closeModal } = useModal("CreateServer");
    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => !value.trim && 'Please enter a name for your server',
        }
    })
    return (
        <Modal title="Create a server" opened={isOpen} 
         onClose={closeModal}>Create New Server
          <Text c="dimmed">
            Give your server a personality. You can change this later.
          </Text>
          <form onSubmit={() => {}}>
            <Stack >
                <Flex justify="center" align="center" direction="column">
                </Flex>
            </Stack>

          </form>
        </Modal>
    )
}
