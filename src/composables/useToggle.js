import {ref} from "vue";

export function useToggle() {
  const isToggled = ref(false);

  const toggle = () => {
    isToggled.value = !isToggled.value;
  }

  return {isToggled, toggle}

}
