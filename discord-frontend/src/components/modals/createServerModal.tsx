import { Modal, Stack, Flex, Group, rem, Button, Image } from '@mantine/core';
import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './CreateServerModal.module.css';

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
                            <IconX size="1.2rem" stroke={1.5} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconUpload size="1.2rem" stroke={1.5} />
                            </Dropzone.Idle>
                            <>
                            <Text size="xl" inline>
                                Drag images here or click to upload files
                                </Text>
                            <Text size="sm" c="trimmed" mt={7}>
                                Upload a server icon to start a server
                            </Text>
                            </>
                     </Group>                      
                    </Dropzone>
                    }
                    {imagePreview && <Flex pos="relative" h={rem(150)} w={rem(150)} mt="md">
                        <>
                        <Button
                         onClick={() => setImagePreview(null)}
                         color="red"
                         pos="absolute"
                         w={rem(30)}
                         style={{
                         zIndex: 1,
                         borderRadius: "50%",
                         padding: 0,
                         top: 0
                         }}
                         h={rem(30)}> 
                         <IconX color="white" />
                         </Button>
                         <Image src={imagePreview} w={rem(200)} h={rem(200)} />
                         </>
                         </Flex>}
                </Flex>
            </Stack>
          </form>
        </Modal>
    )
}
