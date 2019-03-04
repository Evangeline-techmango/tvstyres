const User = require('../models').User;
const Profile = require('../models').Profile;
const Country = require('../models').Country;
var jwt = require('jsonwebtoken');
const fs = require('fs');


module.exports = {
	list(req,res){
	    console.log(req.session)
		return User
			.findAll()
			.then((users)=> { res.render('index.ejs',{ users: users[0], uid:  req.genid }) })
			.catch((error) => {res.status(400).send(error)} )
	},
	getById(req,res){
		return User
			.findById(req.params.id,{
				include: [{
					model: Profile,
          			as: 'profile'
				}],
			})
			.then((user)=>{res.status(200).send(user)})
			.catch((error)=>{res.status(400).send(error)})
	},
	add(req,res){
        var token = getToken(req.headers);
        if(!req.body.username || !req.body.password){
			res.status(400).send("Please enter username or password")
		}
		return User
			.create({
				username: req.body.username,
				password: req.body.password
			})
			.then((user) => {res.status(201).send(user)})
			.catch((error) => {console.log(error); res.status(400).send(error)})
	},
	login(req,res) {
		return User
			.find({
				where: {
					username: req.body.username
				}
			})
			.then((user) => {
				if(!user) {
					res.status(401).send({
						message: 'Authentication failed!'
					});
				}
				user.comparePassword(req.body.password, (err, isMatch) => {
					if(isMatch && !err) {
						var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
						jwt.verify(token, 'nodeauthsecret', function(err, data){
							console.log(err, data);
						})
						res.json({success: true, token: 'JWT ' + token});
					}
					else {
						res.status(401).send({
							success: false,
							msg: "Authentication failed. Password wrong!"
						})
					}
				})
			})
			.catch((error) => res.send(400).send(error));
	},
	update(req,res){
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(400).send({
						message: 'User not found'
					})
				}
				return user
					.update({
						username: req.body.username || user.username,
						password: req.body.password || user.password
					})
					.then(() => {res.status(200).send(user)}) 
					.catch((error) => {res.status(400).send(error)});
			})
			.catch(() => {})

	},
	delete(req,res){
		User
		.findById(req.params.id)
		.then((user) => {
			if(!user) {
				res.status(400).send({
					message: 'User not found'
				})
			}
			return user
				.destroy()
				.then(() => res.status(204).send())
				.catch((error) => res.status(400).send(error));
		})
		.catch((error) => {res.status(400).send(error)});
	},
	about(req,res) {
		return User
			.findAll()
			.then((users)=> { res.render('profile.ejs',{ users: users[0]}) })
			.catch((error) => {res.status(400).send(error)} )
	},
    grid(req,res) {
        return User
            .findAll()
            .then((users)=> { res.render('tables.ejs',{ users: users[0]}) })
            .catch((error) => {res.status(400).send(error)} )
    },
	insertCountry(req,res) {
		return Country
			.create({
                name: req.body.country_name,
				country_id: req.body.country_id
			})
			.then((country) => {res.status(201).send(country)})
			.catch((error) => {res.status(400).send(error)})

	},
	getCountry(req,res) {
		return Country
			.findAll()
			.then((country) => res.status(200).send(country))
			.catch((error) => res.status(400).send(error))
	},
    withWeightment(req,res){
        res.render('withWeighment.ejs');
    },
    weighBridgeProcess(req,res){
        res.render('weighBridgeProcess.ejs');
    },
    weighBridgeEmptyProcess(req,res){
        res.render('weighBridgeProcess_empty.ejs');
    },
    unloadProcess(req,res){
        res.render('unloadProcess.ejs');
    },
    withoutWeightment(req,res){
        res.render('index.ejs');
    },
    securityUnload(req,res){
        res.render('wiwsecurityUnload.ejs');
    },
    storesUnload(req,res){
        res.render('wiwstoresUnload.ejs');
    },
    wwstoresUnload(req,res){
        res.render('wwstoresUnload.ejs');
    },
    signin(req,res){
        res.render('login.ejs');
    },
    signup(req,res){
        res.render('signup.ejs');
    },
    storeClearance(req,res){
        res.render('storeClearance.ejs');
    },
    createRole(req,res){
        res.render('admin/createRole.ejs',{sucess: req.session.success, errors: req.session.errors});
        req.session.errors = null;
    },
    createUserRole(req,res){
		console.log(req.body);
		let roleName = req.body.rolename;
		let department = req.body.department_name;

		req.checkBody('rolename','Please enter Rolename').notEmpty();
		req.checkBody('department_name','Please enter Department Name').notEmpty();

		var errors = req.validationErrors();
		if (errors) {
			req.session.errors = errors;
			req.session.success = false;
			res.redirect('/createRole');
		}
		else {
			req.session.success = true;
			res.redirect('/');
		}

    },
	dashboard(req,res){
        let jsonData = require('./sample.json');
        let roles = require('./userroles.json');
        res.render('admin/dashboard.ejs', {posts: jsonData, userRoles: roles});
    },
    userList(req,res){
        res.render('admin/userList.ejs');
    }
}