import "express-async-errors";  // A middleware. we don't need to set "try catch" for every async controller
import Job from '../models/JobModel.js';
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    // id length should be same
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, })
  if (!updateJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await Job.findByIdAndDelete(id);
  if (!deleteJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: deletedJob });
};