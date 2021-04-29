export default {
  methods: {
    numberOnly(event) {
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      const keyPressed = event.key
      if (!keysAllowed.includes(keyPressed)) {
        event.preventDefault()
      }
    },
  }
}
