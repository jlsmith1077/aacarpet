const Job = require('../models/jobs');

const accountSid = 'ACe4f1bd2f1f4902c056234ecf22144670';
const authToken = 'b079f870ffcef774cadc44fa00f5c168';

const client = require('twilio')(accountSid, authToken);

exports.jobCreate = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const smsMsg = req.body.smsMsg;
    const job = new Job({
        date: {startDate: req.body.date.startDate, endDate: req.body.date.endDate},
        dateRange: req.body.dateRange,
        email: req.body.email,
        company: req.body.company,
        address: req.body.address,
        type: req.body.type,
        phone: req.body.phone,
        aptNumber: req.body.aptNumber
    });
    client.messages.create({
      body: smsMsg,
      to: "+18565171368",
      from: '+12075219465',
  })
  .then(message => console.log(message.sid),error => console.log(error));
  client.messages.create({
      body: 'A new job has been added',
      to: "+18565711992",
      from: '+12075219465',
  })
  .then(message => console.log(message.sid),error => console.log(error));
    job.save()
    .then(createdJob => {
        res.status(201).json({
            message: "Job Saved!",
            job: {
                ...createdJob,
                id: createdJob._id
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message:'Creating Job Failed!'
        });
    });
};


exports.jobsGet = (req, res, next) => {
    const jobsQuery = Job.find();
    let fetchedJobs;
    jobsQuery.then(documents => {
      fetchedJobs = documents;
       return Job.count();      
     })
     .then(count => {
       res.status(200).json({
         message: 'Fetched Jobs',
         jobs: fetchedJobs,
         jobCount: count
       });
     })
     .catch(error => {
       res.status(500).json({
         message: 'Was unable to retrieve job'
       });
     });
   }

exports.jobDelete = (req, res, next) => {
    Job.deleteOne({ _id: req.params.id}).then(result => {
      if (result.n > 0) {
        res.status(200).json({message: 'Job Deleted successful'});
      } else {
        res.status(401).json({message: 'Something went wrong!...Ugggh'});
      }
    });
  }