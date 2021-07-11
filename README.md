# vue-admin-scaffold

Admin Dashboard Frontend, based on [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

Official Documentation [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/#/)

Corresponding backend API service scaffold:

- JAVA Version: [spring-boot-example](https://github.com/dodowhat/spring-boot-example)

## Development

### Downloading Project

    git clone https://github.com/dodowhat/vue-admin-example

### Installing Independencies

    cd vue-admin-scaffold
    npm install

### Running Project

    npm run dev

### Building Project

    npm run build:prod

## Customation

All other features you can reference the offical documentation mentioned above.

### Custom Router Push & Replace Functions

Usage:

    // Example Component
    export default {
        methods: {
            submit() {
                this.$root.rPush('/users')
                this.$root.rPush({ path: '/users' })

                this.$root.rReplace('/users')
                this.$root.rReplace({ path: '/users' })
            }
        }
    }

The parameters are same as the origin `this.$router.push()` and `this.$router.replace()`

Explanation:

Suppose there is a link button in sidebar, it's pointed to a router view `/users` for listing users, you click it and it redirects to the view, then you click it again, this time it does nothing, because Vue doesn't rerender view for same route.

Normally, we expect the view being rerendered if we click the link again, because the data might be updated since last fetching. That's why I added these two redirection functions.

By using these two functions, it will be redirected to an intermidiate blank view component, then redirecting to the target path. This will force vue to rerender the view even the target path is same as the previous one. The process is automatic and the transition is smooth, you won't see such as blank view blinking.

As an admin dashboard, I'd like to make it's behavior more like a traditional web page, not a non refreshing SPA.
