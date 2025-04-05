import { Modal, Stack, Flex } from '@mantine/core';
import { useModal } from '../../../hooks/useModal';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone'

export function CreateServerModal() {
    const { isOpen, closeModal } = useModal("CreateServer");
    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => !value.trim && 'Please enter a name for your server',
        }
    });

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    return (
        <Modal title="Create a server" opened={isOpen} 
         onClose={closeModal}>Create New Server
          <Text c="dimmed">
            Give your server a personality. You can change this later.
          </Text>
          <form onSubmit={() => {}}>
            <Stack >
                <Flex justify="center" align="center" direction="column">
                    { !imagePreview && <Dropzone>
                        </Dropzone>}
                </Flex>
            </Stack>

          </form>
        </Modal>
    )
}
