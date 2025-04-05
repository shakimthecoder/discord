import { Modal } from '@mantine/core';
import { useModal } from '../../../hooks/useModal';

export function CreateServerModal() {
    const { isOpen, closeModal } = useModal("CreateServer");
    return (
        <Modal opened={isOpen} onClose={closeModal}>Create New Server</Modal>
    )
}
