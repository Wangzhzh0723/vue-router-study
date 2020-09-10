export default {
  name: "router-link",
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: () => "a"
    }
  },
  methods: {
    handler(to) {
      this.$router.push(to)
    }
  },
  render(h) {
    const { tag, to } = this
    // jsx
    return (
      <tag onclick={this.handler.bind(this, to)}>{this.$slots.default}</tag>
    )
  }
}
