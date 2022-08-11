# uibitz

A kit of components for some projects

# Quick Start

```html
<script src="./basestatic/config/env.js?RANDOM_NUMBER"></script>
<script src="./basestatic/uibitz/uibitz.js?RANDOM_NUMBER"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    window.uibitzReady(() => {
      const headerComponent = window.uibitz.renderComponent("header", document.getElementById('header'));

      const footerComponent = window.uibitz.renderComponent("footer", document.getElementById('footer'));
    });
});
</script>
<div id="header"></div>
<div>body</body>
<div id="footer"></div>
```
