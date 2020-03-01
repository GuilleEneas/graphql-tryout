
'use strict';

const fs = require('fs');

const rawdata = fs.readFileSync(`${__dirname}/jobs.json`);
const data = JSON.parse(rawdata);

const getJobById = (id) => new Promise((resolve) => {
  const [job] = data.body.filter((job) => {
    return job.id === id;
  });

  resolve(job);
});
const getJobs = () => new Promise((resolve) => resolve(data.body));

exports.getJobById = getJobById;
exports.getJobs = getJobs;
