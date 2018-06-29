const Probation = require('../models/Probation');

exports.find = (req, res, next) => {
    console.log('probation running')
    Probation.findProById(req.query.id)
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};

exports.create = (req,res,next) => {
  console.log('ajsudnasjndkjasndkjasbdkjasbdkj')
  const newProbationInfo = req.body.probationInfo;
  Probation.insertProbation(newProbationInfo)
    .then(() => {
        Probation.findProById(10001)
          .then((probations)=>{
            res.json(probations)
          });
    })
    .catch(next);
};

exports.update = (req,res,next) => {
  console.log('update probation');
  const newProbationInfo = req.body.probationInfo;
  Probation.updateProbation(newProbationInfo)
    .then(() => {
      Probation.findProById(10001)
        .then((probation)=>{
          res.json(probation)
        });
    })
    .catch(next);
}
