import { Modal, Stack, Flex, Group, rem, Button, Image, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { IconUpload, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from '@mantine/dropzone';
import classes from './CreateServerModal.module.css';
import { useMutation } from '@apollo/client';
import { CREATE_SERVER, } from '../../graphql/mutations/server/createServer';
import { useProfileStore } from '../../../stores/profilestore';
import { create } from 'zustand';

export function CreateServerModal() {
    const { isOpen, closeModal } = useModal("CreateServer");
    const [createServer, { loading}] = useMutation<
    CreateServerMutation,
    CreateServerMutationVariables>(CREATE_SERVER);
    const profileId = useProfileStore((state) => state.profile?.id);

    const form = useForm({
        initialValues: {
          name: "",
        },
        validate: {
          name: (value) => !value.trim() && "Please enter a name.",
        },
      })
      const onSubmit = () => {
        if (!form.validate()) return
    
        createServer({
          variables: {
            input: {
              name: form.values.name,
              profileId,
            },
            files,
          },
          onCompleted: () => {
            setImagePreview(null)
            setFiles(null)
            form.reset
            closeModal()
          },
    
          refetchQueries: ["GetServers"],
        })
      }
    const [files, setFiles] = useState<File | null>(null);

    const handleDropZoneChange: DropzoneProps["onDrop"] = (files) => {
        if(files.length === 0) {
            setImagePreview(null);
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        }
        setFiles(files[0]);
        reader.readAsDataURL(files[0])
    }

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
                    onDrop={(files) => {
                    handleDropZoneChange(files)}}
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
                         top: 0,
                         right: 10
                         }}
                         h={rem(30)}> 
                         <IconX color="white" />
                         </Button>
                         <Image src={imagePreview} w={rem(150)} h={rem(150)} radius={"50"} />
                         </>
                         </Flex>}
                         <TextInput
                            label="Server Name"
                            placeholder="Enter server name"
                            {...form.getInputProps('name')}
                            error={form.errors.name}
                            >
                         </TextInput>
                          <Button disabled={!!form.errors.name} w={"30%"} 
                          type="submit" 
                          variant="gradient"
                          mt="md"> 
                          Create Server 
                         </Button>
                </Flex>
            </Stack>
          </form>
        </Modal>
    )
}
