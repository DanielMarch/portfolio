'use strict';

var multiparty = require('multiparty');
var projects = global.nss.db.collection('projects');
var fs = require('fs');

exports.index = (req, res)=>{
  projects.find().toArray((err,projects)=>{
    console.log(projects);
    res.render('portfolios/index', {projects:projects, title: 'Portfolio'});
  });
};

exports.new = (req, res)=>{
  res.render('portfolios/new', {title: 'New Item'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var project = {};
    project.title = fields.title[0];
    project.description = fields.description[0];
    project.tags = fields.tags[0];
    project.git = fields.git[0];
    project.app = fields.app[0];
    project.date = new Date(fields.date[0]);
    project.photos = [];
    files.photo.forEach(p=>{
      fs.renameSync(p.path, `${__dirname}/../static/img/${p.originalFilename}`);
      project.photos.push(p.originalFilename);
    });
    projects.save(project, ()=>res.redirect('/portfolio'));
  });
};
