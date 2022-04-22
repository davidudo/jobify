import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'

import Job from '../models/Job.js'
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

const createJob = async (req, res) => {
  const { position, company } = req.body
  
  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values')
  }
  
  req.body.createdBy = req.user.userId
  
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query
  const queryObject = { createdBy: req.user.userId, }
  
  // Add stuff based on condition
  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  
  // No await 
  let result = Job.find(queryObject)
  
  // Chain sort condition 
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }
  
  // Setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  
  result = result.skip(skip).limit(limit)
  
  const jobs = await result
  // const jobs = await Job.find({ createdBy: req.user.userId })
  
  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs, numOfPages })
    
  // res.send('Get All Jobs')
}

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  
  // console.log(stats)
  
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr 
    acc[title] = count 
    return acc
  }, {})
  
  // console.log(stats)
  
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item 
      // accept 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()
    
    // console.log(monthlyApplications)
  
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
  // res.send('Show Stats')
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  
  const job = await Job.findOne({ _id: jobId })
  
  if (!job) {
    throw new CustomError.NotFoundError(`No job with id: ${ jobId }`)
  }
  
  checkPermissions(req.user, job.createdBy)
  
  await job.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' })
}

const updateJob = async (req, res) => {
  const { id: jobId } = req.params
  
  const { company, position } = req.body
  
  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values')
  }
  
  const job = await Job.findOne({ _id: jobId })
  
  if (!job) {
    throw new NotFoundError(`No job with id ${ jobId }`)
  }
  
  // check permissions 
  
  /*req.user.userId(string) === job.createdBy(object)
  throw new UnAuthenticatedError('Not authorized to access this route')
  
  console.log(typeof, req.user.userId)
  console.log(typeof, job.createdBy)*/
  
  checkPermissions(req.user, job.createdBy)
  
  // first approach (updates everything)

  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId }, 
    req.body, 
    { 
      new: true, 
      runValidators: true, 
    }
  ) 
  
  // second approach (only updates company and position, this approach is best used for user information)
  
  /*
  job.position = position 
  job.company = company 
  
  await job.save()
  */
  
  res.status(StatusCodes.OK).json({ updatedJob })
}

export { 
  createJob, 
  getAllJobs, 
  showStats, 
  deleteJob, 
  updateJob,
}