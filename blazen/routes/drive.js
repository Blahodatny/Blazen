const checkAuth = require('../helpers/middlewares').checkAuth,
    mongoose = require('mongoose'),
    Schema = new mongoose
        .Schema(require('../configs/db/nodeModel'))
        .plugin(require('mongoose-path-tree'), {
            pathSeparator: '/#/#/#',
            onDelete: 'DELETE'
        }),
    FavouriteSchema = new mongoose.Schema({
        idFavourite: String,
        path: String
    }),
    ShareSchema = new mongoose.Schema({
        username: String,
        idShared: String,
        path: String
    });

const NodeModel = (username) => mongoose.model("Blazen_Node_" + username, Schema),
    FavouriteModel = (username) => mongoose.model("Blazen_Favourite_" + username, FavouriteSchema),
    OutgoingModel = (username) => mongoose.model("Blazen_Outgoing_" + username, ShareSchema),
    IncomingModel = (username) => mongoose.model("Blazen_Incoming_" + username, ShareSchema);

module.exports = require('express').Router().all('*', checkAuth)
    .get('/', async (req, res) => {
        res.render('drive');
    })

    .get('/tree', async (req, res) => {
        let Node = await NodeModel(req.user.username)
            .findOne({name: "#"});
        if (Node) {
            Node.getChildrenTree({filters: {deleted: false}}, (error, nodes) => {
                res.status(200) //200 OK («хорошо»)
                    .send({
                        rootId: Node._id,
                        array: nodes
                    });
            });
        }
        else {
            await NodeModel(req.user.username)({
                name: "#",
                deleted: false
            })
                .save({validateBeforeSave: false})
                .then(node => {
                    res.status(201) //201 Created («создано»)
                        .send({
                            rootId: node._id,
                            array: []
                        });
                }).catch(console.error);
        }
    })

    .post('/addFolder', async (req, res) => {
        try {
            let Node = NodeModel(req.user.username);
            let Folder = new Node({
                name: req.body.value,
                deleted: false,
                date: new Date().toLocaleTimeString() + " " + new Date().toDateString()
            });
            Folder.parent = await Node.findOne({_id: req.body.parent});
            res.status(201) //201 Created («создано»)]
                .send(await Folder.save());
        }
        catch (error) {
            console.error(error);
            res.sendStatus(500) //500 Internal Server Error («внутренняя ошибка сервера»)
        }
    })

    .post('/addFile', async (req, res) => {
        try {
            let Node = NodeModel(req.user.username);
            let File = new Node({
                name: req.files.item.name,
                format: require('path').extname(req.files.item.name).substr(1),
                deleted: false,
                date: new Date().toLocaleTimeString() + " " + new Date().toDateString()
            });

            File.parent = await Node.findOne({_id: req.body.parent});
            File = await File.save();

            res.status(201) //201 Created («создано»)]
                .send(await Node.findOneAndUpdate(
                    {_id: File._id},
                    {
                        link: (await require('cloudinary').v2.uploader
                            .upload(`data:file/${File.format};base64,${req.files.item.data.toString("base64")}`, {
                                resource_type: 'auto',
                                public_id: req.user.username + "_" + File._id
                            })).secure_url
                    },
                    {new: true}));

        }
        catch (error) {
            console.error(error);
            res.sendStatus(500); //500 Internal Server Error («внутренняя ошибка сервера»
        }
    })

    .get('/getFolderChildren', async (req, res) => {
        (await NodeModel(req.user.username)
            .findById(mongoose.Types.ObjectId(req.query.value)))
            .getChildrenTree({filters: {deleted: false}}, (error, nodes) => {
                res.status(200) //200 OK («хорошо»)
                    .send(nodes)
            });
    })

    .delete('/moveToBin', async (req, res) => {
        let Node = NodeModel(req.user.username);
        let ItemToDelete = await Node.findOne({_id: req.query.value});

        (await Node.findOne({_id: ItemToDelete.parent}))
            .getChildrenTree(
                {
                    filters:
                        {
                            name: ItemToDelete.name,
                            deleted: true
                        }
                }, (error, nodes) => {
                    if (nodes[0])
                        Node.findOneAndUpdate(
                            {_id: nodes[0]._id},
                            {name: nodes[0].name + "_" + nodes[0].date},
                            {new: true}).catch(console.error);

                    Promise.all([
                        Node.findOneAndUpdate({_id: req.query.value}, {deleted: true, favourite: false}),

                        FavouriteModel(req.user.username)
                            .find({path: {"$regex": `${ItemToDelete.path}`}})
                            .remove(),

                        OutgoingModel(req.user.username)
                            .find({idShared: req.query.value})
                    ]).then(result => {
                        Promise.all(
                            result[2].map(res => IncomingModel(res.username).findOneAndRemove({idShared: res.idShared}))
                                .concat(result[2].map(res => res.remove()))
                        ).catch(console.error);

                        ItemToDelete.getChildren(true, (error, items) =>
                            items.forEach(item => item.update({
                                deleted: false,
                                favourite: false
                            }).catch(console.error)));

                        res.status(200)
                            .send('That is OK!!!') //200 OK («хорошо»)
                    });
                });
    })

    .get('/rubbishBin', async (req, res) => {
        NodeModel(req.user.username)
            .find({deleted: true}, (error, nodes) => {
                res.status(200) //200 OK («хорошо»)
                    .send(nodes);
            })
    })

    .delete('/emptyBin', async (req, res) => {
        let deletedNodes = await NodeModel(req.user.username)
            .find({deleted: true});

        for (let i = 0; i < deletedNodes.length; i++) {
            await deletedNodes[i].getChildren(true, (error, nodes) =>
                nodes.forEach(node => {
                    if (node.format)
                        require('cloudinary').v2.uploader.destroy(`${req.user.username + "_" + node._id}`);
                    node.remove();
                }));

            if (deletedNodes[i].format)
                await require('cloudinary').v2.uploader.destroy(`${req.user.username + "_" + deletedNodes[i]._id}`);
            await deletedNodes[i].remove();
        }

        res.status(204) //204 No Content («нет содержимого»)
            .send("Rubbish bin has been emptied!!!");
    })

    .delete('/deleteItem', async (req, res) => {
        let deletedNode = await NodeModel(req.user.username)
            .findOne({_id: req.query.value});

        await deletedNode.getChildren(true, (error, nodes) =>
            nodes.forEach(node => {
                if (node.format)
                    require('cloudinary').v2.uploader.destroy(`${req.user.username + "_" + node._id}`);
                node.remove();
            }));

        if (deletedNode.format)
            await require('cloudinary').v2.uploader.destroy(`${req.user.username + "_" + deletedNode._id}`);
        await deletedNode.remove();
        res.status(204) //204 No Content («нет содержимого»)
            .send("Item has been deleted!!!");
    })

    .get('/restoreItem', async (req, res) => {
        let Node = NodeModel(req.user.username);
        let ItemToRestore = await Node.findOne({_id: req.query.value});

        (await Node.findOne({_id: ItemToRestore.parent}))
            .getChildrenTree(
                {
                    filters:
                        {
                            name: ItemToRestore.name,
                            deleted: false
                        }
                }, (error, nodes) => {
                    if (nodes[0])
                        Node.findOneAndUpdate(
                            {_id: nodes[0]._id},
                            {name: nodes[0].name + "_" + nodes[0].date},
                            {new: true}).catch(console.error);

                    ItemToRestore.update({deleted: false}).catch(console.error);

                    res.status(200)
                        .send('Restored!!!') //200 OK («хорошо»)
                });
    })

    .get('/search', async (req, res) => {
        try {
            let page = parseInt(req.query.page);
            let quantity = 10; // quantity of elements shown on a page
            let list = await NodeModel(req.user.username)
                .find(
                    {
                        name: {$regex: new RegExp(req.query.value, 'i')},
                        deleted: false
                    })
                .skip(quantity * (page - 1)) // quantity of elements to skip from beginning
                .limit(quantity + 1); // limit of elements to be read

            let next = false;

            if (list.length === ++quantity) {
                list.pop();
                next = true;
            }

            res.status(200)
                .send({
                    list: list,
                    next: next
                })
        }

        catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    })

    .get('/itemInDrive', async (req, res) => {
        let Node = NodeModel(req.user.username);
        let Element = await Node
            .findById(mongoose.Types.ObjectId(req.query.value));

        let ides = Element
            .path.match(/[a-zA-Z0-9]+/g);

        let Objects = [];
        for (let i = 0; i < ides.length; i++) {
            if (i === ides.length - 1 && Element.format) break;
            Objects = Objects.concat({
                _id: ides[i],
                name: (await Node
                    .findById(mongoose.Types.ObjectId(ides[i])))
                    .name
            });
        }

        (await Node.findById(mongoose.Types.ObjectId(Objects[Objects.length - 1]._id)))
            .getChildrenTree({filters: {deleted: false}}, (error, nodes) =>
                res.status(200) //200 OK («хорошо»)
                    .send({
                        array: nodes,
                        directory: Objects
                    }));
    })

    .get('/favourite', async (req, res) => {
        const NodeMod = NodeModel(req.user.username);
        const FavouriteMod = FavouriteModel(req.user.username);
        let Node = await NodeMod
            .findById(mongoose.Types.ObjectId(req.query.value));

        let results = await Promise.all([
            FavouriteMod
                .find({path: {"$regex": `${Node.path}`}})
                .remove(),

            NodeMod.findById(mongoose.Types.ObjectId(Node.parent)),

            Node.update({favourite: true})
        ]);

        if (!results[1].favourite)
            new FavouriteMod({
                idFavourite: req.query.value,
                path: Node.path
            }).save();

        Node.getChildren({
            deleted: false,
            $or: [{favourite: {$exists: false}}, {favourite: false}],
        }, true, (error, nodes) =>
            nodes.forEach(node => node.update({favourite: true}).catch(console.error)));

        res.status(200)
            .send('Item was added to favourite!!!');
    })

    .get('/unFavourite', async (req, res) => {
        const NodeMod = NodeModel(req.user.username);
        const FavouriteMod = FavouriteModel(req.user.username);
        let Node = await NodeMod
            .findById(mongoose.Types.ObjectId(req.query.value));

        await Promise.all([
            FavouriteMod
                .find({$or: [{idFavourite: req.query.value}, {path: {"$regex": `${Node.path}`}}]})
                .remove(),

            Node.update({favourite: false})
        ]);

        Node.getChildren({
            deleted: false,
            favourite: true
        }, true, (error, nodes) =>
            nodes.forEach(node => node.update({favourite: false}).catch(console.error)));

        res.status(200)
            .send('Item was unfavoured!!!');
    })

    .get('/getFolderChildrenFavourite', async (req, res) => {
        if (req.query.value === "favourites") {
            let Favourites = await FavouriteModel(req.user.username)
                .find({});
            let array = [];
            for (let i = 0; i < Favourites.length; i++)
                array.push(mongoose.Types.ObjectId(Favourites[i].idFavourite));

            await NodeModel(req.user.username)
                .find({_id: {$in: array}})
                .then(nodes => {
                    res.status(200) //200 OK («хорошо»)
                        .send(nodes)
                })
        }

        else
            (await NodeModel(req.user.username)
                .findById(mongoose.Types.ObjectId(req.query.value)))
                .getChildrenTree({filters: {deleted: false, favourite: true}},
                    (error, nodes) => {
                        res.status(200) //200 OK («хорошо»)
                            .send(nodes)
                    });
    })

    .get('/info', async (req, res) => {
        if (await require('../configs/db/db').User.findOne({$or: [{username: req.query.value}, {mail: req.query.value}]}))
            res.send('');
        else
            res.send('There are no user with such username or mail!!!')
    })

    .get('/share', async (req, res) => {
        if (req.user.username === req.query.username)
            return res.status(200)
                .send('You cannot share own nodes with yourself!!!');
        const NodeMod = NodeModel(req.user.username);
        const OutgoingMod = OutgoingModel(req.user.username);
        const IncomingMod = IncomingModel(req.query.username);
        let Node = await NodeMod
            .findById(mongoose.Types.ObjectId(req.query.value));

        await Promise.all([
            OutgoingMod
                .find({path: {"$regex": `${Node.path}`}, username: req.query.username})
                .remove(),

            IncomingMod
                .find({path: {"$regex": `${Node.path}`}, username: req.user.username})
                .remove()
        ]);

        let ides = Node.path.match(/[a-zA-Z0-9]+/g);

        if (!await OutgoingMod.findOne({idShared: {$in: ides}, username: req.query.username}))
            await Promise.all([
                new IncomingMod({
                    username: req.user.username,
                    idShared: req.query.value,
                    path: Node.path
                }).save(),

                new OutgoingMod({
                    username: req.query.username,
                    idShared: req.query.value,
                    path: Node.path
                }).save()
            ]);

        res.status(200)
            .send('Item was shared!!!');
    })

    .get('/getFolderChildrenOutgoing', async (req, res) => {
        if (req.query.value === "outgoing") {
            let Outgoing = await OutgoingModel(req.user.username)
                .find({});
            let Objects = [];
            for (let i = 0; i < Outgoing.length; i++) {
                let Object = (await NodeModel(req.user.username)
                    .findById(mongoose.Types.ObjectId(Outgoing[i].idShared)))
                    .toObject();
                Object["outgoing"] = Outgoing[i].username;
                Objects.push(Object);
            }

            res.status(200) //200 OK («хорошо»)
                .send(Objects);
        }

        else
            (await NodeModel(req.user.username)
                .findById(mongoose.Types.ObjectId(req.query.value)))
                .getChildrenTree({filters: {deleted: false}},
                    (error, nodes) => {
                        res.status(200) //200 OK («хорошо»)
                            .send(nodes)
                    });
    })

    .get('/unShare', async (req, res) => {
        await IncomingModel((await OutgoingModel(req.user.username)
            .findOneAndRemove({idShared: req.query.value, username: req.query.username})).username)
            .findOneAndRemove({idShared: req.query.value, username: req.user.username});

        res.status(200) //200 OK («хорошо»)
            .send("Item was unshared!!!");
    })

    .get('/getFolderChildrenIncoming', async (req, res) => {
        if (req.query.value === "incoming") {
            let Incoming = await IncomingModel(req.user.username)
                .find({});
            let Objects = [];
            for (let i = 0; i < Incoming.length; i++) {
                let Object = (await NodeModel(Incoming[i].username)
                    .findById(mongoose.Types.ObjectId(Incoming[i].idShared)))
                    .toObject();
                Object["incoming"] = Incoming[i].username;
                Objects.push(Object);
            }

            res.status(200) //200 OK («хорошо»)
                .send(Objects);
        }

        else
            (await NodeModel(req.query.username)
                .findById(mongoose.Types.ObjectId(req.query.value)))
                .getChildrenTree({filters: {deleted: false}},
                    (error, nodes) => {
                        let Objects = [];
                        for (let i = 0; i < nodes.length; i++) {
                            nodes[i]["incoming"] = req.query.username;
                            Objects.push(nodes[i]);
                        }

                        res.status(200) //200 OK («хорошо»)
                            .send(Objects)
                    });
    });