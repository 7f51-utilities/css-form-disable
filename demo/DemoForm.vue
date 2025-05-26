<template>
    <div class="demo-container">
        <h2>Vue Component with Custom Classes</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <input v-model="form.email" type="email" required placeholder="Email">
            </div>

            <div class="form-group">
                <input v-model="form.name" type="text" required minlength="2" placeholder="Name (2+ chars)">
            </div>

            <div class="form-actions">
                <button type="submit" class="submit-btn">Submit Button</button>
                <button type="submit" class="form-submit">Form Submit</button>
                <button type="submit" class="submit-button">Submit Button Alt</button>
                <a href="#" @click.prevent="submitViaLink" class="submit-link">Submit Link</a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'DemoForm',
    data() {
        return {
            form: {
                email: '',
                name: ''
            }
        };
    },
    methods: {
        handleSubmit() {
            console.log('Form submitted:', this.form);
        },
        submitViaLink() {
            console.log('Link submitted:', this.form);
        }
    }
};
</script>

<style scoped>
.demo-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-actions {
    display: flex;
    gap: 10px;
    align-items: center;
}

.submit-btn {
    background: #28a745;
    color: white;
}

.form-submit {
    background: #dc3545;
    color: white;
}

.submit-button {
    background: #007cba;
    color: white;
}

.submit-link {
    background: #6c757d;
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 4px;
}
</style>
