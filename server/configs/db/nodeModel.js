module.exports = {
    name: {
        type: String,
        required: [true, 'Name of node is required field to fill!!!'],
        minlength: [2, 'The quantity of letters in node name must be more than 2!!!']
    },

    link: {
        type: String,
        pattern: /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/,
        validate: {
            validator: (link) => /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:+([\d]|[1-9][\d]|[1-9][\d][\d]|[1-9][\d][\d][\d]|[1-5][\d][\d][\d][\d]|[6][0-4][\d][\d][\d]|[6][5][0-4][\d][\d]|[6][5][5][0-2][\d]|[6][5][5][3][0-5]))?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/.test(link),
            message: "Please, enter valid node internet link!!!"
        }
    },

    format: {
        type: String
    },

    parent: {
        type: require('mongoose').Schema.ObjectId
    },

    path: {
        type: String
    },

    deleted: {
        type: Boolean,
        required: [true, "Please, set up a deleted flag!!!"]
    },

    favourite: {
        type: Boolean
    },

    date: {
        type: String
    }
};