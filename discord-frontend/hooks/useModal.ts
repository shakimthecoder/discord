import { Modal, useGeneralStore } from "../stores/generalstore";

function useModal(modalType: Modal){
    const activeModal = useGeneralStore((state) => state.activeModal);
    const setActiveModal = useGeneralStore((state) => state.setActiveModal);

    const isOpen = activeModal === modalType;

    const openModal = () => {
        setActiveModal(modalType);
    }

    const closeModal = () => {
        setActiveModal(null);
    }

}