import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import project from "../models/project.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    projectId: req.body.projectId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      projectId: req.body.projectId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this project!")
      );

    //TODO: check if the user purchased the project.

    const savedReview = await newReview.save();

    await project.findByIdAndUpdate(req.body.projectId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ projectId: req.params.projectId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
