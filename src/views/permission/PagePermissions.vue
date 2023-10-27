<template>
  <div class="permission-page">
    <el-radio-group v-model="roles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "ChangePermissions",
  data() {
    return {}
  },
  computed: {
    roles: {
      get() {
        return this.$store.getters.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val)
      }
    }
  },
  mounted() { }
}
</script>

<style></style>