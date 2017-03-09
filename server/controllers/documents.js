var db = require('../models');

const Users = db.Users;
const Documents = db.Documents;

const documentDetails = (docs) => {
  const fields = {
    title: Documents.title,
    content: Documents.content,
    accessType: Documents.accessType,
    userId: Documents.userId
  };
  return fields;
};
class DocumentController {

 static createDocument(req, res){
   Documents.create({
     title: req.body.title,
     content: req.body.content,
     accessType: req.body.accessType,
     userId: req.body.userId
   }).then((document) => {
     res.status(200).json({ msg: 'Created', document: document });
   });
 }
}
