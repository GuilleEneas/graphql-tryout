'use strict';

const { getJobById, getJobs } = require(`${__dirname}/../data`);
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const categoryType =  new GraphQLObjectType({
  name: 'Category',
  description: 'A category.',
  fields: {
    messages_total: {
      type: GraphQLInt,
      description: 'The total amount of messages.',
    },
    messages_unread: {
      type: GraphQLInt,
      description: 'The number of unread messages.',
    },
  },
});

const messagesType = new GraphQLObjectType({
  name: 'Messages',
  description: 'The number of unread and total messages.',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the category.',
    },
  },
});

const jobType = new GraphQLObjectType({
  name: 'Job',
  description: 'A job',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The id of the job.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the job.',
    },
    zip_code: {
      type: GraphQLString,
      description: 'The postal code.',
    },
    city: {
      type: GraphQLString,
      description: 'The city.',
    },
    thumbnail: {
      type: GraphQLString,
      description: 'The url for the thumbnail.',
    },
    attachments: {
      type: new GraphQLList(GraphQLString),
      description: 'A list of attachments urls.',
    },
    counter: {
      type: messagesType,
      description: 'The messages associated to the job.',
    },
    is_awarded: {
      type: GraphQLBoolean,
      description: 'Indicates if the job is awarded.',
    },
    categories: {
      type: categoryType,
      description: 'The categories associated to this job.',
    },
    state: {
      type: GraphQLString,
      description: 'The state of the job.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the job.',
    },
    end_date: {
      type: GraphQLString,
      description: 'UCT string for the end date.',
    },
    created_at: {
      type: GraphQLString,
      description: 'UCT string for the creation date.',
    },
  },
});

const jobsQueryType = new GraphQLObjectType({
  name: 'JobsQueryType',
  description: 'The root query type.',
  fields: {
    jobs: {
      type: new GraphQLList(jobType),
      resolve: getJobs,
    },
    job: {
      type: jobType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the job.',
        },
      },
      resolve: (_, args) => {
        return getJobById(args.id);
      },
    },
  },
});

const jobsSchema = new GraphQLSchema({
  query: jobsQueryType,
});

exports.jobsSchema = jobsSchema;
