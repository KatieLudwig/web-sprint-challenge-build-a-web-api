// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { logger, validateProjectId, validateProject, validateProjectUpdate } = require('./projects-middleware');
const router = express.Router();

router.use(logger);

// [GET] /api/projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

//[GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

//[POST] /api/projects
router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

//[PUT] /api/projects/:id
router.put('/:id', validateProjectId, validateProjectUpdate, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.status(400).json(updatedProject);
    } catch (err) {
        next(err);
    }
});

// [DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(actions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;