var users = [
    { id: 1, name: 'Cuia IFRS', username: 'Cuia do programador', email: 'chimaifrs@poa.ifrs.edu.br' },
    { id: 2, name: 'Patrick Garcia', username: 'patrick.garcia', email: 'patrick.garcia@poa.ifrs.edu.br' },
    { id: 3, name: 'Louise Pedroso', username: 'louisep', email: 'louisep@hotmail.com' },
    { id: 4, name: 'Guri da fronteira', username: 'guridf', email: 'guridf@churrasco.br' }

];

function findUser(userId) {
    return users[findUserKey(userId)];
};

function findUserKey(userId) {
    for (var key = 0; key < users.length; key++) {
        if (users[key].id == userId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#user-list',
    data: function() {
        return { users: users, searchKey: '' };
    },
    computed: {
        filteredUsers: function() {
            return this.users.filter(function(user) {
                return this.searchKey == '' || user.name.indexOf(this.searchKey) !== -1;
            }, this);
        }
    }
});

var User = Vue.extend({
    template: '#user',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    }
});

var UserEdit = Vue.extend({
    template: '#user-edit',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    },
    methods: {
        updateUser: function() {
            var user = this.user;
            users[findUserKey(user.id)] = {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            };
            router.push('/');
        }
    }
});

var UserDelete = Vue.extend({
    template: '#user-delete',
    data: function() {
        return { user: findUser(this.$route.params.user_id) };
    },
    methods: {
        deleteUsers: function() {
            users.splice(findUserKey(this.$route.params.user_id), 1);
            router.push('/');
        }
    }
});

var AddUser = Vue.extend({
    template: '#add-user',
    data: function() {
        return { user: { name: '', description: '', price: '' } }
    },
    methods: {
        createProduct: function() {
            var product = this.product;
            users.push({
                id: Math.random().toString().split('.')[1],
                name: product.name,
                description: product.description,
                price: product.price
            });
            router.push('/');
        }
    }
});

var router = new VueRouter({
    routes: [
        { path: '/', component: List },
        { path: '/product/:product_id', component: Product, name: 'product' },
        { path: '/add-product', component: AddUser },
        { path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit' },
        { path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete' }
    ]
});
app = new Vue({
    router: router
}).$mount('#app')