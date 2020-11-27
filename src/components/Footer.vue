<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; {{ year }}</b> &mdash; Yemen HR
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo"></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBar",
  computed: {
    year() {
      return new Date().getFullYear();
    }
  }
};
</script>
