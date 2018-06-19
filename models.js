'use strict';

// modified from curriculum example from node-restaurants-app-mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// this schema defines how Blogposts (using post as required) are
const blogPostSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { firstName: String, lastName: String },
  content: { type: String },
  created: {type: Date, default: Date.now}
});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allows us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the name object 
// stored as the value of author in Mongo.
blogPostSchema.virtual('authorFullName').get(function () {
  return `${this.author.firstName} ${this.author.lastName}`.trim()
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogPostSchema.methods.serialize = function () {

  return {
    id: this._id,
    author: this.authorName,
    created: this.created,
    title: this.title,
    content: this.content
  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = { BlogPost };
