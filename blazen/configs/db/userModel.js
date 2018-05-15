module.exports = {
    name: {
        type: String,
        pattern: /^[A-Z]+[a-z]+$/,
        validate: {
            validator: (name) => /^[A-Z]+[a-z]+$/.test(name),
            message: "Name should begin with an UpperCase letter, contains only letters, min = 2!!!"
        },
        required: [true, 'Name is required field to fill!!!'],
        minlength: [2, 'The quantity of letters in name must be more than 2!!!']
    },

    familyName: {
        type: String,
        pattern: /^[A-Z]+[a-z]+$/,
        validate: {
            validator: (surname) => /^[A-Z]+[a-z]+$/.test(surname),
            message: "Family name should begin with an UpperCase letter, contains only letters, min = 2!!!"
        },
        required: [true, 'Family name is required field to fill!!!'],
        minlength: [2, 'The quantity of letters in family name must be more than 2!!!']
    },


    username: {
        type: String,
        pattern: /^[A-Za-z1-9]{5,}$/,
        validate: {
            validator: (value) => /^[A-Za-z1-9]{5,}$/.test(value),
            message: "Username should consist of letters and numbers only, min = 5!!!"
        },
        required: [true, 'Username is required field to fill!!!'],
        minlength: [5, 'The quantity of letters in username must be more than 5!!!'],
        unique: [true, 'The username must be unique!!!']
    },

    mail: {
        type: String,
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        validate: {
            validator: (value) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value),
            message: "Please enter valid email address!!!"
        },
        required: [true, 'Email is required field to fill!!!'],
        unique: [true, 'The email must be unique!!!']
    },

    password: {
        type: String,
        pattern: /^([\d]+[a-zA-Z]+|[a-zA-Z]+[\d]+)[\da-zA-Z]*$/,
        validate: {
            validator: (psw) => /^([\d]+[a-zA-Z]+|[a-zA-Z]+[\d]+)[\da-zA-Z]*$/.test(psw),
            message: "Password must contain letters and numbers, min = 5!!!"
        },
        required: [true, 'Password is required field to fill!!!'],
        minlength: [5, 'The quantity of letters in password must be more than 5!!!']
    },

    picture: {
        type: String,
        pattern: /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/,
        validate: {
            validator: (picture) => /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/.test(picture),
            message: "Something wrong with cloudinary!!!"
        }
    },

    link: {
        type: String,
        pattern: /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/,
        validate: {
            validator: (link) => /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/.test(link),
            message: "Please, enter valid internet link!!!"
        }
    },

    birthday: {
        type: String,
        pattern: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
        validate: {
            validator: (birthday) => /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(birthday),
            message: "Birthday is not valid!!!"
        }
    },

    role: {
        type: String,
        pattern: /^(admin|user)$/,
        validate: {
            validator: (role) => /^(admin|user)$/.test(role),
            message: "Role is not valid!!!"
        },
        required: [true, "ROLE IS REQUIRED FIELD!!!"]
    }
};