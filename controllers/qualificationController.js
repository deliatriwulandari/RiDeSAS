// jshint esversion:6
const Qualification = require('../models/qualification');
const router = require('express').Router();
const { handleDifferentUser, nonAuthPartials, sasAdminPartials, userPartials, } = require('../helpers/handleAuthType');

module.exports = {
  showQualifications(req,res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        Qualification.find((err, foundQualifications) => {
          res.render("sasAdminQualification", {qualifications: foundQualifications});

        });
      }
    });
  },
  showQualificationForm(req, res){
    handleDifferentUser(req,{
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => res.render("sasAdminNewQualification"),
    });
  },
  addQualification(req,res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log(req.body);
        const qualification = new Qualification({
          qualificationName: req.body.qualificationName,
          minimumScore: req.body.minScore,
          maximumScore: req.body.maxScore,
          resultCalcDescription: req.body.calcDescription,
          gradeList: req.body.gradeList,
        });

        qualification.save((err) => {
          if(err){
            console.log("Error while saving!", err);
          }
          else{
            console.log("Success Saving!");

          }
        });
        res.redirect("/qualifications");
      }
    });
  },
  showSelectedQualification(req, res){
    handleDifferentUser(req,{
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        Qualification.findById(req.params.id, (err, foundQualification) => {
          console.log(foundQualification);
          res.render("sasAdminEditQualification", {qualification: foundQualification});
        });
      }
    });
  },
  editSelectedQualification(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        Qualification.findByIdAndUpdate(req.params.id, req.body, (err, foundQualification) => {
          console.log(err ? err : foundQualification);
          res.redirect("/qualifications");
        });
      }
    });
  },
  deleteSelectedQualification(req, res){
    handleDifferentUser(req, {
      nonAuthUserCallback: () => res.redirect("/"),
      sasAdminCallback: () => {
        console.log('delete said: ',req.params.id);
        Qualification.findByIdAndRemove(req.params.id, (err, foundQualification) => {
          console.log(err ? err : "delete success");
          res.send(err ? err : foundQualification);
        });
      }
    });
  },

};