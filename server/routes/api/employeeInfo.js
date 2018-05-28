const router = require('express').Router();
const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'resources/profile-img');
  },
  filename: (req, res, cb) => {
    cb(null, String(req.user.id));
  }
});
const upload = multer({ storage });

router.post('/', EmployeeInfoController.create);

router.get('/', EmployeeInfoController.find);

router.put('/', EmployeeInfoController.update);

router.post('/upload-profile-img', upload.single('profile'), EmployeeInfoController.updateProfileImg);

module.exports = router;
