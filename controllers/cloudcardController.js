const Card = require('../models/card');

const cloudcard_index = (req, res) => {
    const id = req.params.id;
    console.log('id:',id)
    Card.findById(id)
      .then(result => {
        console.log('result:',result)
        res.render('cloudcard', { card: result, title: '云名片' });
      })
      .catch(err => {
        console.log(err);
      });
}

module.exports = {
  cloudcard_index
}