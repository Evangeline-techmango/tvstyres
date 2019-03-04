const Role = require('../models').Role;

module.exports = {
    create(req,res){
        if(!req.body.name && !req.body.department_id) {
            res.status(400).send("invalid or empty not allowed");
        }
        return Role
            .create({
                name: req.body.name,
                department_id: req.body.department_id,
                created_by: req.body.created_by
            })
            .then((user) => {res.status(200).send('created Successfully')})
            .catch((error) => {res.status(400).send(error)})
        // res.status(200).send('created successfully');
    },
    delete(req,res) {
        console.log(req.body.id);
        Role
            .destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(() => {res.status(200).send('deleted successfully')})
            .catch((error) => {res.status(400).send(error)});
    },
    list(req,res) {
        let jsonData = require('./sample.json');
        let roles = require('./userroles.json');
        return Role
            .findAll()
            .then((list) => {res.render('admin/dashboard.ejs',{posts: jsonData,userRoles: list})})
            .catch((error) => res.status(400).send(error))
    }
}