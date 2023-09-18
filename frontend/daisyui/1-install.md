# Install

Install daisyUI as a Tailwind CSS plugin

1. Install daisyUI
    ```
    yarn add -D daisyui@latest
    ```
1. Then add daisyUI to your `tailwind.config.js` files:

    ```js
    module.exports = {
      //...
      plugins: [require("daisyui")],
    }
    ```