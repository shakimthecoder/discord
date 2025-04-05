import { Modal, Stack, Flex, Group } from '@mantine/core';
import { useModal } from '../../../hooks/useModal';
import { IconUpload } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import * as classes from './CreateServerModal.module.css';

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
                    { !imagePreview && 
                    <Dropzone
                    onDrop={() => {}}
                    className={classes.dropZone}
                    accept={IMAGE_MIME_TYPE}
                    mt="md"
                    >
                     <Group
                     style={{
                     minHeight: rem(100),
                     pointerEvents: 'none',
                     }}
                     >
                      <Dropzone.Accept>
                        <IconUpload size="1.2rem" stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconUpload size="1.2rem" stroke={1.5} color="red" />
                            </Dropzone.Reject>
                     </Group>
                                        
                        </Dropzone>}
                </Flex>
            </Stack>

          </form>
        </Modal>
    )
}
