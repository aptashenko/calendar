import {defineAsyncComponent, reactive} from "vue";
import {MODAL_NAMES} from "@/components/modals/components/enums";
const defaultProps = {
    transition: {name: 'fade'},
    background: 'transparent',
    selfClick: true
}

const globalModalState = reactive({ component: null, props: defaultProps, showContent: false });
export function useModals() {
    const openModal = (name, props = {}) => {
        const component = defineAsyncComponent(() => import(`../components/modals/components/${name}.vue`));
        globalModalState.component = component;
        globalModalState.props = {...defaultProps, ...props};
    }

    const toggleComponent = state => {
        const value = typeof state === 'boolean' ? state : !globalModalState.showContent;
        globalModalState.showContent = value;
    }
    const closeModal = () => {
        globalModalState['component'] = null;
        globalModalState['props'] = defaultProps;
    }

  const openAuthModal = props => {
    const defaultAuthModalProps = {
      selfClick: false,
      background: 'blur'
    }
    openModal(MODAL_NAMES.login, {...defaultAuthModalProps, ...props})
  }

  const openCreateEventModal = props => {
      openModal(MODAL_NAMES.createEvent, props)
  }

    return {globalModalState, closeModal, openModal, toggleComponent, openAuthModal, openCreateEventModal}
}
